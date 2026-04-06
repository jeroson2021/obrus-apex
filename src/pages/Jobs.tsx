import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string | null;
  department: string | null;
  description: string | null;
  requirements: string[];
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (data) setJobs(data as Job[]);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const locations = ["All", ...Array.from(new Set(jobs.map(j => j.location)))];

  const filtered = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || (job.department || "").toLowerCase().includes(search.toLowerCase());
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
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">No open positions right now</h3>
              <p className="text-muted-foreground mb-6">We don't have any vacancies at the moment, but you can submit your CV and we will reach out when a position opens up.</p>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Submit Your CV <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by role or department..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocationFilter(loc)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        locationFilter === loc ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
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
                            {job.experience && <span className="inline-flex items-center gap-1"><Briefcase size={14} /> {job.experience}</span>}
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
                          {job.description && <p className="text-muted-foreground text-sm mb-4">{job.description}</p>}
                          {job.requirements && job.requirements.length > 0 && (
                            <>
                              <h4 className="font-heading font-semibold text-foreground text-sm mb-2">Requirements:</h4>
                              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-4">
                                {job.requirements.map((req) => <li key={req}>{req}</li>)}
                              </ul>
                            </>
                          )}
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
            </>
          )}

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
