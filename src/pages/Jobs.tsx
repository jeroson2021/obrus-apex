import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const jobListings = [
  { id: 1, title: "Electrical Technician", location: "Lagos", type: "Full-time", department: "Facility Management" },
  { id: 2, title: "Cleaning Supervisor", location: "Abuja", type: "Full-time", department: "Facility Management" },
  { id: 3, title: "HSE Officer", location: "Port Harcourt", type: "Contract", department: "Environmental Services" },
  { id: 4, title: "Plumber", location: "Lagos", type: "Full-time", department: "Facility Management" },
  { id: 5, title: "Waste Management Coordinator", location: "Abuja", type: "Full-time", department: "Environmental Services" },
  { id: 6, title: "Procurement Officer", location: "Lagos", type: "Full-time", department: "Equipment Procurement" },
];

const Jobs = () => {
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
              Job Openings
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Find Your Next Role
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              We are hiring skilled and reliable people across Nigeria. Browse open positions and apply today.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {jobListings.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-secondary/40 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} /> {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Briefcase size={14} /> {job.department}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/careers"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    Apply Now <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-muted rounded-lg p-8 text-center"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              Don't see the right role?
            </h3>
            <p className="text-muted-foreground mb-4">
              Submit your CV and we will reach out when a matching position opens up.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Submit Your CV <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Jobs;
