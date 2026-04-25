import { useState } from "react";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Map, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";

export default function AdminDashboard() {
  const [stats] = useState(() => ({
    routes: storage.getRoutes().length,
    messages: storage.getMessages().length,
    contacts: storage.getContacts().length,
    unresolvedMessages: storage.getMessages().filter((m) => m.status === "unresolved").length,
    newContacts: storage.getContacts().filter((c) => c.status === "new").length,
  }));

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin!</h1>
          <p className="text-gray-600 mt-2">Manage your transport service operations from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Routes</CardTitle>
              <Map className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.routes}</div>
              <p className="text-xs text-gray-400 mt-1">Transport routes configured</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Messages</CardTitle>
              <MessageSquare className="w-5 h-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.messages}</div>
              <p className="text-xs text-gray-400 mt-1">
                {stats.unresolvedMessages} unresolved
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Contact Requests</CardTitle>
              <Users className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.contacts}</div>
              <p className="text-xs text-gray-400 mt-1">
                {stats.newContacts} new
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/routes">
              <Button className="flex items-center gap-2">
                <Map className="w-4 h-4" /> Manage Routes
              </Button>
            </Link>
            <Link href="/admin/messages">
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> View Messages
                {stats.unresolvedMessages > 0 && (
                  <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5">
                    {stats.unresolvedMessages}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/admin/contacts">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> View Contact Requests
                {stats.newContacts > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                    {stats.newContacts}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
