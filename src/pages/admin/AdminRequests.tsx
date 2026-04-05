import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statuses = ["pending", "in_progress", "completed", "cancelled"];

const AdminRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const { toast } = useToast();
  const perPage = 10;

  const fetchRequests = async () => {
    const { data } = await supabase.from("service_requests").select("*").order("created_at", { ascending: false });
    if (data) setRequests(data);
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id: string, status: "pending" | "in_progress" | "completed" | "cancelled") => {
    const { error } = await supabase.from("service_requests").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Status updated" });
      fetchRequests();
    }
  };

  const deleteRequest = async (id: string) => {
    const { error } = await supabase.from("service_requests").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Request deleted" });
      fetchRequests();
    }
  };

  const paginated = requests.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(requests.length / perPage);

  const statusColor = (s: string) => {
    if (s === "pending") return "bg-yellow-100 text-yellow-700";
    if (s === "in_progress") return "bg-blue-100 text-blue-700";
    if (s === "completed") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Service Requests ({requests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <p className="font-medium">{r.full_name}</p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    </TableCell>
                    <TableCell className="capitalize">{r.service_type.replace(/_/g, " ")}</TableCell>
                    <TableCell>{r.phone}</TableCell>
                    <TableCell>{r.location || "—"}</TableCell>
                    <TableCell>
                      <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map(s => (
                            <SelectItem key={s} value={s} className="capitalize">{s.replace(/_/g, " ")}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => deleteRequest(r.id)} className="text-destructive hover:text-destructive">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No requests.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <span className="text-sm text-muted-foreground">Page {page + 1} of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminRequests;
