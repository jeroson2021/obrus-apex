import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    const fetch = async () => {
      const [pRes, rRes] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("*"),
      ]);
      if (pRes.data) setProfiles(pRes.data);
      if (rRes.data) setRoles(rRes.data);
    };
    fetch();
  }, []);

  const getUserRoles = (userId: string) => roles.filter(r => r.user_id === userId).map(r => r.role);

  const filtered = profiles.filter(p =>
    (p.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.company_name || "").toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle>Users ({filtered.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.full_name || "—"}</TableCell>
                  <TableCell>{p.phone || "—"}</TableCell>
                  <TableCell>{p.company_name || "—"}</TableCell>
                  <TableCell><Badge variant="outline">{p.user_type || "client"}</Badge></TableCell>
                  <TableCell>
                    {getUserRoles(p.user_id).length > 0
                      ? getUserRoles(p.user_id).map(r => <Badge key={r} variant="secondary" className="mr-1">{r}</Badge>)
                      : <span className="text-muted-foreground text-xs">user</span>}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">No users found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
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

export default AdminUsers;
