import { motion } from "framer-motion";
import { Thermometer, MapPin, UserCheck, ShieldCheck } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "80+", label: "Vans" },
  { value: "5+", label: "Coaster Buses" },
  { value: "30+", label: "Hiace Box Vehicles" }
];

const features = [
  { icon: Thermometer, title: "AC & Non-AC Options", desc: "Climate control for your comfort" },
  { icon: MapPin, title: "GPS Tracking", desc: "Real-time vehicle tracking for safety" },
  { icon: UserCheck, title: "Trained Drivers", desc: "Verified and professional drivers" },
  { icon: ShieldCheck, title: "Safety Ensured", desc: "All vehicles regularly maintained" }
];

const vehicles = [
  {
    type: "Commuter Van",
    capacity: "12",
    features: ["AC available", "GPS tracked", "Power Steering", "Comfortable Seating"],
    color: "bg-gray-100"
  },
  {
    type: "Coaster Bus",
    capacity: "30",
    features: ["AC equipped", "GPS tracked", "Reclining Seats", "Spacious Interior", "Curtains"],
    color: "bg-gray-100"
  },
  {
    type: "Hiace Box",
    capacity: "14",
    features: ["AC available", "GPS tracked", "Tinted Windows", "Ample Legroom"],
    color: "bg-gray-100"
  }
];

export default function Fleet() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full min-h-screen bg-white">
      <section className="bg-primary py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our Fleet</h1>
        <p className="mt-4 text-xl text-red-50 max-w-2xl mx-auto">
          Well-maintained, reliable vehicles designed for maximum safety and comfort.
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100"
              >
                <div className="text-5xl font-extrabold text-primary mb-2">{stat.value}</div>
                <div className="text-xl font-medium text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fleet Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Showcase Slider */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Vehicle Showcase</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex">
                {vehicles.map((vehicle, idx) => (
                  <div key={idx} className="flex-[0_0_100%] min-w-0 p-4">
                    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                      <div className={`h-64 ${vehicle.color} flex items-center justify-center`}>
                         <span className="text-gray-400 font-medium tracking-widest uppercase">{vehicle.type} Image Placeholder</span>
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-3xl font-bold text-white">{vehicle.type}</h3>
                          <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                            {vehicle.capacity} Seats
                          </div>
                        </div>
                        <h4 className="text-gray-400 font-medium mb-4 uppercase tracking-wider text-sm">Key Features</h4>
                        <ul className="grid grid-cols-2 gap-3">
                          {vehicle.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-200">
                              <ShieldCheck className="w-4 h-4 text-primary" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <Button 
                onClick={scrollPrev} 
                variant="outline" 
                className="rounded-full bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:text-white"
              >
                &larr; Prev
              </Button>
              <Button 
                onClick={scrollNext} 
                variant="outline" 
                className="rounded-full bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:text-white"
              >
                Next &rarr;
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}