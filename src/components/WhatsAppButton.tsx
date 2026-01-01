import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { trackWhatsAppClick } from "@/hooks/useVisitorTracking";

interface WhatsAppButtonProps {
  text?: string;
  size?: "default" | "sm" | "lg" | "xl";
  variant?: "whatsapp" | "whatsappOutline";
  className?: string;
  showIcon?: boolean;
  buttonLocation?: string;
}

const WHATSAPP_NUMBER = "923148163676";
const DEFAULT_MESSAGE = "Hi! I need consultation for my academic project.";

export const WhatsAppButton = ({
  text = "Chat on WhatsApp Now",
  size = "lg",
  variant = "whatsapp",
  className = "",
  showIcon = true,
  buttonLocation = "unknown",
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    trackWhatsAppClick(buttonLocation);
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      {showIcon && <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />}
      {text}
    </Button>
  );
};

export const StickyWhatsAppButton = () => {
  const handleClick = () => {
    trackWhatsAppClick("sticky_floating");
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-whatsapp hover:bg-whatsapp-hover text-white p-3 md:p-4 rounded-full shadow-whatsapp hover:shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 animate-pulse-gentle"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
};
