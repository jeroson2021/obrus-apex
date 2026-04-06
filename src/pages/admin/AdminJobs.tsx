import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string | null;
  department: string | null;
  description: string | null;
  requirements: string[];
  is_active: boolean;
  created_at: string;
}

const emptyForm = {
  title: "",
  location: "",
  type: "Full-time",
  experience: "",
  department: "",
  description: "",
  requirements: "",
  is_active: true,
};

const AdminJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchJobs = async () => {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setJobs(data as Job[]);
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.location) {
      toast({ title: "Error", description: "Title and location are required.", variant: "destructive" });
      return;
    }
    const requirements = form.requirements.split("\n").map(r => r.trim()).filter(Boolean);
    const payload = {
      title: form.title,
      location: form.location,
      type: form.type,
      experience: form.experience || null,
      department: form.department || null,
      description: form.description || null,
      requirements,
      is_active: form.is_active,
      created_by: user?.id,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("jobs").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("jobs").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Job updated" : "Job posted" });
      setForm(emptyForm);
      setEditingId(null);
      setDialogOpen(false);
      fetchJobs();
    }
  };

  const deleteJob = async (id: string) => {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Job deleted" }); fetchJobs(); }
  };

  const startEdit = (job: Job) => {
    setForm({
      title: job.title,
      location: job.location,
      type: job.type,
      experience: job.experience || "",
      department: job.department || "",
      description: job.description || "",
      requirements: (job.requirements || []).join("\n"),
      is_active: job.is_active,
    });
    setEditingId(job.id);
    setDialogOpen(true);
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("jobs").update({ is_active: !current }).eq("id", id);
    fetchJobs();
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Listings ({jobs.length})</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew} size="sm" className="gap-1">
                <Plus size={16} /> Post Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Job" : "Post New Job"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title *</label>
                  <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. HVAC Technician" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location *</label>
                    <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Lagos" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Type</label>
                    <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Experience</label>
                    <Input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 3+ years" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Department</label>
                    <Input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} placeholder="e.g. Facility Management" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Job description..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Requirements (one per line)</label>
                  <Textarea value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} placeholder="HVAC certification&#10;3+ years experience" rows={4} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.is_active} onCheckedChange={v => setForm({ ...form, is_active: v })} />
                  <span className="text-sm">Active (visible to applicants)</span>
                </div>
                <Button onClick={handleSubmit} className="w-full">{editingId ? "Update Job" : "Post Job"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map(job => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>
                      <Switch checked={job.is_active} onCheckedChange={() => toggleActive(job.id, job.is_active)} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(job.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(job)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteJob(job.id)} className="text-destructive hover:text-destructive">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {jobs.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">No jobs posted yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminJobs;
