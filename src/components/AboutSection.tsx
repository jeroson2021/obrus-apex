import { motion } from "framer-motion";
import { CheckCircle2, Shield, Award, Heart, Star } from "lucide-react";

const values = [
  { icon: Shield, label: "Safety", desc: "We put safety first in everything we do" },
  { icon: Heart, label: "Integrity", desc: "We are honest and transparent" },
  { icon: Award, label: "Excellence", desc: "We deliver the best quality" },
  { icon: Star, label: "Reliability", desc: "We keep our promises" },
];

const reasons = [
  "Experienced and trained professionals",
  "Safety-focused operations",
  "Fast and reliable service delivery",
  "Competitive and fair pricing",
  "Trusted by businesses across Nigeria",
  "Available 24/7 for emergencies",
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              Why Choose Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5">
              A Team You Can{" "}
              <span className="text-secondary">Count On</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              OBRUS Apex Services is a trusted Nigerian company that provides quality manpower, facility maintenance, environmental services, and HSE solutions. We work with businesses, organizations, and individuals to deliver safe, reliable, and professional services.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reasons.map((reason) => (
                <div key={reason} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-sm text-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((val) => (
              <div
                key={val.label}
                className="bg-background border border-border rounded-lg p-5 text-center"
              >
                <val.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                <p className="font-heading text-base font-bold text-foreground mb-1">
                  {val.label}
                </p>
                <p className="text-muted-foreground text-xs">{val.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
