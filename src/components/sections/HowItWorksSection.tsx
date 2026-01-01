import { MessageCircle, ClipboardList, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Reach Out",
    description: "Share your project requirements and challenges with us",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Get Your Plan",
    description: "We'll create a personalized consultation roadmap for you",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Learn & Build",
    description: "Work with our mentors and build your project with confidence",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-8 md:py-16 bg-secondary/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Getting Started is Easy
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            Three simple steps to stress-free project guidance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 md:top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/30 to-primary/10" />
                )}
                
                <div className="relative inline-flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-card border border-border/50 shadow-soft flex items-center justify-center mb-4 md:mb-6 relative">
                    <step.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-base md:text-lg mb-1 md:mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground max-w-[200px]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
