import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const serviceTypes = [
  { value: "manpower", label: "Manpower Recruitment" },
  { value: "facility", label: "Facility Management" },
  { value: "environmental", label: "Environmental Services" },
  { value: "equipment", label: "Equipment Procurement" },
];

const TOTAL_STEPS = 3;

const RequestService = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [serviceType, setServiceType] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });

  const updateField = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const canNext = () => {
    if (step === 1) return !!serviceType;
    if (step === 2) return true;
    if (step === 3) return !!contact.name && !!contact.phone && !!contact.email;
    return false;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-28 pb-20">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <CheckCircle2 className="w-16 h-16 text-secondary mx-auto mb-6" />
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Your Request Has Been Received
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our team will contact you within 24 hours. Thank you for choosing Obrus Apex Services.
              </p>
              <p className="text-muted-foreground text-sm mb-8">
                For urgent requests, please contact us via phone or WhatsApp at +234 807 874 7510.
              </p>
              <Button variant="secondary" asChild>
                <a href="/">Back to Home</a>
              </Button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Request a Service
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              Fill this form to get a fast and accurate quote. Our team typically responds within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of {TOTAL_STEPS}</span>
              <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
            </div>
            <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            {/* Step 1: Service Type */}
            {step === 1 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">Select Service</h2>
                <RadioGroup value={serviceType} onValueChange={setServiceType} className="space-y-3">
                  {serviceTypes.map((s) => (
                    <div key={s.value} className="flex items-center space-x-3 p-3 border border-border rounded-md hover:border-secondary/40 transition-colors">
                      <RadioGroupItem value={s.value} id={s.value} />
                      <Label htmlFor={s.value} className="cursor-pointer flex-1">{s.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Dynamic Service Details */}
            {step === 2 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">Service Details</h2>
                <div className="space-y-4">
                  {serviceType === "manpower" && (
                    <>
                      <div><Label>Skill Type</Label><Input placeholder="e.g. HVAC Technician, Electrician" value={fields.skillType || ""} onChange={(e) => updateField("skillType", e.target.value)} /></div>
                      <div><Label>Number of Staff</Label><Input type="number" placeholder="e.g. 5" value={fields.staffCount || ""} onChange={(e) => updateField("staffCount", e.target.value)} /></div>
                      <div>
                        <Label>Duration</Label>
                        <RadioGroup value={fields.duration || ""} onValueChange={(v) => updateField("duration", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="short-term" id="short" /><Label htmlFor="short">Short-term</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="long-term" id="long" /><Label htmlFor="long">Long-term</Label></div>
                        </RadioGroup>
                      </div>
                    </>
                  )}
                  {serviceType === "facility" && (
                    <>
                      <div>
                        <Label>Type of Building</Label>
                        <RadioGroup value={fields.facilityType || ""} onValueChange={(v) => updateField("facilityType", v)} className="flex flex-wrap gap-4 mt-2">
                          {["Office", "Estate", "Industrial"].map((t) => (
                            <div key={t} className="flex items-center space-x-2"><RadioGroupItem value={t.toLowerCase()} id={`ft-${t}`} /><Label htmlFor={`ft-${t}`}>{t}</Label></div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div><Label>Services Needed</Label><Input placeholder="e.g. Electrical maintenance, HVAC servicing" value={fields.services || ""} onChange={(e) => updateField("services", e.target.value)} /></div>
                    </>
                  )}
                  {serviceType === "environmental" && (
                    <>
                      <div>
                        <Label>Type of Service</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {["Fumigation", "Waste Management", "Septic Tank Dislodgment", "Fire Extinguisher Servicing", "Cleaning Services", "General Maintenance"].map((t) => (
                            <label key={t} className={`flex items-center gap-2 p-2.5 border rounded-md text-sm cursor-pointer transition-colors ${fields.envType === t ? "border-secondary bg-secondary/5 text-foreground" : "border-border text-muted-foreground hover:border-secondary/40"}`}>
                              <input type="radio" name="envType" value={t} checked={fields.envType === t} onChange={() => updateField("envType", t)} className="sr-only" />
                              {t}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div><Label>Location</Label><Input placeholder="e.g. Port Harcourt" value={fields.envLocation || ""} onChange={(e) => updateField("envLocation", e.target.value)} /></div>
                      <div>
                        <Label>Frequency</Label>
                        <RadioGroup value={fields.envFrequency || ""} onValueChange={(v) => updateField("envFrequency", v)} className="flex flex-wrap gap-4 mt-2">
                          {["One-time", "Weekly", "Monthly"].map((f) => (
                            <div key={f} className="flex items-center space-x-2"><RadioGroupItem value={f.toLowerCase()} id={`ef-${f}`} /><Label htmlFor={`ef-${f}`}>{f}</Label></div>
                          ))}
                        </RadioGroup>
                      </div>
                    </>
                  )}
                  {serviceType === "equipment" && (
                    <>
                      <div><Label>Equipment Type</Label><Input placeholder="e.g. HVAC components, electrical materials" value={fields.equipType || ""} onChange={(e) => updateField("equipType", e.target.value)} /></div>
                      <div><Label>Quantity</Label><Input type="number" placeholder="e.g. 10" value={fields.quantity || ""} onChange={(e) => updateField("quantity", e.target.value)} /></div>
                      <div><Label>Budget (optional)</Label><Input placeholder="e.g. ₦500,000" value={fields.budget || ""} onChange={(e) => updateField("budget", e.target.value)} /></div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">Contact Details</h2>
                <div className="space-y-4">
                  <div><Label>Full Name *</Label><Input placeholder="Your full name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} /></div>
                  <div><Label>Phone Number *</Label><Input type="tel" placeholder="+234..." value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></div>
                  <div><Label>Email Address *</Label><Input type="email" placeholder="you@example.com" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
                <ArrowLeft size={16} /> Back
              </Button>
              {step < TOTAL_STEPS ? (
                <Button variant="secondary" onClick={() => setStep(step + 1)} disabled={!canNext()}>
                  Next <ArrowRight size={16} />
                </Button>
              ) : (
                <Button variant="secondary" onClick={handleSubmit} disabled={!canNext()}>
                  Submit Request
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
