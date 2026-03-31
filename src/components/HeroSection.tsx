import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Wrench, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-4">
              Integrated Solutions • Peak Performance
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary-foreground">
              Reliable Manpower, Facility & Environmental Services{" "}
              <span className="text-secondary">You Can Trust</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl mb-8 font-body leading-relaxed">
              We provide skilled manpower, facility maintenance, cleaning services, waste management, HSE solutions, and more — helping businesses across Nigeria run smoothly and safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Our Services <ArrowRight size={16} />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 rounded-md font-heading font-semibold text-sm hover:border-secondary hover:text-secondary transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 rounded-md font-heading font-semibold text-sm hover:border-secondary hover:text-secondary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { icon: Users, label: "Manpower Supply", desc: "Skilled & unskilled workers" },
              { icon: Wrench, label: "Facility Maintenance", desc: "Electrical, plumbing, HVAC" },
              { icon: ShieldCheck, label: "HSE Solutions", desc: "Safety training & compliance" },
              { icon: ArrowRight, label: "9+ Services", desc: "View all our solutions" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6 backdrop-blur-sm ${
                  i === 3 ? "hover:border-secondary transition-colors cursor-pointer" : ""
                }`}
              >
                <item.icon className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-heading font-semibold text-primary-foreground text-sm mb-1">
                  {item.label}
                </h3>
                <p className="text-primary-foreground/60 text-xs">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
