import { motion } from "framer-motion";
import { PhoneCall, MapPin, Mail, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^(\+92|0|92)[0-9]{10}$/, "Please enter a valid Pakistan phone number (e.g., 03105605600)"),
  pickupLocation: z.string().optional(),
  message: z.string().optional(),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      pickupLocation: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you! We will contact you shortly.",
      });
      form.reset();
    }, 1500);
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <section className="bg-primary py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
        <p className="mt-4 text-xl text-red-50 max-w-2xl mx-auto">
          We're here to help. Reach out to us for bookings or inquiries.
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ali Khan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="03105605600" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Bahria Town Phase 8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific requirements or questions?" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-primary shrink-0">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
                      <div className="flex flex-col gap-2">
                        <a href="tel:+923105605600">
                          <Button variant="outline" className="w-full justify-start border-gray-300 hover:bg-gray-50 text-gray-700">
                            0310-5605600
                          </Button>
                        </a>
                        <a href="tel:+923285605600">
                          <Button variant="outline" className="w-full justify-start border-gray-300 hover:bg-gray-50 text-gray-700">
                            0328-5605600
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] shrink-0">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp</h3>
                      <a href="https://wa.me/923105605600?text=Hello%20MTS%20Transport%20Service" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full justify-start bg-[#25D366] hover:bg-[#20bd5a] text-white">
                          Chat on WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Office Address</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Plaza #30, Office #01, Ground Floor,<br />
                        Linear Commercial Phase 8,<br />
                        Bahria Town, Rawalpindi
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:malikmanii34567@gmail.com" className="text-primary hover:underline">
                        malikmanii34567@gmail.com
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}