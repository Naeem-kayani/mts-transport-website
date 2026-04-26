import { motion } from "framer-motion";
import { Shield, Clock, Armchair, BadgeDollarSign, Star, Quote } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Safe Drivers",
    description: "Trained professional drivers with verified credentials",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description: "100% punctual pickup and drop",
  },
  {
    icon: Armchair,
    title: "Comfortable Travel",
    description: "Premium seating with AC/Non-AC options",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Pricing",
    description: "Competitive rates for all budget ranges",
  },
];

const testimonials = [
  {
    name: "Mrs. Sana Malik",
    role: "Parent — Beaconhouse Student",
    text: "MTS has been taking my daughter to school for 2 years. The driver is always on time and very professional. I feel completely safe knowing she is in good hands.",
    rating: 5,
  },
  {
    name: "Mr. Tariq Hussain",
    role: "Parent — FAST University Student",
    text: "Excellent service! My son uses MTS daily for his university commute. The AC vehicle, GPS tracking, and reliable timing have made our lives so much easier.",
    rating: 5,
  },
  {
    name: "Mrs. Ayesha Baig",
    role: "Parent — Army Public School Student",
    text: "I have tried other services before but MTS is simply the best in Rawalpindi. Very affordable and the staff is always helpful on the phone.",
    rating: 5,
  },
  {
    name: "Mr. Imran Qureshi",
    role: "Parent — COMSATS University Student",
    text: "Punctual, safe, and great value for money. Abdul Rehman Sahab and his team are truly dedicated. Highly recommended for university transport.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-red-900 text-white min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              MTS - Mani Transport Service
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-red-50">
              Safe, Reliable & Comfortable Door-to-Door Pick & Drop Service
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
                  Book Now
                </Button>
              </Link>
              <a href="https://wa.me/923105605600?text=Hello%20MTS%20Transport%20Service" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] text-white hover:bg-[#20bd5a] border-none text-lg px-8">
                  WhatsApp Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MTS?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We pride ourselves on delivering top-notch transport solutions with a focus on safety, comfort, and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Growing Fleet</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="text-5xl font-bold text-primary mb-2">80+</div>
              <div className="text-gray-600 font-medium">Vans</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-primary mb-2">5+</div>
              <div className="text-gray-600 font-medium">Coaster Buses</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-primary mb-2">30+</div>
              <div className="text-gray-600 font-medium">Hiace Box Vehicles</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600 font-medium">GPS Enabled</div>
            </div>
          </div>
          
          <div className="mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-red-50">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Parents Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hundreds of families in Rawalpindi and Islamabad trust MTS every day for their children's safe transport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative"
              >
                <Quote className="w-8 h-8 text-red-100 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contact">
              <Button size="lg" className="px-8">
                Join Hundreds of Happy Families
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">MTS</h3>
              <p className="text-gray-400 max-w-sm">
                Safe, Reliable & Comfortable Door-to-Door Pick & Drop Service in Rawalpindi & Islamabad.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link href="/routes" className="hover:text-primary transition-colors">Routes</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Plaza #30, Office #01, Ground Floor</li>
                <li>Linear Commercial Phase 8, Bahria Town</li>
                <li>Rawalpindi</li>
                <li className="pt-2">Phone: 0310-5605600 / 0328-5605600</li>
                <li>Email: malikmanii34567@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2025 MTS - Mani Transport Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
