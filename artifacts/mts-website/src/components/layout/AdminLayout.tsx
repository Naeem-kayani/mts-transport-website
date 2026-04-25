import { Link, useLocation } from "wouter";
import { LayoutDashboard, Map, MessageSquare, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("mts_admin_auth");
    setLocation("/admin/login");
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/routes", label: "Manage Routes", icon: Map },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/contacts", label: "Contact Requests", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block flex-shrink-0 relative">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-primary">MTS Admin</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  location === item.href
                    ? "bg-red-50 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="md:hidden bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">MTS Admin</h2>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}