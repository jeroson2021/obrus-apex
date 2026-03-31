import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { services } from "@/components/ServicesSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {
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
              Our Services
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              What We Do
            </h1>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              We offer a full range of services to support your business operations, keep your facilities running, and ensure a safe and clean environment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-6 max-w-5xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex flex-col md:flex-row gap-6 bg-card border border-border rounded-lg p-6 md:p-8 hover:border-secondary/40 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-md bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 mb-3">
                      {service.details.map((d) => (
                        <li key={d} className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                          {d}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-secondary text-sm font-medium group-hover:gap-2 transition-all">
                      View details <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
