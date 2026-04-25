import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Backpack, GraduationCap, BookOpen, Car, Users, Building2 } from "lucide-react";

const services = [
  {
    icon: Backpack,
    title: "School Pick & Drop",
    description: "Safe and timely pickup and drop for school students from doorstep to school and back.",
  },
  {
    icon: GraduationCap,
    title: "College Transport",
    description: "Comfortable daily commute for college-going students with flexible timings.",
  },
  {
    icon: BookOpen,
    title: "University Transport",
    description: "Premium transport service for university students with AC vehicles and professional drivers.",
  },
  {
    icon: Car,
    title: "Rent a Car Service",
    description: "Rent our well-maintained vehicles for tours, events, or personal use.",
  },
  {
    icon: Users,
    title: "Private Family Booking",
    description: "Dedicated transport solution for family trips and outings.",
  },
  {
    icon: Building2,
    title: "Corporate Transport",
    description: "Professional transport services for corporate employees and official events.",
  }
];

export default function Services() {
  return (
    <div className="w-full">
      <section className="bg-primary py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
        <p className="mt-4 text-xl text-red-50 max-w-2xl mx-auto">
          Comprehensive transport solutions tailored for students, families, and professionals.
        </p>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary transition-all duration-300 group hover:scale-105"
              >
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-8 h-20">{service.description}</p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white border-primary text-primary transition-colors">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}