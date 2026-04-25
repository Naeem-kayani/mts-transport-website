import { useState } from "react";
import { MessageCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";

export function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      storage.addMessage({ name: name.trim(), phone: phone.trim(), message: message.trim() });
      setIsSubmitting(false);
      setIsOpen(false);
      setName("");
      setPhone("");
      setMessage("");
      toast({
        title: "Message sent!",
        description: "Thank you. We will get back to you shortly.",
      });
    }, 1000);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923105605600?text=Hello%20MTS%20Transport%20Service"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-transform hover:scale-110 flex items-center justify-center"
        title="Chat with us"
        data-testid="button-whatsapp-float"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Message Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-primary text-white px-5 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 flex items-center gap-2 font-medium"
        data-testid="button-send-message-float"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline">Send Message</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send us a Message</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="float-name">Name *</Label>
              <Input
                id="float-name"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="input-float-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="float-phone">Phone Number *</Label>
              <Input
                id="float-phone"
                required
                placeholder="03XX-XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                data-testid="input-float-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="float-message">Message *</Label>
              <Textarea
                id="float-message"
                required
                placeholder="How can we help you?"
                className="min-h-[100px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                data-testid="input-float-message"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-float-submit">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
