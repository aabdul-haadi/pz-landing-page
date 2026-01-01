import { Button } from "@/components/ui/button";
import { ContactFormModal } from "@/components/ContactFormModal";
import { FileEdit, MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/hooks/useVisitorTracking";

export const ContactSection = () => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick("contact_section");
    window.open("https://wa.me/923148163676?text=Hi! I need consultation for my academic project.", "_blank");
  };

  return (
    <section id="contact" className="py-6 md:py-12 bg-secondary/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
            Have Questions? <span className="text-primary">Let's Talk</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg mb-4 md:mb-6 max-w-xl mx-auto">
            Fill out our quick form and we'll get back to you. Or chat directly on WhatsApp for faster response.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ContactFormModal buttonLocation="contact_section">
              <Button size="lg" variant="outline" className="gap-2 text-sm md:text-base">
                <FileEdit className="w-4 h-4 md:w-5 md:h-5" />
                Fill Quick Form
              </Button>
            </ContactFormModal>

            <Button
              size="lg"
              variant="whatsapp"
              onClick={handleWhatsAppClick}
              className="gap-2 text-sm md:text-base"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
