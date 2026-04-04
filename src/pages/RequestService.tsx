import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ServiceTypeStep from "@/components/request-service/ServiceTypeStep";
import ServiceDetailsStep from "@/components/request-service/ServiceDetailsStep";
import SuccessMessage from "@/components/request-service/SuccessMessage";

const TOTAL_STEPS = 2;

const RequestService = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Contact + Service type
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientType, setClientType] = useState("individual");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [serviceType, setServiceType] = useState("");

  // Step 2: Dynamic details
  const [fields, setFields] = useState<Record<string, string>>({});
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  const updateField = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const canNext = () => {
    if (step === 1) return !!serviceType && !!fullName && !!email && !!phone && (clientType !== "company" || !!companyName);
    if (step === 2) return !!fields.state;
    return false;
  };

  const uploadFile = async (file: File, bucket: string) => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    return path;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let cvUrl: string | null = null;
      let docUrl: string | null = null;

      if (cvFile) cvUrl = await uploadFile(cvFile, "cvs");
      if (docFile) docUrl = await uploadFile(docFile, "cvs");

      const serviceDetails = {
        ...fields,
        clientType,
        contactPerson: contactPerson || null,
        ...(cvUrl ? { cvUrl } : {}),
        ...(docUrl ? { docUrl } : {}),
      };

      const location = [fields.state, fields.city].filter(Boolean).join(", ");

      const { error } = await supabase.from("service_requests").insert({
        user_id: user?.id || null,
        full_name: fullName,
        company_name: clientType === "company" ? companyName : null,
        phone,
        email,
        service_type: serviceType,
        service_details: serviceDetails,
        location: location || null,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessMessage />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <BackButton label="Go Back" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Request a Service</h1>
            <p className="text-primary-foreground/70 text-lg">Fill this form to get a fast and accurate quote. Our team typically responds within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of {TOTAL_STEPS}</span>
              <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
            </div>
            <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="bg-card border border-border rounded-lg p-8">
            {step === 1 && (
              <ServiceTypeStep
                serviceType={serviceType} setServiceType={setServiceType}
                clientType={clientType} setClientType={setClientType}
                fullName={fullName} setFullName={setFullName}
                email={email} setEmail={setEmail}
                phone={phone} setPhone={setPhone}
                companyName={companyName} setCompanyName={setCompanyName}
                contactPerson={contactPerson} setContactPerson={setContactPerson}
              />
            )}

            {step === 2 && (
              <ServiceDetailsStep
                serviceType={serviceType}
                fields={fields}
                updateField={updateField}
                cvFile={cvFile} setCvFile={setCvFile}
                docFile={docFile} setDocFile={setDocFile}
              />
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
                <ArrowLeft size={16} /> Back
              </Button>
              {step < TOTAL_STEPS ? (
                <Button variant="secondary" onClick={() => setStep(step + 1)} disabled={!canNext()}>
                  Next <ArrowRight size={16} />
                </Button>
              ) : (
                <Button variant="secondary" onClick={handleSubmit} disabled={!canNext() || submitting}>
                  {submitting ? "Submitting..." : "Submit Request"}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RequestService;
