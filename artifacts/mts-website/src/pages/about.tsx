import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, MapPin, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About MTS - Mani Transport Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-3xl mx-auto text-red-50"
          >
            Your trusted partner for safe, reliable, and comfortable transport services in Rawalpindi and Islamabad.
          </motion.p>
        </div>
      </section>

      {/* Intro & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At MTS, our mission is to provide unparalleled transport solutions that prioritize the safety, comfort, and punctuality of every passenger. We understand the trust families place in us when they choose our services for their children's daily commute.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We strive to maintain the highest standards of vehicle maintenance, driver professionalism, and customer service to ensure a seamless travel experience every single day.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We envision becoming the most recognized and reliable transport network in the twin cities, setting industry benchmarks for safety and operational excellence.
              </p>
              <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-primary mt-8">
                <p className="text-primary font-semibold italic text-lg">
                  "Our commitment is not just to transport people, but to deliver peace of mind to every family we serve."
                </p>
                <p className="text-sm text-gray-600 mt-2 font-medium">— Abdul Rehman Mani, Owner</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "10+ Years Experience", icon: Clock, desc: "A decade of proven reliability." },
              { title: "1000+ Families", icon: Users, desc: "Satisfied clients who trust our service." },
              { title: "24/7 Support", icon: ShieldCheck, desc: "Always available when you need us." },
              { title: "GPS Tracked", icon: MapPin, desc: "Real-time tracking for all vehicles." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Experience the MTS Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of satisfied families who rely on our premium transport services daily.
          </p>
          <Link href="/contact">
            <Button size="lg" className="text-lg px-10">
              Ready to book? Contact us today!
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}