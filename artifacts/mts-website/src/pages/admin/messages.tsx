import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { MessageSquare } from "lucide-react";

export default function AdminMessages() {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500">View messages received via the floating message button.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No messages yet.</h3>
          <p className="text-gray-500">When users send messages, they will appear here.</p>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}