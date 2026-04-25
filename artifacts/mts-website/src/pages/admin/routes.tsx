import { useState } from "react";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const initialRoutes = [
  {
    id: 1,
    title: "Bahria Town to DHA Route",
    from: "Bahria Town, Rawalpindi",
    to: "DHA Phase, Islamabad",
    covered: "DHA Schools, DHA Colleges",
    timing: "7:00 AM - 2:00 PM",
    vehicle: "Vans & Hiace",
    category: "school"
  },
  {
    id: 2,
    title: "Gulrez to PWD Route",
    from: "Gulrez, Rawalpindi",
    to: "PWD Road, Rawalpindi",
    covered: "Government Colleges",
    timing: "8:00 AM - 3:00 PM",
    vehicle: "Buses & Vans",
    category: "college"
  },
  {
    id: 3,
    title: "Saddar to Rawalpindi Route",
    from: "Saddar Bazaar, Rawalpindi",
    to: "Rawalpindi City Center",
    covered: "Private Colleges, Universities",
    timing: "7:30 AM - 4:00 PM",
    vehicle: "All Vehicles",
    category: "university"
  },
  {
    id: 4,
    title: "Rawalpindi to Islamabad University Belt",
    from: "Rawalpindi",
    to: "H-9, Islamabad",
    covered: "COMSATS, QAU, NUML",
    timing: "7:00 AM - 5:00 PM",
    vehicle: "Coaster Buses",
    category: "university"
  },
  {
    id: 5,
    title: "Bahria Phase 8 School Route",
    from: "Bahria Phase 8",
    to: "Multiple Schools",
    covered: "Beaconhouse, City School, Roots",
    timing: "7:00 AM - 2:00 PM",
    vehicle: "Vans",
    category: "school"
  },
  {
    id: 6,
    title: "G-11 to Islamabad College Zone",
    from: "G-11 Markaz",
    to: "F-6, F-7 Islamabad",
    covered: "Islamabad College, Federal College",
    timing: "8:00 AM - 3:00 PM",
    vehicle: "Hiace & Buses",
    category: "college"
  }
];

export default function AdminRoutes() {
  const [routes, setRoutes] = useState(initialRoutes);

  const handleDelete = (id: number) => {
    setRoutes(routes.filter(r => r.id !== id));
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Routes</h1>
            <p className="text-gray-500">Add, edit or remove transport routes.</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Route
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>From &rarr; To</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{route.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {route.from} <br/> <span className="text-gray-400 text-sm">&rarr; {route.to}</span>
                  </TableCell>
                  <TableCell>{route.timing}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(route.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {routes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No routes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}