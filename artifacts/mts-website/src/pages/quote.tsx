import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, MapPin, ArrowRight, PhoneCall, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRoutes } from "@workspace/api-client-react";

const categoryLabels: Record<string, string> = {
  school: "School",
  college: "College",
  university: "University",
};

const categoryColors: Record<string, string> = {
  school: "bg-blue-50 border-blue-200 text-blue-700",
  college: "bg-green-50 border-green-200 text-green-700",
  university: "bg-purple-50 border-purple-200 text-purple-700",
};

export default function Quote() {
  const { data: routes = [], isLoading } = useGetRoutes();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRouteId, setSelectedRouteId] = useState<string>("");

  const filteredRoutes = useMemo(() => {
    if (selectedCategory === "all") return routes;
    return routes.filter((r) => r.category === selectedCategory);
  }, [routes, selectedCategory]);

  const selectedRoute = useMemo(() => {
    if (!selectedRouteId) return null;
    return routes.find((r) => r.id === parseInt(selectedRouteId)) ?? null;
  }, [routes, selectedRouteId]);

  const whatsappText = selectedRoute
    ? encodeURIComponent(
        `Hello MTS! I'm interested in booking transport on the "${selectedRoute.title}" route (${selectedRoute.fromLocation} → ${selectedRoute.toLocation}). Please confirm availability.`
      )
    : encodeURIComponent("Hello MTS! I'd like to request a transport quote.");

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <Calculator className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Get a Quote</h1>
            <p className="text-red-100 text-lg max-w-2xl mx-auto">
              Select your route below to see the monthly fare. Book instantly via WhatsApp or call us to confirm your seat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Find Your Route</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Filter by Type</label>
                <Select
                  value={selectedCategory}
                  onValueChange={(v) => {
                    setSelectedCategory(v);
                    setSelectedRouteId("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Route</label>
                {isLoading ? (
                  <div className="flex items-center gap-2 h-10 px-3 border rounded-md text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading routes...
                  </div>
                ) : (
                  <Select value={selectedRouteId} onValueChange={setSelectedRouteId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a route..." />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredRoutes.map((r) => (
                        <SelectItem key={r.id} value={String(r.id)}>
                          {r.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Route Result Card */}
            {selectedRoute ? (
              <motion.div
                key={selectedRoute.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border-2 border-primary/20 rounded-xl p-6 bg-red-50/40 mt-2"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${categoryColors[selectedRoute.category] ?? ""}`}
                      >
                        {categoryLabels[selectedRoute.category] ?? selectedRoute.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{selectedRoute.title}</h3>

                    <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>{selectedRoute.fromLocation}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span>{selectedRoute.toLocation}</span>
                    </div>

                    {selectedRoute.covered && (
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium text-gray-700">Covers:</span> {selectedRoute.covered}
                      </p>
                    )}

                    {selectedRoute.timing && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Timing:</span> {selectedRoute.timing}
                      </p>
                    )}
                  </div>

                  {/* Fare Badge */}
                  <div className="text-center bg-white rounded-xl border border-primary/20 p-5 shadow-sm min-w-[140px]">
                    <p className="text-xs text-gray-500 font-medium mb-1">Monthly Fare</p>
                    {selectedRoute.monthlyFare && selectedRoute.monthlyFare > 0 ? (
                      <>
                        <p className="text-3xl font-bold text-primary">
                          Rs. {selectedRoute.monthlyFare.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">per month</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xl font-bold text-gray-600">Call Us</p>
                        <p className="text-xs text-gray-400 mt-1">for pricing</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/923105605600?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Book via WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+923105605600" className="flex-1">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-red-50 gap-2">
                      <PhoneCall className="w-4 h-4" /> Call to Book
                    </Button>
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center text-gray-400">
                <Calculator className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Select a route above to see the monthly fare</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* All Routes List */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Available Routes</h2>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : routes.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No routes available yet. Please call us for details.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {routes.map((route, i) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4 flex flex-wrap items-center justify-between gap-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedRouteId(String(route.id))}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${categoryColors[route.category] ?? ""}`}>
                        {route.category}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900">{route.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {route.fromLocation} → {route.toLocation}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {route.monthlyFare && route.monthlyFare > 0 ? (
                      <p className="text-lg font-bold text-primary">
                        Rs. {route.monthlyFare.toLocaleString()}
                        <span className="text-xs font-normal text-gray-400">/mo</span>
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-gray-400">Call for price</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-4">
              Don't see your area? <strong>We can create a custom route for you!</strong>
            </p>
            <Link href="/contact">
              <Button className="px-8">Request Custom Route</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
