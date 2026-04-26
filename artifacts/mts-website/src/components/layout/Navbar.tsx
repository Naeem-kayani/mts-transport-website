import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/routes", label: "Routes" },
    { href: "/fleet", label: "Fleet" },
    { href: "/quote", label: "Get Quote" },
    { href: "/contact", label: "Contact" },
    { href: "/faqs", label: "FAQ" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary tracking-tight">MTS</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ? "text-primary border-b-2 border-primary pb-1" : "text-gray-700"
                  } cursor-pointer`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a href="tel:+923105605600" data-testid="link-call-nav">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                Call Now
              </Button>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location === link.href ? "text-primary bg-red-50" : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-4 px-3">
               <a href="tel:+923105605600" className="w-full flex">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-md flex items-center justify-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}