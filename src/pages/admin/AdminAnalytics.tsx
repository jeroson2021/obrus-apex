import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#1B3A5C", "#2E8B57", "#E67E22", "#8B5CF6", "#EF4444", "#3B82F6"];

const AdminAnalytics = () => {
  const [serviceData, setServiceData] = useState<{ name: string; count: number }[]>([]);
  const [statusData, setStatusData] = useState<{ name: string; value: number }[]>([]);
  const [stats, setStats] = useState({ clients: 0, jobs: 0, staff: 0 });

  useEffect(() => {
    const fetch = async () => {
      const [reqRes, appRes, profRes, rolesRes] = await Promise.all([
        supabase.from("service_requests").select("service_type, status"),
        supabase.from("job_applications").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("role"),
      ]);

      const requests = reqRes.data || [];
      
      // Service type breakdown
      const svcMap: Record<string, number> = {};
      const statusMap: Record<string, number> = {};
      requests.forEach(r => {
        const svc = r.service_type.replace(/_/g, " ");
        svcMap[svc] = (svcMap[svc] || 0) + 1;
        statusMap[r.status] = (statusMap[r.status] || 0) + 1;
      });

      setServiceData(Object.entries(svcMap).map(([name, count]) => ({ name, count })));
      setStatusData(Object.entries(statusMap).map(([name, value]) => ({ name: name.replace(/_/g, " "), value })));
      setStats({
        clients: profRes.count || 0,
        jobs: appRes.count || 0,
        staff: rolesRes.data?.filter(r => r.role === "moderator").length || 0,
      });
    };
    fetch();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Clients", value: stats.clients },
            { label: "Total Jobs", value: stats.jobs },
            { label: "Total Staff", value: stats.staff },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm">{s.label}</p>
                <p className="text-3xl font-bold font-heading">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Requests by Service Type</CardTitle></CardHeader>
            <CardContent>
              {serviceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="text-muted-foreground text-sm">No data yet.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Requests by Status</CardTitle></CardHeader>
            <CardContent>
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                      {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-muted-foreground text-sm">No data yet.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
