import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, UserX } from "lucide-react";

const AdminStaff = () => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchData = async () => {
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_type", "applicant").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("*"),
    ]);
    if (profilesRes.data) setApplicants(profilesRes.data);
    if (rolesRes.data) setRoles(rolesRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const isStaff = (userId: string) => roles.some(r => r.user_id === userId && r.role === "moderator");

  const approveStaff = async (userId: string) => {
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "moderator" });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Staff approved!" });
      fetchData();
    }
  };

  const revokeStaff = async (userId: string) => {
    const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "moderator");
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Staff access revoked." });
      fetchData();
    }
  };

  // Also show all current staff from roles
  const allStaffUserIds = roles.filter(r => r.role === "moderator").map(r => r.user_id);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Staff Applicants & Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.full_name || "—"}</TableCell>
                    <TableCell>{a.phone || "—"}</TableCell>
                    <TableCell>
                      {isStaff(a.user_id)
                        ? <Badge className="bg-green-100 text-green-700">Approved</Badge>
                        : <Badge variant="outline">Pending</Badge>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {isStaff(a.user_id) ? (
                        <Button variant="outline" size="sm" onClick={() => revokeStaff(a.user_id)}>
                          <UserX size={14} className="mr-1" /> Revoke
                        </Button>
                      ) : (
                        <Button variant="secondary" size="sm" onClick={() => approveStaff(a.user_id)}>
                          <UserCheck size={14} className="mr-1" /> Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {applicants.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No staff applicants yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminStaff;
