import { useState } from "react";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Users, Eye, Trash2, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { storage, type ContactRequest } from "@/lib/storage";

type Filter = "all" | "new" | "replied";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactRequest[]>(storage.getContacts());
  const [filter, setFilter] = useState<Filter>("all");
  const [viewContact, setViewContact] = useState<ContactRequest | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const refresh = () => setContacts(storage.getContacts());

  const filtered = contacts.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

  const handleMarkReplied = (id: number) => {
    storage.updateContactStatus(id, "replied");
    refresh();
    if (viewContact?.id === id) setViewContact({ ...viewContact, status: "replied" });
    toast({ title: "Marked as replied." });
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      storage.deleteContact(deleteId);
      refresh();
      setDeleteId(null);
      if (viewContact?.id === deleteId) setViewContact(null);
      toast({ title: "Contact request deleted." });
    }
  };

  const counts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    replied: contacts.filter((c) => c.status === "replied").length,
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" });

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Contact Requests</h1>
          <p className="text-gray-500">Submissions from the contact form on the website.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "new", "replied"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              data-testid={`filter-contacts-${f}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No contact requests yet.</h3>
            <p className="text-gray-500">When users fill out the contact form, their requests will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Pickup Location</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell className="text-gray-600">{contact.phone}</TableCell>
                    <TableCell className="text-gray-600">{contact.pickupLocation || "—"}</TableCell>
                    <TableCell className="text-gray-600 max-w-[180px] truncate">
                      {contact.message ? `${contact.message.slice(0, 50)}${contact.message.length > 50 ? "..." : ""}` : "—"}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${
                        contact.status === "replied"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}>
                        {contact.status === "replied" ? "Replied" : "New"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{formatDate(contact.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:bg-blue-50"
                        onClick={() => setViewContact(contact)}
                        data-testid={`view-contact-${contact.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {contact.status === "new" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:bg-green-50"
                          onClick={() => handleMarkReplied(contact.id)}
                          data-testid={`reply-contact-${contact.id}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteId(contact.id)}
                        data-testid={`delete-contact-${contact.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* View Contact Modal */}
        <Dialog open={viewContact !== null} onOpenChange={(open) => !open && setViewContact(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Contact Request from {viewContact?.name}</DialogTitle>
            </DialogHeader>
            {viewContact && (
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Name</p>
                    <p className="text-gray-900 font-medium">{viewContact.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Phone</p>
                    <p className="text-gray-900 font-medium">{viewContact.phone}</p>
                  </div>
                </div>
                {viewContact.pickupLocation && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Pickup Location</p>
                    <p className="text-gray-800">{viewContact.pickupLocation}</p>
                  </div>
                )}
                {viewContact.message && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1">Message</p>
                    <p className="text-gray-800 bg-gray-50 rounded-lg p-4 leading-relaxed">{viewContact.message}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Status</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${
                      viewContact.status === "replied"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {viewContact.status === "replied" ? "Replied" : "New"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Date</p>
                    <p className="text-gray-700 text-sm">{formatDate(viewContact.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  {viewContact.status === "new" && (
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleMarkReplied(viewContact.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Mark as Replied
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => { setDeleteId(viewContact.id); setViewContact(null); }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this contact request?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </AuthGuard>
  );
}
