import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Map, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin!</h1>
          <p className="text-gray-600 mt-2">Manage your transport service operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Routes</CardTitle>
              <Map className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">6</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Messages</CardTitle>
              <MessageSquare className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Contact Requests</CardTitle>
              <Users className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/routes">
              <Button>Manage Routes</Button>
            </Link>
            <Link href="/admin/messages">
              <Button variant="outline">View Messages</Button>
            </Link>
            <Link href="/admin/contacts">
              <Button variant="outline">View Contact Requests</Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}