import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { CheckCircle2, Upload, ArrowLeft, ArrowRight } from "lucide-react";
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

const budgetRanges = [
  { value: "100k-500k", label: "₦100,000 – ₦500,000" },
  { value: "500k-1m", label: "₦500,000 – ₦1,000,000" },
  { value: "1m+", label: "₦1,000,000+" },
];

const TOTAL_STEPS = 5;

const RequestService = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [serviceType, setServiceType] = useState("");
  const [budget, setBudget] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Dynamic fields
  const [fields, setFields] = useState<Record<string, string>>({});

  const updateField = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  // Contact
  const [contact, setContact] = useState({ name: "", company: "", phone: "", email: "" });

  const canNext = () => {
    if (step === 1) return !!serviceType;
    if (step === 2) return true;
    if (step === 3) return !!budget;
    if (step === 4) return true;
    if (step === 5) return !!contact.name && !!contact.phone && !!contact.email;
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
                For urgent requests, please contact us via phone or WhatsApp.
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
              Fill this form to get a fast and accurate quote. Our team typically responds within 24 hours. Provide as much detail as possible.
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
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">Select Service Type</h2>
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

            {/* Step 2: Dynamic Fields */}
            {step === 2 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">Service Details</h2>
                <div className="space-y-4">
                  {serviceType === "manpower" && (
                    <>
                      <div><Label>Job Role</Label><Input placeholder="e.g. HVAC Technician" value={fields.role || ""} onChange={(e) => updateField("role", e.target.value)} /></div>
                      <div><Label>Number of Staff Needed</Label><Input type="number" placeholder="e.g. 5" value={fields.staffCount || ""} onChange={(e) => updateField("staffCount", e.target.value)} /></div>
                      <div>
                        <Label>Duration</Label>
                        <RadioGroup value={fields.duration || ""} onValueChange={(v) => updateField("duration", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="short-term" id="short" /><Label htmlFor="short">Short-term</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="long-term" id="long" /><Label htmlFor="long">Long-term</Label></div>
                        </RadioGroup>
                      </div>
                      <div><Label>Location</Label><Input placeholder="e.g. Lagos" value={fields.location || ""} onChange={(e) => updateField("location", e.target.value)} /></div>
                    </>
                  )}
                  {serviceType === "facility" && (
                    <>
                      <div>
                        <Label>Type of Facility</Label>
                        <RadioGroup value={fields.facilityType || ""} onValueChange={(v) => updateField("facilityType", v)} className="flex flex-wrap gap-4 mt-2">
                          {["Office", "Estate", "Industrial"].map((t) => (
                            <div key={t} className="flex items-center space-x-2"><RadioGroupItem value={t.toLowerCase()} id={`ft-${t}`} /><Label htmlFor={`ft-${t}`}>{t}</Label></div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Size</Label>
                        <RadioGroup value={fields.size || ""} onValueChange={(v) => updateField("size", v)} className="flex gap-4 mt-2">
                          {["Small", "Medium", "Large"].map((s) => (
                            <div key={s} className="flex items-center space-x-2"><RadioGroupItem value={s.toLowerCase()} id={`sz-${s}`} /><Label htmlFor={`sz-${s}`}>{s}</Label></div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div><Label>Services Required</Label><Input placeholder="e.g. Electrical maintenance, HVAC" value={fields.services || ""} onChange={(e) => updateField("services", e.target.value)} /></div>
                      <div>
                        <Label>Frequency</Label>
                        <RadioGroup value={fields.frequency || ""} onValueChange={(v) => updateField("frequency", v)} className="flex flex-wrap gap-4 mt-2">
                          {["Daily", "Weekly", "Monthly"].map((f) => (
                            <div key={f} className="flex items-center space-x-2"><RadioGroupItem value={f.toLowerCase()} id={`freq-${f}`} /><Label htmlFor={`freq-${f}`}>{f}</Label></div>
                          ))}
                        </RadioGroup>
                      </div>
                    </>
                  )}
                  {serviceType === "environmental" && (
                    <>
                      <div><Label>Type of Service</Label><Input placeholder="e.g. Fumigation, Waste Management, Cleaning" value={fields.envType || ""} onChange={(e) => updateField("envType", e.target.value)} /></div>
                      <div><Label>Size of Area / Facility</Label><Input placeholder="e.g. 500 sqm office building" value={fields.areaSize || ""} onChange={(e) => updateField("areaSize", e.target.value)} /></div>
                      <div>
                        <Label>Indoor or Outdoor</Label>
                        <RadioGroup value={fields.indoorOutdoor || ""} onValueChange={(v) => updateField("indoorOutdoor", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="indoor" id="indoor" /><Label htmlFor="indoor">Indoor</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="outdoor" id="outdoor" /><Label htmlFor="outdoor">Outdoor</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="both" id="both" /><Label htmlFor="both">Both</Label></div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Frequency</Label>
                        <RadioGroup value={fields.envFrequency || ""} onValueChange={(v) => updateField("envFrequency", v)} className="flex flex-wrap gap-4 mt-2">
                          {["One-time", "Weekly", "Monthly"].map((f) => (
                            <div key={f} className="flex items-center space-x-2"><RadioGroupItem value={f.toLowerCase()} id={`ef-${f}`} /><Label htmlFor={`ef-${f}`}>{f}</Label></div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Urgency</Label>
                        <RadioGroup value={fields.urgency || ""} onValueChange={(v) => updateField("urgency", v)} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="immediate" id="imm" /><Label htmlFor="imm">Immediate</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="scheduled" id="sched" /><Label htmlFor="sched">Scheduled</Label></div>
                        </RadioGroup>
                      </div>
                      <div><Label>Location</Label><Input placeholder="e.g. Abuja" value={fields.envLocation || ""} onChange={(e) => updateField("envLocation", e.target.value)} /></div>
                    </>
                  )}
                  {serviceType === "equipment" && (
                    <>
                      <div><Label>Equipment Type</Label><Input placeholder="e.g. HVAC components, electrical materials" value={fields.equipType || ""} onChange={(e) => updateField("equipType", e.target.value)} /></div>
                      <div><Label>Quantity</Label><Input type="number" placeholder="e.g. 10" value={fields.quantity || ""} onChange={(e) => updateField("quantity", e.target.value)} /></div>
                      <div><Label>Specifications</Label><Input placeholder="e.g. Brand, model, size" value={fields.specs || ""} onChange={(e) => updateField("specs", e.target.value)} /></div>
                      <div><Label>Delivery Location</Label><Input placeholder="e.g. Port Harcourt" value={fields.deliveryLocation || ""} onChange={(e) => updateField("deliveryLocation", e.target.value)} /></div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Budget */}
            {step === 3 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">Budget Range</h2>
                <RadioGroup value={budget} onValueChange={setBudget} className="space-y-3">
                  {budgetRanges.map((b) => (
                    <div key={b.value} className="flex items-center space-x-3 p-3 border border-border rounded-md hover:border-secondary/40 transition-colors">
                      <RadioGroupItem value={b.value} id={b.value} />
                      <Label htmlFor={b.value} className="cursor-pointer flex-1">{b.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 4: File Upload */}
            {step === 4 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-2">Upload Documents</h2>
                <p className="text-muted-foreground text-sm mb-6">Attach specifications, drawings, or requirements (optional).</p>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-10 cursor-pointer hover:border-secondary/40 transition-colors">
                  <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                  <span className="text-muted-foreground text-sm">{file ? file.name : "Click to upload a file"}</span>
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            )}

            {/* Step 5: Contact */}
            {step === 5 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">Contact Details</h2>
                <div className="space-y-4">
                  <div><Label>Full Name *</Label><Input placeholder="Your full name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} /></div>
                  <div><Label>Company Name</Label><Input placeholder="Your company" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} /></div>
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
