import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Industry-experienced professionals",
  "Commitment to safety & compliance",
  "End-to-end project support",
  "Competitive & transparent pricing",
  "Proven track record of delivery",
  "24/7 operational support",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-heading text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Why Choose Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built on Trust,{" "}
              <span className="text-primary">Driven by Excellence</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Obruse Apex Services is a trusted partner for businesses seeking reliable facility management, safety consultation, manpower solutions, and procurement services. We combine industry expertise with a relentless focus on quality to deliver measurable results.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason) => (
                <div key={reason} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
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
            {[
              { number: "500+", label: "Projects Delivered" },
              { number: "12+", label: "Years Experience" },
              { number: "150+", label: "Active Clients" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-background border border-border rounded-lg p-6 text-center"
              >
                <p className="font-heading text-3xl font-bold text-primary mb-1">
                  {stat.number}
                </p>
                <p className="text-muted-foreground text-xs font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
