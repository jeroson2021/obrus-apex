import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statuses = ["submitted", "under_review", "shortlisted", "rejected", "hired"];

const AdminRecruitment = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const { toast } = useToast();
  const perPage = 10;

  const fetchData = async () => {
    const { data } = await supabase.from("job_applications").select("*").order("created_at", { ascending: false });
    if (data) setApplications(data);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: "submitted" | "under_review" | "shortlisted" | "rejected" | "hired") => {
    const { error } = await supabase.from("job_applications").update({ status }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Status updated" }); fetchData(); }
  };

  const deleteApp = async (id: string) => {
    const { error } = await supabase.from("job_applications").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Application deleted" }); fetchData(); }
  };

  const paginated = applications.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(applications.length / perPage);

  return (
    <AdminLayout>
      <Card>
        <CardHeader><CardTitle>Recruitment ({applications.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>CV</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <p className="font-medium">{a.full_name}</p>
                      <p className="text-xs text-muted-foreground">{a.email}</p>
                    </TableCell>
                    <TableCell>{a.position}</TableCell>
                    <TableCell>{a.phone}</TableCell>
                    <TableCell>
                      {a.cv_url ? (
                        <a href={a.cv_url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline inline-flex items-center gap-1 text-sm">
                          <Download size={14} /> CV
                        </a>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      <Select value={a.status} onValueChange={(v) => updateStatus(a.id, v as "submitted" | "under_review" | "shortlisted" | "rejected" | "hired")}>
                        <SelectTrigger className="w-[130px] h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {statuses.map(s => (
                            <SelectItem key={s} value={s} className="capitalize">{s.replace(/_/g, " ")}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => deleteApp(a.id)} className="text-destructive hover:text-destructive">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No applications.</TableCell></TableRow>
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

export default AdminRecruitment;
