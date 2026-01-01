import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { StressReliefSection } from "@/components/sections/StressReliefSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/sections/Footer";
import { StickyWhatsAppButton } from "@/components/WhatsAppButton";
import { Helmet } from "react-helmet-async";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const Index = () => {
  useVisitorTracking();

  return (
    <>
      <Helmet>
        <title>Project Zone - Academic Project Help for University, Masters & PhD Students</title>
        <meta 
          name="description" 
          content="Get expert help with final year projects, assignments, research papers & more. On-time delivery, original work, and student-friendly support for CS, IT, AI, and Data Science students." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://projectzone.pk" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ProblemsSection />
          <SolutionSection />
          <ServicesSection />
          <TrustSection />
          <HowItWorksSection />
          <StressReliefSection />
          <ContactSection />
          <FinalCTASection />
        </main>
        <Footer />
        <StickyWhatsAppButton />
      </div>
    </>
  );
};

export default Index;
