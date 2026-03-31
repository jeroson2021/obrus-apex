import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
              OBRUS Apex Services is a trusted service company in Nigeria, helping businesses with manpower, facility management, and equipment supply. We deliver quality results with integrity and reliability.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-secondary font-heading font-semibold text-sm hover:gap-3 transition-all"
            >
              Learn more about us →
            </Link>
          </motion.div>
        </div>
      </section>

      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
