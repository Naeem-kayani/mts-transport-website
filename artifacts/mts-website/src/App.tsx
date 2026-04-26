import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingButtons } from "@/components/layout/FloatingButtons";

// Public Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Routes from "@/pages/routes";
import Fleet from "@/pages/fleet";
import Contact from "@/pages/contact";
import FAQs from "@/pages/faqs";
import Quote from "@/pages/quote";

// Admin Pages
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminRoutes from "@/pages/admin/routes";
import AdminMessages from "@/pages/admin/messages";
import AdminContacts from "@/pages/admin/contacts";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/routes" component={Routes} />
      <Route path="/fleet" component={Fleet} />
      <Route path="/contact" component={Contact} />
      <Route path="/faqs" component={FAQs} />
      <Route path="/quote" component={Quote} />
      
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/routes" component={AdminRoutes} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/contacts" component={AdminContacts} />

      <Route component={NotFound} />
    </Switch>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <FloatingButtons />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <MainLayout>
            <Router />
          </MainLayout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
