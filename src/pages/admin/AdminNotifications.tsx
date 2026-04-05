import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";

const AdminNotifications = () => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [form, setForm] = useState({ user_id: "", title: "", message: "", type: "info" });
  const [sending, setSending] = useState(false);

  const fetchData = async () => {
    const [pRes, nRes] = await Promise.all([
      supabase.from("profiles").select("user_id, full_name"),
      supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(20),
    ]);
    if (pRes.data) setProfiles(pRes.data);
    if (nRes.data) setNotifications(nRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const sendNotification = async () => {
    if (!form.title || !form.message) {
      toast({ title: "Fill all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("notifications").insert({
      user_id: form.user_id || null,
      title: form.title,
      message: form.message,
      type: form.type,
    });
    setSending(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Notification sent!" });
      setForm({ user_id: "", title: "", message: "", type: "info" });
      fetchData();
    }
  };

  const getRecipientName = (id: string | null) => {
    if (!id) return "All users";
    return profiles.find(p => p.user_id === id)?.full_name || "Unknown";
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Send Notification</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Recipient</Label>
              <Select value={form.user_id} onValueChange={v => setForm({ ...form, user_id: v })}>
                <SelectTrigger><SelectValue placeholder="All users (leave empty)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Users</SelectItem>
                  {profiles.map(p => (
                    <SelectItem key={p.user_id} value={p.user_id}>{p.full_name || "Unnamed"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type</Label>
              <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["info", "success", "warning", "error"].map(t => (
                    <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Message</Label><Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} /></div>
            <Button variant="secondary" onClick={sendNotification} disabled={sending}>{sending ? "Sending..." : "Send Notification"}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Notifications</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className="border border-border rounded-lg p-3 flex items-start gap-3">
                  <Bell size={16} className={`mt-0.5 ${n.type === "error" ? "text-destructive" : n.type === "warning" ? "text-yellow-600" : n.type === "success" ? "text-green-600" : "text-blue-600"}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{n.title}</p>
                      <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">To: {getRecipientName(n.user_id)}</p>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && <p className="text-muted-foreground text-sm">No notifications yet.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
