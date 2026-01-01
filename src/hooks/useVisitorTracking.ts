import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await supabase.from("visitors").insert({
          page_path: window.location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
        });
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };

    trackVisitor();
  }, []);
};

export const trackWhatsAppClick = async (buttonLocation: string) => {
  try {
    await supabase.from("whatsapp_clicks").insert({
      button_location: buttonLocation,
      page_path: window.location.pathname,
    });
  } catch (error) {
    console.error("Error tracking WhatsApp click:", error);
  }
};
