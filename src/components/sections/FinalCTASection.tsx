import { WhatsAppButton } from "../WhatsAppButton";
import { MessageCircle, Zap } from "lucide-react";

export const FinalCTASection = () => {
  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Ready to Get Expert Guidance?
          </h2>
          <p className="text-primary-foreground/90 text-sm md:text-xl mb-8 md:mb-10 max-w-xl mx-auto">
            Don't struggle alone. Let our mentors guide you through your 
            project with confidence.
          </p>

          <WhatsAppButton 
            text="Chat Now – 0314-8163676" 
            size="xl"
            buttonLocation="final_cta_section"
            className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl text-sm md:text-base"
          />

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-xs md:text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 md:w-4 md:h-4" />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
              <span>Free Initial Consultation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
