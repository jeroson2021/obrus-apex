import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Sparkles,
  Bug,
  Droplets,
  Trash2,
  Wrench,
  HardHat,
  ShieldCheck,
  Leaf,
  ArrowRight,
} from "lucide-react";

export const services = [
  {
    icon: Users,
    title: "Recruitment & Manpower Outsourcing",
    slug: "manpower",
    short: "We provide skilled and unskilled workers for temporary and permanent roles.",
    description: "We supply reliable workers for businesses of all sizes. Whether you need temporary staff or permanent hires, we source, screen, and deploy the right people for your team.",
    benefits: ["Reduce hiring costs", "Get workers fast", "Flexible staffing options"],
    details: ["Skilled and unskilled workers", "Temporary and permanent staffing", "Reliable workforce for businesses"],
  },
  {
    icon: Sparkles,
    title: "Cleaning & Janitorial Services",
    slug: "cleaning",
    short: "Professional office, industrial, and post-construction cleaning services.",
    description: "We keep your spaces clean and healthy. Our trained cleaning team handles offices, factories, and construction sites with the right tools and methods.",
    benefits: ["Healthy work environment", "Professional standards", "Regular or one-time service"],
    details: ["Office cleaning", "Industrial cleaning", "Post-construction cleaning"],
  },
  {
    icon: Bug,
    title: "Fumigation, Pest & Rodent Control",
    slug: "fumigation",
    short: "Effective fumigation and pest control for homes and offices.",
    description: "We eliminate pests and rodents from your property using safe and effective methods. Our preventive treatments keep them from coming back.",
    benefits: ["Safe for people and pets", "Long-lasting protection", "Licensed professionals"],
    details: ["Fumigation for homes and offices", "Pest and rodent control", "Preventive treatment"],
  },
  {
    icon: Droplets,
    title: "Septic Tank & Sewage Management",
    slug: "septic",
    short: "Septic tank evacuation, sewage disposal, and drain maintenance.",
    description: "We handle septic tank dislodgement and sewage management safely and efficiently. Our team ensures proper disposal and keeps your drainage systems working.",
    benefits: ["Prevent blockages", "Hygienic disposal", "Fast response"],
    details: ["Septic tank evacuation", "Sewage disposal", "Drain cleaning and maintenance"],
  },
  {
    icon: Trash2,
    title: "Waste Management & Refuse Evacuation",
    slug: "waste",
    short: "Reliable waste collection and disposal for a clean environment.",
    description: "We collect and dispose of waste properly to keep your environment clean and safe. We serve homes, offices, and industrial sites.",
    benefits: ["Clean environment", "Proper disposal", "Regular collection schedules"],
    details: ["Waste collection and disposal", "Clean and safe environment support"],
  },
  {
    icon: Wrench,
    title: "General Facility Maintenance",
    slug: "maintenance",
    short: "Electrical, plumbing, HVAC maintenance and routine repairs.",
    description: "We keep your buildings and facilities running smoothly. From electrical work to plumbing and air conditioning, we handle all routine maintenance and repairs.",
    benefits: ["Reduce downtime", "Extend equipment life", "One team for everything"],
    details: ["Electrical maintenance", "Plumbing services", "HVAC maintenance", "Routine checks and repairs"],
  },
  {
    icon: HardHat,
    title: "Procurement & Supply of Safety Equipment",
    slug: "procurement",
    short: "Quality helmets, gloves, boots, coveralls, and safety tools.",
    description: "We supply high-quality personal protective equipment (PPE) and safety tools. Keep your team protected with the right gear from trusted brands.",
    benefits: ["Certified equipment", "Competitive prices", "Fast delivery"],
    details: ["Helmets, gloves, boots, coveralls", "Safety tools and equipment supply"],
  },
  {
    icon: ShieldCheck,
    title: "HSE Consultancy & Training",
    slug: "hse",
    short: "Safety inspections, risk assessments, and HSE training.",
    description: "We help businesses stay safe and comply with regulations. Our HSE experts provide inspections, risk assessments, training, and ongoing compliance support.",
    benefits: ["Meet regulatory standards", "Reduce workplace accidents", "Expert guidance"],
    details: ["Safety inspections", "Risk assessments", "HSE training for staff", "Compliance support"],
  },
  {
    icon: Leaf,
    title: "Environmental & Sanitation Services",
    slug: "environmental",
    short: "Environmental cleaning, sanitation, and public health support.",
    description: "We provide environmental cleaning and sanitation services that support public health. Our team ensures spaces are hygienic and environmentally responsible.",
    benefits: ["Healthier communities", "Regulatory compliance", "Professional standards"],
    details: ["Environmental cleaning", "Sanitation services", "Public health support"],
  },
];

const ServicesSection = () => {
  return (
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
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a wide range of services to keep your business, facility, and environment running smoothly and safely.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
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
                className="group block bg-card border border-border rounded-lg p-6 hover:border-secondary/40 hover:shadow-lg transition-all h-full"
              >
                <div className="w-11 h-11 rounded-md bg-secondary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {service.short}
                </p>
                <span className="inline-flex items-center gap-1 text-secondary text-sm font-medium group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
