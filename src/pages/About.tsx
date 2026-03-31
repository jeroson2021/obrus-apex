import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Shield, Heart, Award, Star, Target, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Shield, label: "Safety", desc: "Safety is at the heart of everything we do. We protect our people, clients, and the environment." },
  { icon: Heart, label: "Integrity", desc: "We are honest and transparent in all our dealings. We do what we say we will do." },
  { icon: Award, label: "Excellence", desc: "We set high standards and deliver quality work every time." },
  { icon: Star, label: "Reliability", desc: "Our clients trust us because we are dependable and consistent." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              About Us
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Who We Are
            </h1>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              OBRUS Apex Services is a Nigeria-based company that provides integrated solutions for manpower supply, facility maintenance, environmental services, and HSE consultancy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                OBRUS Apex Services was founded with a simple goal: to help businesses in Nigeria operate more efficiently, safely, and cleanly. We saw that many companies struggled to find reliable service providers for their day-to-day operations — from staffing to maintenance to safety compliance.
              </p>
              <p>
                We built our company to fill that gap. Today, we serve a growing number of clients across multiple industries, providing dependable manpower, professional cleaning, waste management, facility maintenance, and HSE solutions.
              </p>
              <p>
                Our team is made up of experienced professionals who are committed to delivering excellent results. We work closely with each client to understand their needs and provide services that make a real difference.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background border border-border rounded-lg p-8"
            >
              <Target className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver reliable, safe, and high-quality integrated services that help businesses in Nigeria operate at their best — every day.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background border border-border rounded-lg p-8"
            >
              <Eye className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted provider of manpower, facility, and environmental services in Nigeria — known for safety, quality, and dependability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {values.map((val, i) => (
              <motion.div
                key={val.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 text-center"
              >
                <val.icon className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-foreground mb-2">{val.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              How We Work
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "1", title: "You Tell Us What You Need", desc: "Contact us with your requirements. We listen and understand your situation." },
                { step: "2", title: "We Create a Plan", desc: "Our team prepares a clear plan and quote tailored to your needs." },
                { step: "3", title: "We Deliver Results", desc: "We execute the work safely, on time, and to the highest standards." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-secondary-foreground/80 mb-6 max-w-xl mx-auto">
            Contact us today and let us show you how we can help your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-7 py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
            <Link
              to="/quote"
              className="border border-secondary-foreground/30 text-secondary-foreground px-7 py-3 rounded-md font-heading font-semibold text-sm hover:bg-secondary-foreground/10 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
