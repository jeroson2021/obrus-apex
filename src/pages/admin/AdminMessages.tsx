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
import { useAuth } from "@/contexts/AuthContext";
import { Send, Megaphone } from "lucide-react";

const AdminMessages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [form, setForm] = useState({ recipient_id: "", subject: "", body: "", is_broadcast: false });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const [pRes, mRes] = await Promise.all([
        supabase.from("profiles").select("user_id, full_name"),
        supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(20),
      ]);
      if (pRes.data) setProfiles(pRes.data);
      if (mRes.data) setMessages(mRes.data);
    };
    fetch();
  }, []);

  const sendMessage = async () => {
    if (!form.subject || !form.body) {
      toast({ title: "Please fill subject and message", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      sender_id: user?.id,
      recipient_id: form.is_broadcast ? null : form.recipient_id || null,
      subject: form.subject,
      body: form.body,
      is_broadcast: form.is_broadcast,
    });
    setSending(false);
    if (error) {
      toast({ title: "Failed to send", description: error.message, variant: "destructive" });
    } else {
      toast({ title: form.is_broadcast ? "Broadcast sent!" : "Message sent!" });
      setForm({ recipient_id: "", subject: "", body: "", is_broadcast: false });
      const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(20);
      if (data) setMessages(data);
    }
  };

  const getRecipientName = (id: string | null) => {
    if (!id) return "Broadcast";
    return profiles.find(p => p.user_id === id)?.full_name || "Unknown";
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Send Message</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Button
                variant={form.is_broadcast ? "secondary" : "outline"}
                size="sm"
                onClick={() => setForm({ ...form, is_broadcast: true, recipient_id: "" })}
              >
                <Megaphone size={14} className="mr-1" /> Broadcast
              </Button>
              <Button
                variant={!form.is_broadcast ? "secondary" : "outline"}
                size="sm"
                onClick={() => setForm({ ...form, is_broadcast: false })}
              >
                <Send size={14} className="mr-1" /> Direct
              </Button>
            </div>

            {!form.is_broadcast && (
              <div>
                <Label>Recipient</Label>
                <Select value={form.recipient_id} onValueChange={v => setForm({ ...form, recipient_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select user" /></SelectTrigger>
                  <SelectContent>
                    {profiles.map(p => (
                      <SelectItem key={p.user_id} value={p.user_id}>{p.full_name || "Unnamed"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div><Label>Subject</Label><Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></div>
            <div><Label>Message</Label><Textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={4} /></div>
            <Button variant="secondary" onClick={sendMessage} disabled={sending}>{sending ? "Sending..." : "Send"}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Sent Messages</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {messages.map(m => (
                <div key={m.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{m.subject}</p>
                    <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{m.body.substring(0, 100)}{m.body.length > 100 ? "..." : ""}</p>
                  <p className="text-xs text-muted-foreground">To: {m.is_broadcast ? "Everyone" : getRecipientName(m.recipient_id)}</p>
                </div>
              ))}
              {messages.length === 0 && <p className="text-muted-foreground text-sm">No messages yet.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
