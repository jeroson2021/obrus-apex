import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, Download, Copy, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DOCUMENT_TYPES = [
  { id: "cv", label: "CV / Resume", placeholder: "Full Name: John Doe\nEmail: john@example.com\nPhone: +234...\nRole: HVAC Technician\nExperience: 5 years at XYZ Ltd maintaining cooling systems...\nEducation: ND Mechanical Engineering, RSU\nSkills: HVAC repair, electrical wiring, safety compliance" },
  { id: "cover-letter", label: "Cover Letter", placeholder: "Applying for: Facility Supervisor at ABC Company\nMy background: 6 years in facility management...\nKey strengths: HSE compliance, team leadership..." },
  { id: "service-request", label: "Service Request Letter", placeholder: "Company: ABC Industries\nService needed: Monthly facility maintenance\nLocation: Port Harcourt\nStart date: Next month\nDetails: 3-storey office building, electrical and plumbing checks..." },
  { id: "quotation", label: "Quotation Request", placeholder: "Need quote for: Fumigation services\nLocation: Trans-Amadi, Port Harcourt\nSize: 2,000 sqm warehouse\nFrequency: Quarterly" },
  { id: "proposal", label: "Business Proposal", placeholder: "Client: XYZ Oil & Gas\nProposing: Manpower outsourcing for 10 technicians\nDuration: 12 months\nKey deliverables: Skilled HVAC and electrical technicians on site..." },
];

const AIDocumentGenerator = () => {
  const [docType, setDocType] = useState("cv");
  const [details, setDetails] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const current = DOCUMENT_TYPES.find((d) => d.id === docType)!;

  const handleGenerate = async () => {
    if (!details.trim()) {
      toast({ title: "Add some details", description: "Please describe what you need so the AI can write it.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const { data, error } = await supabase.functions.invoke("generate-document", {
        body: { documentType: docType, details },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setOutput(data.content || "");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Could not generate document", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    toast({ title: "Copied", description: "Document copied to clipboard." });
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docType}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider uppercase mb-4">
            <Sparkles size={14} /> AI Document Assistant
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Create CVs and Service Documents in Seconds
          </h2>
          <p className="text-muted-foreground">
            Use our AI tool to write a professional CV, cover letter, service request, quotation, or proposal. Just type a few details and let AI do the rest.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm"
        >
          {/* Document type selector */}
          <Label className="text-sm font-heading font-semibold mb-3 block">Choose document type</Label>
          <div className="flex flex-wrap gap-2 mb-6">
            {DOCUMENT_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setDocType(t.id); setOutput(""); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  docType === t.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                <FileText size={14} /> {t.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <Label htmlFor="ai-details" className="text-sm font-heading font-semibold mb-2 block">
            Your details
          </Label>
          <Textarea
            id="ai-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={current.placeholder}
            rows={8}
            className="font-body text-sm mb-4"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-7 py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Generating…</> : <><Sparkles size={16} /> Generate Document</>}
          </button>

          {/* Output */}
          {output && (
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-heading font-semibold">Generated document</Label>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-md hover:bg-muted transition-colors">
                    <Copy size={12} /> Copy
                  </button>
                  <button onClick={handleDownload} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-md hover:bg-muted transition-colors">
                    <Download size={12} /> Download
                  </button>
                </div>
              </div>
              <div className="bg-muted rounded-md p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-body leading-relaxed">{output}</pre>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                ⚠️ Always review and edit before sending. AI can make mistakes.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AIDocumentGenerator;
