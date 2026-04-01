import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Zap,
  Brain,
  HeartHandshake,
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const whyChooseUs = [
  { icon: ShieldCheck, title: "Experienced Technical Supervision", desc: "Our supervisors have years of hands-on experience managing complex operations." },
  { icon: Users, title: "Reliable and Vetted Manpower", desc: "Every worker we deploy is screened, trained, and ready to deliver." },
  { icon: Zap, title: "Fast Response and Service Delivery", desc: "We act quickly because we understand that downtime costs money." },
  { icon: Brain, title: "Strong Understanding of Operations", desc: "We know how businesses run and tailor our services to fit." },
  { icon: HeartHandshake, title: "Commitment to Safety and Efficiency", desc: "Safety is never optional. We follow best practices on every project." },
];

const featuredJobs = [
  { title: "HVAC Technician", location: "Abuja", type: "Full-time", experience: "3+ years" },
  { title: "Facility Supervisor", location: "Port Harcourt", type: "Full-time", experience: "5+ years" },
  { title: "Electrician", location: "Lagos", type: "Contract", experience: "2+ years" },
  { title: "Environmental Officer", location: "Lagos", type: "Full-time", experience: "3+ years" },
];

const clientSteps = [
  { step: "1", title: "Submit a Service Request", desc: "Tell us what you need through our online form." },
  { step: "2", title: "Provide Detailed Requirements", desc: "Share specifics so we can plan accurately." },
  { step: "3", title: "Receive a Quote", desc: "We send you a clear and fair quote." },
  { step: "4", title: "Service Execution", desc: "Our team delivers the work on time and to standard." },
];

const seekerSteps = [
  { step: "1", title: "Create an Account", desc: "Sign up and build your profile." },
  { step: "2", title: "Apply for Jobs", desc: "Browse openings and submit applications." },
  { step: "3", title: "Get Shortlisted", desc: "Our team reviews and contacts qualified candidates." },
  { step: "4", title: "Get Hired", desc: "Start working with a trusted employer." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* About preview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Who We Are
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Obrus Apex Services is a Nigerian-based company focused on delivering manpower recruitment, facility management, environmental services, and equipment procurement. We support businesses by providing skilled personnel, maintaining operational facilities, ensuring clean and safe environments, and supplying essential equipment.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-secondary font-heading font-semibold text-sm hover:gap-3 transition-all"
            >
              Learn more about us <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <ServicesSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              Why Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Obrus Apex Services
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <item.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              Careers
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Available Jobs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join our growing team. We are hiring skilled professionals across Nigeria.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {featuredJobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-secondary/40 hover:shadow-md transition-all"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{job.title}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                  <span className="inline-flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                  <span className="inline-flex items-center gap-1"><Briefcase size={14} /> {job.experience}</span>
                </div>
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 text-secondary text-sm font-medium hover:gap-3 transition-all"
                >
                  Apply Now <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              View All Jobs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              Process
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* For Clients */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-heading text-xl font-bold text-foreground mb-6 text-center">For Clients</h3>
              <div className="space-y-6">
                {clientSteps.map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">{s.title}</h4>
                      <p className="text-muted-foreground text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* For Job Seekers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-heading text-xl font-bold text-foreground mb-6 text-center">For Job Seekers</h3>
              <div className="space-y-6">
                {seekerSteps.map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">{s.title}</h4>
                      <p className="text-muted-foreground text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              Need Manpower, Facility Support, Environmental Services, or Equipment?
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Get in touch today. Our team is ready to deliver the right solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/request-service"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-md font-heading font-semibold text-sm hover:border-secondary hover:text-secondary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
