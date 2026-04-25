import { useState } from "react";
import { MessageCircle, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      toast({
        title: "Message sent!",
        description: "Thank you. We will get back to you shortly.",
      });
    }, 1500);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923105605600?text=Hello%20MTS%20Transport%20Service"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-transform hover:scale-110 flex items-center justify-center group"
        title="Chat with us"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Message Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-6 left-6 z-50 bg-primary text-white px-5 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 flex items-center gap-2 font-medium">
            <MessageSquare className="w-5 h-5" />
            <span className="hidden sm:inline">Send Message</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send us a message</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" required placeholder="03XX-XXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                placeholder="How can we help you?"
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}