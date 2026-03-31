import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt="Industrial facility at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary font-heading text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Excellence in Service Delivery
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground">
            Powering Industries <br />
            <span className="text-primary">With Precision</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
            From facility maintenance to HSE consultation, manpower recruitment, and materials procurement — we deliver end-to-end solutions that keep your operations running.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#services"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="border border-border text-foreground px-8 py-3.5 rounded-md font-heading font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
