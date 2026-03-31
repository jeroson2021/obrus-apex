import { motion } from "framer-motion";
import { Wrench, ShieldCheck, Users, PackageSearch } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Facility Maintenance",
    description:
      "Comprehensive maintenance services for industrial and commercial facilities. We ensure operational efficiency through preventive and corrective maintenance programs.",
  },
  {
    icon: ShieldCheck,
    title: "HSE Consultation",
    description:
      "Expert Health, Safety & Environment consultation services. We help organizations build robust HSE frameworks that meet international standards.",
  },
  {
    icon: Users,
    title: "Manpower Recruitment",
    description:
      "Strategic workforce solutions tailored to your project needs. We source, vet, and deploy skilled professionals across technical and operational roles.",
  },
  {
    icon: PackageSearch,
    title: "Procurement of Materials",
    description:
      "Reliable procurement and supply chain management for industrial materials and equipment. We ensure quality, timely delivery, and competitive pricing.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-heading text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Our Core Services
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-lg p-8 hover:border-primary/40 transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
