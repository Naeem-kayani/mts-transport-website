import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { MessageSquare, Eye, Trash2, CheckCircle, Loader2 } from "lucide-react";
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
import {
  useGetMessages,
  useUpdateMessage,
  useDeleteMessage,
  getGetMessagesQueryKey,
} from "@workspace/api-client-react";
import type { Message } from "@workspace/api-client-react";

type Filter = "all" | "unresolved" | "resolved";

export default function AdminMessages() {
  const queryClient = useQueryClient();
  const { data: messages = [], isLoading } = useGetMessages();
  const updateMessage = useUpdateMessage();
  const deleteMessage = useDeleteMessage();

  const [filter, setFilter] = useState<Filter>("all");
  const [viewMessage, setViewMessage] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const refresh = () => queryClient.invalidateQueries({ queryKey: getGetMessagesQueryKey() });

  const filtered = messages.filter((m) =>
    filter === "all" ? true : m.status === filter
  );

  const handleMarkResolved = (id: number) => {
    updateMessage.mutate(
      { id, data: { status: "resolved" } },
      {
        onSuccess: (updated) => {
          refresh();
          if (viewMessage?.id === id) setViewMessage({ ...viewMessage, status: updated.status });
          toast({ title: "Marked as resolved." });
        },
        onError: () => toast({ title: "Failed to update.", variant: "destructive" }),
      }
    );
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteMessage.mutate(
        { id: deleteId },
        {
          onSuccess: () => {
            refresh();
            if (viewMessage?.id === deleteId) setViewMessage(null);
            setDeleteId(null);
            toast({ title: "Message deleted." });
          },
          onError: () => toast({ title: "Failed to delete.", variant: "destructive" }),
        }
      );
    }
  };

  const counts = {
    all: messages.length,
    unresolved: messages.filter((m) => m.status === "unresolved").length,
    resolved: messages.filter((m) => m.status === "resolved").length,
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" });

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500">Messages received via the Send Message button.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "unresolved", "resolved"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No messages yet.</h3>
            <p className="text-gray-500">When users send messages, they will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Message Preview</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((msg) => (
                  <TableRow key={msg.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{msg.name}</TableCell>
                    <TableCell className="text-gray-600">{msg.phone}</TableCell>
                    <TableCell className="text-gray-600 max-w-[200px] truncate">
                      {msg.message.slice(0, 60)}{msg.message.length > 60 ? "..." : ""}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${
                        msg.status === "resolved"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}>
                        {msg.status === "resolved" ? "Resolved" : "Unresolved"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{formatDate(msg.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:bg-blue-50"
                        onClick={() => setViewMessage(msg)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {msg.status === "unresolved" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:bg-green-50"
                          onClick={() => handleMarkResolved(msg.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteId(msg.id)}
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

        {/* View Message Modal */}
        <Dialog open={viewMessage !== null} onOpenChange={(open) => !open && setViewMessage(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Message from {viewMessage?.name}</DialogTitle>
            </DialogHeader>
            {viewMessage && (
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Name</p>
                    <p className="text-gray-900 font-medium">{viewMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Phone</p>
                    <p className="text-gray-900 font-medium">{viewMessage.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">Message</p>
                  <p className="text-gray-800 bg-gray-50 rounded-lg p-4 leading-relaxed">{viewMessage.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Status</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${
                      viewMessage.status === "resolved"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}>
                      {viewMessage.status === "resolved" ? "Resolved" : "Unresolved"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Date</p>
                    <p className="text-gray-700 text-sm">{formatDate(viewMessage.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  {viewMessage.status === "unresolved" && (
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleMarkResolved(viewMessage.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Mark as Resolved
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => { setDeleteId(viewMessage.id); setViewMessage(null); }}
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
              <AlertDialogTitle>Delete this message?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
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
