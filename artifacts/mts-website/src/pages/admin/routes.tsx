import { useState } from "react";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import { storage, type Route } from "@/lib/storage";

type RouteForm = {
  title: string;
  from: string;
  to: string;
  covered: string;
  timing: string;
  vehicle: string;
  category: "school" | "college" | "university";
};

const emptyForm: RouteForm = {
  title: "",
  from: "",
  to: "",
  covered: "",
  timing: "",
  vehicle: "",
  category: "school",
};

export default function AdminRoutes() {
  const [routes, setRoutes] = useState<Route[]>(storage.getRoutes());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [form, setForm] = useState<RouteForm>(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const refresh = () => setRoutes(storage.getRoutes());

  const openAdd = () => {
    setEditingRoute(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (route: Route) => {
    setEditingRoute(route);
    setForm({
      title: route.title,
      from: route.from,
      to: route.to,
      covered: route.covered,
      timing: route.timing,
      vehicle: route.vehicle,
      category: route.category,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.from.trim() || !form.to.trim() || !form.vehicle.trim()) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (editingRoute) {
      storage.updateRoute(editingRoute.id, form);
      toast({ title: "Route updated successfully!" });
    } else {
      storage.addRoute(form);
      toast({ title: "Route added successfully!" });
    }
    refresh();
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      storage.deleteRoute(deleteId);
      refresh();
      setDeleteId(null);
      toast({ title: "Route deleted." });
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Route Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>From → To</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium max-w-[200px]">{route.title}</TableCell>
                  <TableCell>
                    <span className={`capitalize text-xs font-medium px-2 py-1 rounded-full border ${categoryColors[route.category]}`}>
                      {route.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className="text-gray-800">{route.from}</span>
                    <br />
                    <span className="text-gray-400">→ {route.to}</span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{route.vehicle}</TableCell>
                  <TableCell className="text-sm text-gray-600">{route.timing}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => openEdit(route)}
                      data-testid={`edit-route-${route.id}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteId(route.id)}
                      data-testid={`delete-route-${route.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {routes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                    No routes yet. Click "Add New Route" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

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
                  data-testid="input-route-title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>From (Starting Point) *</Label>
                  <Input
                    placeholder="Bahria Town, Rawalpindi"
                    value={form.from}
                    onChange={(e) => setForm({ ...form, from: e.target.value })}
                    data-testid="input-route-from"
                  />
                </div>
                <div className="space-y-1">
                  <Label>To (Destination) *</Label>
                  <Input
                    placeholder="DHA Phase, Islamabad"
                    value={form.to}
                    onChange={(e) => setForm({ ...form, to: e.target.value })}
                    data-testid="input-route-to"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Covered Institutions</Label>
                <Input
                  placeholder="School A, College B, University C"
                  value={form.covered}
                  onChange={(e) => setForm({ ...form, covered: e.target.value })}
                  data-testid="input-route-covered"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Category *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v as RouteForm["category"] })}
                  >
                    <SelectTrigger data-testid="select-route-category">
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
                    data-testid="input-route-vehicle"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Timing</Label>
                <Input
                  placeholder="7:00 AM - 2:00 PM"
                  value={form.timing}
                  onChange={(e) => setForm({ ...form, timing: e.target.value })}
                  data-testid="input-route-timing"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} className="flex-1" data-testid="button-save-route">
                  {editingRoute ? "Save Changes" : "Add Route"}
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
                data-testid="button-confirm-delete"
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
