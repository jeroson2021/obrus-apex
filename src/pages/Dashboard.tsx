import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { ClipboardList, Briefcase, User, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "requests", label: "My Service Requests", icon: ClipboardList },
  { id: "applications", label: "My Job Applications", icon: Briefcase },
  { id: "profile", label: "Profile Settings", icon: User },
];

const sampleRequests = [
  { id: "REQ-001", service: "Facility Management", date: "2026-03-28", status: "Pending" },
  { id: "REQ-002", service: "Manpower Recruitment", date: "2026-03-20", status: "In Progress" },
  { id: "REQ-003", service: "Equipment Procurement", date: "2026-03-10", status: "Completed" },
];

const sampleApplications = [
  { id: "APP-001", role: "HVAC Technician", location: "Abuja", date: "2026-03-25", status: "Under Review" },
  { id: "APP-002", role: "Electrician", location: "Lagos", date: "2026-03-18", status: "Shortlisted" },
];

const statusColors: Record<string, string> = {
  Pending: "text-yellow-600 bg-yellow-50",
  "In Progress": "text-blue-600 bg-blue-50",
  Completed: "text-green-600 bg-green-50",
  "Under Review": "text-yellow-600 bg-yellow-50",
  Shortlisted: "text-green-600 bg-green-50",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "Completed" || status === "Shortlisted") return <CheckCircle2 size={14} />;
  if (status === "Pending" || status === "Under Review") return <Clock size={14} />;
  return <AlertCircle size={14} />;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-6 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">Dashboard</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">Manage your requests and applications</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Service Requests */}
          {activeTab === "requests" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground">Service Requests</h2>
                <Button variant="secondary" size="sm" asChild>
                  <a href="/request-service">New Request</a>
                </Button>
              </div>
              <div className="space-y-3">
                {sampleRequests.map((req) => (
                  <div key={req.id} className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{req.service}</p>
                      <p className="text-muted-foreground text-sm">{req.id} • {req.date}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColors[req.status]}`}>
                      <StatusIcon status={req.status} />
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Job Applications */}
          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Job Applications</h2>
              <div className="space-y-3">
                {sampleApplications.map((app) => (
                  <div key={app.id} className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{app.role}</p>
                      <p className="text-muted-foreground text-sm">{app.location} • Applied {app.date}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                      <StatusIcon status={app.status} />
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Profile Settings</h2>
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Profile management will be available once the backend is connected.</p>
                <p className="text-muted-foreground text-sm mt-2">Please set up Lovable Cloud to enable authentication and profile features.</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Dashboard;
