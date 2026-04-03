import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { ClipboardList, Briefcase, User, Clock, CheckCircle2, AlertCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { id: "requests", label: "My Service Requests", icon: ClipboardList },
  { id: "applications", label: "My Job Applications", icon: Briefcase },
  { id: "profile", label: "Profile Settings", icon: User },
];

const statusColors: Record<string, string> = {
  pending: "text-yellow-600 bg-yellow-50",
  in_progress: "text-blue-600 bg-blue-50",
  completed: "text-green-600 bg-green-50",
  cancelled: "text-red-600 bg-red-50",
  submitted: "text-yellow-600 bg-yellow-50",
  under_review: "text-blue-600 bg-blue-50",
  shortlisted: "text-green-600 bg-green-50",
  rejected: "text-red-600 bg-red-50",
  hired: "text-green-600 bg-green-50",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  submitted: "Submitted",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (["completed", "shortlisted", "hired"].includes(status)) return <CheckCircle2 size={14} />;
  if (["pending", "submitted", "under_review"].includes(status)) return <Clock size={14} />;
  return <AlertCircle size={14} />;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [requests, setRequests] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [profile, setProfile] = useState<{ full_name: string; phone: string; company_name: string }>({ full_name: "", phone: "", company_name: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [reqRes, appRes, profRes] = await Promise.all([
        supabase.from("service_requests").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("job_applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
      ]);
      if (reqRes.data) setRequests(reqRes.data);
      if (appRes.data) setApplications(appRes.data);
      if (profRes.data) setProfile({ full_name: profRes.data.full_name || "", phone: profRes.data.phone || "", company_name: profRes.data.company_name || "" });
    };
    fetchData();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase.from("profiles").update({
      full_name: profile.full_name,
      phone: profile.phone,
      company_name: profile.company_name,
    }).eq("user_id", user.id);
    setSavingProfile(false);
    if (error) {
      toast({ title: "Failed to save profile", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-6 bg-primary">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">Dashboard</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">Manage your requests and applications</p>
          </motion.div>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
            <LogOut size={16} /> Sign Out
          </Button>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "requests" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground">Service Requests</h2>
                <Button variant="secondary" size="sm" asChild><a href="/request-service">New Request</a></Button>
              </div>
              {requests.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No service requests yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {requests.map((req) => (
                    <div key={req.id} className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-heading font-semibold text-foreground capitalize">{req.service_type.replace("_", " ")}</p>
                        <p className="text-muted-foreground text-sm">{new Date(req.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColors[req.status] || ""}`}>
                        <StatusIcon status={req.status} />
                        {statusLabels[req.status] || req.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Job Applications</h2>
              {applications.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No job applications yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div key={app.id} className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-heading font-semibold text-foreground">{app.position}</p>
                        <p className="text-muted-foreground text-sm">Applied {new Date(app.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || ""}`}>
                        <StatusIcon status={app.status} />
                        {statusLabels[app.status] || app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Profile Settings</h2>
              <div className="bg-card border border-border rounded-lg p-8 space-y-4 max-w-lg">
                <div><Label>Full Name</Label><Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} /></div>
                <div><Label>Phone</Label><Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div>
                <div><Label>Company Name</Label><Input value={profile.company_name} onChange={(e) => setProfile({ ...profile, company_name: e.target.value })} /></div>
                <div><Label>Email</Label><Input value={user.email || ""} disabled className="opacity-60" /></div>
                <Button variant="secondary" onClick={handleSaveProfile} disabled={savingProfile}>
                  {savingProfile ? "Saving..." : "Save Changes"}
                </Button>
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
