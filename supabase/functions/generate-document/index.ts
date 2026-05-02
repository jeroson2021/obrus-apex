// AI Document Generator - creates CVs, cover letters, and service-related documents
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  cv: "You are an expert CV writer for the Nigerian job market. Generate a professional, well-structured CV in clean Markdown based on the user's details. Include: Contact Info, Professional Summary, Work Experience, Education, Skills, and Certifications. Be concise, clear, and use simple English. Do not invent facts not provided — leave gaps clearly marked as [Add details].",
  "cover-letter": "You are a professional cover letter writer. Write a clear, concise, and persuasive cover letter in Markdown based on the user's details. Use simple, professional English. Format with proper greeting, 3-4 short paragraphs, and a sign-off.",
  "service-request": "You write formal service request letters for Obrus Apex Services (manpower, facility, environmental, equipment). Produce a clear, professional letter in Markdown based on the user's request details, ready to be sent to a company.",
  quotation: "You write professional quotation request documents. Produce a clear, itemized quotation request in Markdown for the user's needs (manpower, facility maintenance, environmental services, or equipment procurement).",
  proposal: "You write business proposals. Produce a clear, structured business proposal in Markdown with sections: Introduction, Scope of Work, Deliverables, Timeline, and Pricing Notes. Keep language simple and professional.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { documentType, details } = await req.json();

    if (!documentType || !details) {
      return new Response(JSON.stringify({ error: "documentType and details are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = SYSTEM_PROMPTS[documentType] || SYSTEM_PROMPTS.cv;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: details },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-document error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
