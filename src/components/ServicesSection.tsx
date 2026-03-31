import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Building2, Package, Leaf, ArrowRight } from "lucide-react";
import manpowerImg from "@/assets/manpower.jpg";
import facilityImg from "@/assets/facility.jpg";
import equipmentImg from "@/assets/equipment.jpg";
import environmentalImg from "@/assets/environmental.jpg";

export const services = [
  {
    icon: Users,
    title: "Manpower Recruitment",
    slug: "manpower",
    image: manpowerImg,
    short: "We provide trained and reliable workers to support business operations.",
    description: "We supply reliable workers for businesses of all sizes. Whether you need temporary staff or permanent hires, we source, screen, and deploy the right people for your team.",
    benefits: [
      "Saves hiring time",
      "Access to qualified workers",
      "Flexible workforce solutions",
    ],
    details: [
      "Skilled and unskilled workers",
      "Temporary and permanent staffing",
      "Staff outsourcing",
    ],
    cta: "Request Staff",
  },
  {
    icon: Building2,
    title: "Facility Management",
    slug: "facility-management",
    image: facilityImg,
    short: "We maintain buildings and environments to keep them clean, safe, and fully functional.",
    description: "From cleaning to electrical maintenance, we keep your facilities running at their best. Our team handles everything so you can focus on your business.",
    benefits: [
      "Clean and safe environment",
      "Reduced maintenance issues",
      "Improved workplace productivity",
    ],
    details: [
      "Cleaning & Janitorial Services",
      "Fumigation & Pest Control",
      "Septic Tank Dislodgement & Sewage Management",
      "General Maintenance (Electrical, Plumbing, HVAC)",
    ],
    cta: "Request Service",
  },
  {
    icon: Package,
    title: "Equipment Procurement",
    slug: "equipment-procurement",
    image: equipmentImg,
    short: "We supply quality equipment and tools needed for daily operations.",
    description: "We supply high-quality personal protective equipment (PPE), tools, and operational equipment. Keep your team safe and equipped with reliable gear.",
    benefits: [
      "Access to reliable equipment",
      "Saves procurement stress",
      "Cost-effective supply",
    ],
    details: [
      "PPE (helmets, gloves, boots, coveralls)",
      "Tools and operational equipment",
      "Bulk supply for companies",
    ],
    cta: "Order Equipment",
  },
  {
    icon: Leaf,
    title: "Environmental Services",
    slug: "environmental-services",
    image: environmentalImg,
    short: "We keep environments clean and safe through waste management and sanitation services.",
    description: "We provide professional environmental and sanitation services to keep communities, offices, and industrial sites clean, healthy, and compliant with regulations.",
    benefits: [
      "Cleaner and healthier environment",
      "Regulatory compliance",
      "Reliable waste disposal",
    ],
    details: [
      "Waste Management & Refuse Evacuation",
      "Environmental & Sanitation Services",
      "Drainage Cleaning & Maintenance",
      "Public Health & Hygiene Support",
    ],
    cta: "Request Service",
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
            Our Core Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We focus on four key areas to help your business run smoothly and safely.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-secondary/40 hover:shadow-lg transition-all h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    width={1280}
                    height={854}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/30" />
                  <div className="absolute bottom-4 left-4 w-11 h-11 rounded-md bg-secondary flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.short}
                  </p>
                  <span className="inline-flex items-center gap-1 text-secondary text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
