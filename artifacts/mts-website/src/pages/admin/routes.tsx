import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  useGetRoutes,
  useCreateRoute,
  useUpdateRoute,
  useDeleteRoute,
  getGetRoutesQueryKey,
} from "@workspace/api-client-react";
import type { Route } from "@workspace/api-client-react";

type RouteForm = {
  title: string;
  fromLocation: string;
  toLocation: string;
  covered: string;
  timing: string;
  vehicle: string;
  category: "school" | "college" | "university";
  monthlyFare: number;
};

const emptyForm: RouteForm = {
  title: "",
  fromLocation: "",
  toLocation: "",
  covered: "",
  timing: "",
  vehicle: "",
  category: "school",
  monthlyFare: 0,
};

export default function AdminRoutes() {
  const queryClient = useQueryClient();
  const { data: routes = [], isLoading } = useGetRoutes();
  const createRoute = useCreateRoute();
  const updateRoute = useUpdateRoute();
  const deleteRoute = useDeleteRoute();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [form, setForm] = useState<RouteForm>(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const refresh = () => queryClient.invalidateQueries({ queryKey: getGetRoutesQueryKey() });

  const openAdd = () => {
    setEditingRoute(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (route: Route) => {
    setEditingRoute(route);
    setForm({
      title: route.title,
      fromLocation: route.fromLocation,
      toLocation: route.toLocation,
      covered: route.covered,
      timing: route.timing,
      vehicle: route.vehicle,
      category: route.category as RouteForm["category"],
      monthlyFare: route.monthlyFare ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.fromLocation.trim() || !form.toLocation.trim() || !form.vehicle.trim()) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (editingRoute) {
      updateRoute.mutate(
        { id: editingRoute.id, data: form },
        {
          onSuccess: () => {
            refresh();
            setIsModalOpen(false);
            toast({ title: "Route updated successfully!" });
          },
          onError: () => toast({ title: "Failed to update route.", variant: "destructive" }),
        }
      );
    } else {
      createRoute.mutate(
        { data: form },
        {
          onSuccess: () => {
            refresh();
            setIsModalOpen(false);
            toast({ title: "Route added successfully!" });
          },
          onError: () => toast({ title: "Failed to add route.", variant: "destructive" }),
        }
      );
    }
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteRoute.mutate(
        { id: deleteId },
        {
          onSuccess: () => {
            refresh();
            setDeleteId(null);
            toast({ title: "Route deleted." });
          },
          onError: () => toast({ title: "Failed to delete route.", variant: "destructive" }),
        }
      );
    }
  };

  const categoryColors: Record<string, string> = {
    school: "bg-blue-50 text-blue-700 border-blue-200",
    college: "bg-green-50 text-green-700 border-green-200",
    university: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Routes</h1>
            <p className="text-gray-500">{routes.length} route{routes.length !== 1 ? "s" : ""} active</p>
          </div>
          <Button onClick={openAdd} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Route
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Route Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>From &rarr; To</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Timing</TableHead>
                  <TableHead>Monthly Fare</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium max-w-[180px]">{route.title}</TableCell>
                    <TableCell>
                      <span className={`capitalize text-xs font-medium px-2 py-1 rounded-full border ${categoryColors[route.category] ?? ""}`}>
                        {route.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="text-gray-800">{route.fromLocation}</span>
                      <br />
                      <span className="text-gray-400">&rarr; {route.toLocation}</span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{route.vehicle}</TableCell>
                    <TableCell className="text-sm text-gray-600">{route.timing}</TableCell>
                    <TableCell className="text-sm font-medium">
                      {route.monthlyFare && route.monthlyFare > 0
                        ? <span className="text-green-700">Rs. {route.monthlyFare.toLocaleString()}</span>
                        : <span className="text-gray-400 italic">Not set</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => openEdit(route)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setDeleteId(route.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {routes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                      No routes yet. Click "Add New Route" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Add / Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingRoute ? "Edit Route" : "Add New Route"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-1">
                <Label>Route Title *</Label>
                <Input
                  placeholder="e.g. Bahria Town → DHA Route"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>From (Starting Point) *</Label>
                  <Input
                    placeholder="Bahria Town, Rawalpindi"
                    value={form.fromLocation}
                    onChange={(e) => setForm({ ...form, fromLocation: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label>To (Destination) *</Label>
                  <Input
                    placeholder="DHA Phase, Islamabad"
                    value={form.toLocation}
                    onChange={(e) => setForm({ ...form, toLocation: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Covered Institutions</Label>
                <Input
                  placeholder="School A, College B, University C"
                  value={form.covered}
                  onChange={(e) => setForm({ ...form, covered: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Category *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v as RouteForm["category"] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Vehicle Type *</Label>
                  <Input
                    placeholder="Vans & Hiace"
                    value={form.vehicle}
                    onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Timing</Label>
                  <Input
                    placeholder="7:00 AM - 2:00 PM"
                    value={form.timing}
                    onChange={(e) => setForm({ ...form, timing: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Monthly Fare (PKR)</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 4500"
                    value={form.monthlyFare === 0 ? "" : form.monthlyFare}
                    onChange={(e) => setForm({ ...form, monthlyFare: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                  disabled={createRoute.isPending || updateRoute.isPending}
                >
                  {createRoute.isPending || updateRoute.isPending ? "Saving..." : editingRoute ? "Save Changes" : "Add Route"}
                </Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this route?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The route will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
                disabled={deleteRoute.isPending}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </AuthGuard>
  );
}
