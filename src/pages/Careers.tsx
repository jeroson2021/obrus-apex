import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Briefcase, Upload, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from("jobs")
        .select("id, title, location, type")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(4);
      if (data) setJobs(data as Job[]);
    };
    fetchJobs();
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !position) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    let cvUrl: string | null = null;
    if (cvFile) {
      const ext = cvFile.name.split(".").pop();
      const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("cvs").upload(path, cvFile);
      if (uploadError) {
        toast({ title: "CV upload failed", description: uploadError.message, variant: "destructive" });
        setSubmitting(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("cvs").getPublicUrl(path);
      cvUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from("job_applications").insert({
      full_name: fullName,
      email,
      phone,
      position,
      cv_url: cvUrl,
      user_id: user?.id || null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Application submitted!", description: "We will review your CV and get back to you." });
      setFullName(""); setEmail(""); setPhone(""); setPosition(""); setCvFile(null);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">Careers</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Join Our Team</h1>
            <p className="text-primary-foreground/70 text-lg">
              We are always looking for skilled and reliable people. Check our open positions or send us your CV.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Two paths */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-card border border-border rounded-lg p-8">
              <Briefcase className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Looking for Work?</h3>
              <p className="text-muted-foreground text-sm mb-4">Browse available jobs or submit your CV. We place workers in roles across Nigeria.</p>
              <Link to="/jobs" className="inline-flex items-center gap-2 text-secondary text-sm font-medium">
                View open positions <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-card border border-border rounded-lg p-8">
              <Users className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Need Workers?</h3>
              <p className="text-muted-foreground text-sm mb-4">We provide skilled and unskilled workers for your business. Tell us what you need.</p>
              <a href="#request-manpower" className="inline-flex items-center gap-2 text-secondary text-sm font-medium">
                Request manpower <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* Open positions from DB */}
          {jobs.length > 0 && (
            <div className="mb-16">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Open Positions</h2>
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-card border border-border rounded-lg p-5 hover:border-secondary/40 transition-colors">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{job.title}</h3>
                      <p className="text-muted-foreground text-sm">{job.location} • {job.type}</p>
                    </div>
                    <Link to="/jobs" className="mt-3 sm:mt-0 bg-secondary text-secondary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity text-center">
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
              {jobs.length >= 4 && (
                <Link to="/jobs" className="inline-flex items-center gap-2 text-secondary text-sm font-medium mt-4">
                  View all open positions <ArrowRight size={14} />
                </Link>
              )}
            </div>
          )}

          {/* Apply form */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Submit Your CV</h2>
            <form className="bg-card border border-border rounded-lg p-8 space-y-4" onSubmit={handleApply}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Phone *</label>
                <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234..." required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Position Interested In *</label>
                <Input value={position} onChange={e => setPosition(e.target.value)} placeholder="e.g. Electrician, Cleaner, HSE Officer" required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Upload CV</label>
                <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover:border-secondary/40 transition-colors cursor-pointer relative">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">{cvFile ? cvFile.name : "Click to upload or drag your CV here"}</p>
                  <p className="text-muted-foreground text-xs mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={e => setCvFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-secondary text-secondary-foreground py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>

          {/* Request manpower */}
          <div id="request-manpower">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Request Manpower</h2>
            <form className="bg-card border border-border rounded-lg p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Company Name *</label>
                  <Input placeholder="Your company" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Contact Person *</label>
                  <Input placeholder="Your name" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                <Input type="email" placeholder="company@email.com" required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Number of Workers Needed</label>
                <Input type="number" placeholder="e.g. 10" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Details</label>
                <textarea
                  rows={4}
                  placeholder="What type of workers do you need? For how long?"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors resize-none"
                />
              </div>
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Careers;
