import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const jobListings = [
  {
    id: 1,
    title: "HVAC Technician",
    location: "Abuja",
    type: "Full-time",
    experience: "3+ years",
    department: "Facility Management",
    description: "Install, maintain, and repair HVAC systems across client facilities. Must have experience with commercial cooling and ventilation systems.",
    requirements: ["HVAC certification", "3+ years field experience", "Ability to read technical diagrams", "Good communication skills"],
  },
  {
    id: 2,
    title: "Facility Supervisor",
    location: "Port Harcourt",
    type: "Full-time",
    experience: "5+ years",
    department: "Facility Management",
    description: "Oversee daily facility operations, manage technicians, and ensure maintenance schedules are followed across multiple sites.",
    requirements: ["5+ years in facility management", "Leadership experience", "Knowledge of electrical, plumbing, and HVAC systems", "Strong organizational skills"],
  },
  {
    id: 3,
    title: "Electrician",
    location: "Lagos",
    type: "Contract",
    experience: "2+ years",
    department: "Facility Management",
    description: "Perform electrical installations, repairs, and maintenance in commercial and industrial facilities.",
    requirements: ["Electrical trade certification", "2+ years experience", "Knowledge of safety standards", "Ability to work independently"],
  },
  {
    id: 4,
    title: "Environmental Officer",
    location: "Lagos",
    type: "Full-time",
    experience: "3+ years",
    department: "Environmental Services",
    description: "Coordinate waste management, fumigation, and sanitation operations. Ensure compliance with environmental regulations.",
    requirements: ["Degree in Environmental Science or related field", "3+ years experience", "Knowledge of environmental regulations", "Report writing skills"],
  },
  {
    id: 5,
    title: "Plumber",
    location: "Abuja",
    type: "Full-time",
    experience: "2+ years",
    department: "Facility Management",
    description: "Install and maintain plumbing systems in commercial and residential buildings. Handle repairs and inspections.",
    requirements: ["Plumbing trade certification", "2+ years experience", "Knowledge of modern plumbing systems", "Attention to detail"],
  },
  {
    id: 6,
    title: "Procurement Officer",
    location: "Lagos",
    type: "Full-time",
    experience: "3+ years",
    department: "Equipment Procurement",
    description: "Source, negotiate, and purchase industrial tools, HVAC components, and electrical materials for client projects.",
    requirements: ["3+ years in procurement", "Strong negotiation skills", "Knowledge of industrial equipment", "Vendor management experience"],
  },
];

const locations = ["All", "Lagos", "Abuja", "Port Harcourt"];

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const filtered = jobListings.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.department.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter === "All" || job.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">Careers</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Available Jobs</h1>
            <p className="text-primary-foreground/70 text-lg">
              We are hiring skilled and reliable professionals across Nigeria. Browse open positions and apply today.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by role or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationFilter(loc)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    locationFilter === loc
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {filtered.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-secondary/40 hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        <span className="inline-flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                        <span className="inline-flex items-center gap-1"><Briefcase size={14} /> {job.experience}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                      className="text-secondary text-sm font-medium hover:underline whitespace-nowrap"
                    >
                      {expandedJob === job.id ? "Hide Details" : "View Details"}
                    </button>
                  </div>

                  {expandedJob === job.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-border pt-4 mt-4">
                      <p className="text-muted-foreground text-sm mb-4">{job.description}</p>
                      <h4 className="font-heading font-semibold text-foreground text-sm mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-4">
                        {job.requirements.map((req) => <li key={req}>{req}</li>)}
                      </ul>
                      <Link
                        to="/careers"
                        className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        Apply Now <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No jobs found matching your search. Try different keywords or filters.</p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-muted rounded-lg p-8 text-center"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">Don't see the right role?</h3>
            <p className="text-muted-foreground mb-4">Submit your CV and we will reach out when a matching position opens up.</p>
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
