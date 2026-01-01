import { WhatsAppButton } from "../WhatsAppButton";
import { ContactFormModal } from "../ContactFormModal";
import { Button } from "../ui/button";
import { FileEdit, GraduationCap } from "lucide-react";
import logo from "@/assets/logo.png";
import icon1 from "@/assets/icons/icon-1.png";
import icon2 from "@/assets/icons/icon-2.png";
import icon3 from "@/assets/icons/icon-3.png";


export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-gentle" />
              <img 
                src={logo} 
                alt="Project Zone" 
                className="relative w-24 h-24 md:w-32 md:h-32 object-contain animate-float" 
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 text-xs md:text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
            <GraduationCap className="w-3 h-3 md:w-4 md:h-4" />
            <span>University • Master's • PhD Level Consultation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight animate-fade-in-up text-balance">
            Stuck on Your Project?{" "}
            <span className="text-primary">We'll Guide You Through.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in-up text-balance" style={{ animationDelay: "0.1s" }}>
            Expert academic consultation to help you understand, plan, and execute your projects. 
            Learn the concepts. Build confidence. Ace your viva.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <ContactFormModal buttonLocation="hero_section">
              <Button size="lg" variant="outline" className="gap-2 text-sm md:text-base">
                <FileEdit className="w-4 h-4 md:w-5 md:h-5" />
                Get Free Consultation
              </Button>
            </ContactFormModal>
            <WhatsAppButton text="Chat Now" size="lg" buttonLocation="hero_section" className="text-sm md:text-base" />
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-10 mt-6 md:mt-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <img src={icon1} alt="Quick Response" className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">Quick Response</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <img src={icon2} alt="Personalized Guidance" className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">Personalized Guidance</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <img src={icon3} alt="Expert Mentors" className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">Expert Mentors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
