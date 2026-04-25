import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Car } from "lucide-react";

const allRoutes = [
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

export default function Routes() {
  const [filter, setFilter] = useState("all");

  const filteredRoutes = allRoutes.filter(route => 
    filter === "all" ? true : route.category === filter
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <section className="bg-primary py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our Routes</h1>
        <p className="mt-4 text-xl text-red-50 max-w-2xl mx-auto">
          Extensive network covering key educational institutions across Rawalpindi and Islamabad.
        </p>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "all", label: "All Routes" },
              { id: "school", label: "School Routes" },
              { id: "college", label: "College Routes" },
              { id: "university", label: "University Routes" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === f.id 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Routes Grid */}
          {filteredRoutes.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredRoutes.map((route) => (
                  <motion.div
                    key={route.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary hover:shadow-red-500/10 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-hover:bg-primary transition-colors"></div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 pr-4">{route.title}</h3>
                      <Badge className="bg-red-50 text-primary border-primary/20 capitalize">
                        {route.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Route Path</p>
                          <p className="text-sm text-gray-600">{route.from} &rarr; {route.to}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Institutions Covered</p>
                          <p className="text-sm text-gray-600">{route.covered}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">{route.timing}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">{route.vehicle}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">No routes available. Please check back soon!</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}