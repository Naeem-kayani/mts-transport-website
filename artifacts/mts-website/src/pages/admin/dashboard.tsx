import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Map, Users, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetRoutes, useGetMessages, useGetContacts } from "@workspace/api-client-react";

export default function AdminDashboard() {
  const { data: routes = [], isLoading: loadingRoutes } = useGetRoutes();
  const { data: messages = [], isLoading: loadingMessages } = useGetMessages();
  const { data: contacts = [], isLoading: loadingContacts } = useGetContacts();

  const isLoading = loadingRoutes || loadingMessages || loadingContacts;

  const unresolvedMessages = messages.filter((m) => m.status === "unresolved").length;
  const newContacts = contacts.filter((c) => c.status === "new").length;

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin!</h1>
          <p className="text-gray-600 mt-2">Manage your transport service operations from here.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Routes</CardTitle>
                  <Map className="w-5 h-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{routes.length}</div>
                  <p className="text-xs text-gray-400 mt-1">Transport routes configured</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Messages</CardTitle>
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{messages.length}</div>
                  <p className="text-xs text-gray-400 mt-1">
                    {unresolvedMessages > 0 ? (
                      <span className="text-yellow-600 font-medium">{unresolvedMessages} unresolved</span>
                    ) : (
                      "All resolved"
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Contact Requests</CardTitle>
                  <Users className="w-5 h-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{contacts.length}</div>
                  <p className="text-xs text-gray-400 mt-1">
                    {newContacts > 0 ? (
                      <span className="text-blue-600 font-medium">{newContacts} new</span>
                    ) : (
                      "No new requests"
                    )}
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
                    {unresolvedMessages > 0 && (
                      <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5">
                        {unresolvedMessages}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link href="/admin/contacts">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> View Contact Requests
                    {newContacts > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                        {newContacts}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </AdminLayout>
    </AuthGuard>
  );
}
