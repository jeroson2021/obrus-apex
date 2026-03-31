import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Briefcase, Upload, Users, ArrowRight } from "lucide-react";

const sampleJobs = [
  { title: "Electrical Technician", location: "Lagos", type: "Full-time" },
  { title: "Cleaning Supervisor", location: "Abuja", type: "Full-time" },
  { title: "HSE Officer", location: "Port Harcourt", type: "Contract" },
  { title: "Plumber", location: "Lagos", type: "Full-time" },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              Careers
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Join Our Team
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              We are always looking for skilled and reliable people. Check our open positions or send us your CV.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two paths */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <Briefcase className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Looking for Work?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Browse available jobs or submit your CV. We place workers in roles across Nigeria.
              </p>
              <a href="#jobs" className="inline-flex items-center gap-2 text-secondary text-sm font-medium">
                View open positions <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <Users className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Need Workers?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                We provide skilled and unskilled workers for your business. Tell us what you need.
              </p>
              <a href="#request-manpower" className="inline-flex items-center gap-2 text-secondary text-sm font-medium">
                Request manpower <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* Job listings */}
          <div id="jobs" className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Open Positions</h2>
            <div className="space-y-3">
              {sampleJobs.map((job) => (
                <div
                  key={job.title}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-card border border-border rounded-lg p-5 hover:border-secondary/40 transition-colors"
                >
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{job.title}</h3>
                    <p className="text-muted-foreground text-sm">{job.location} • {job.type}</p>
                  </div>
                  <button className="mt-3 sm:mt-0 bg-secondary text-secondary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Apply form */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Submit Your CV</h2>
            <form
              className="bg-card border border-border rounded-lg p-8 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                <input
                  type="tel"
                  placeholder="+234..."
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Position Interested In</label>
                <input
                  type="text"
                  placeholder="e.g. Electrician, Cleaner, HSE Officer"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Upload CV</label>
                <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover:border-secondary/40 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Click to upload or drag your CV here</p>
                  <p className="text-muted-foreground text-xs mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Submit Application
              </button>
            </form>
          </div>

          {/* Request manpower */}
          <div id="request-manpower">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Request Manpower</h2>
            <form
              className="bg-card border border-border rounded-lg p-8 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your company"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="company@email.com"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Number of Workers Needed</label>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Details</label>
                <textarea
                  rows={4}
                  placeholder="What type of workers do you need? For how long?"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
              >
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
