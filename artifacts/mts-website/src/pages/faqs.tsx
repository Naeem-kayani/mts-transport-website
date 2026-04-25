import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I book a transport service?",
    a: "You can book by filling out the contact form on our website or WhatsApp us directly. Our team will confirm your booking within 24 hours."
  },
  {
    q: "What are your monthly subscription charges?",
    a: "Monthly charges vary based on your route and vehicle type. Please contact us for customized pricing."
  },
  {
    q: "What safety measures do you implement?",
    a: "All our vehicles are GPS-tracked, regularly maintained, and driven by verified professional drivers. We prioritize safety above all."
  },
  {
    q: "Which routes are currently available?",
    a: "We operate routes covering Bahria Town, DHA, Gulrez, PWD, Saddar, and other areas in Rawalpindi. Visit our Routes page for details."
  },
  {
    q: "Do you offer AC vehicles?",
    a: "Yes, we have both AC and Non-AC vehicles. You can choose based on your preference and budget."
  },
  {
    q: "Can I cancel or modify my booking?",
    a: "Yes, cancellations and modifications can be made up to 24 hours before the scheduled pickup."
  },
  {
    q: "Are drivers trained and verified?",
    a: "Absolutely. All our drivers are professionally trained, verified, and have clean driving records."
  },
  {
    q: "Do you provide customized routes?",
    a: "Yes, we can create customized routes for groups and corporate bookings. Contact us for details."
  }
];

export default function FAQs() {
  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      <section className="bg-primary py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 text-xl text-red-50 max-w-2xl mx-auto">
          Find answers to common questions about our transport services.
        </p>
      </section>

      <section className="pt-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border border-gray-100 rounded-lg overflow-hidden bg-white data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 hover:no-underline font-bold text-left text-gray-900 border-l-4 border-transparent data-[state=open]:border-primary transition-all">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-600 text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
}