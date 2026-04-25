import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Users } from "lucide-react";

export default function AdminContacts() {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Contact Requests</h1>
          <p className="text-gray-500">View contact forms submitted by users.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No contact requests yet.</h3>
          <p className="text-gray-500">When users fill out the contact form, their requests will appear here.</p>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}