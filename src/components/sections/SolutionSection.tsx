import { WhatsAppButton } from "../WhatsAppButton";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  "One-on-one guidance from concept to completion",
  "Help you understand the technical requirements",
  "Mentorship on best practices and approaches",
  "Assistance with debugging and problem-solving",
  "Guidance on documentation and presentation",
  "Support for viva preparation and Q&A",
  "Learn while you build — no copy-paste",
];

export const SolutionSection = () => {
  return (
    <section className="py-6 md:py-12 bg-background">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
                How <span className="text-primary">Project Zone</span> Guides You
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg mb-4 md:mb-6">
                We don't do your project for you — we teach you how to do it yourself. 
                Our mentors guide you step-by-step so you truly understand your work.
              </p>

              <ul className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90 text-sm md:text-base">{solution}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppButton text="Discuss – 0314-8163676" buttonLocation="solution_section" className="text-sm md:text-base" />
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 md:p-12">
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-card rounded-xl p-4 md:p-6 shadow-soft border border-border/50">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">What students say:</p>
                    <p className="text-foreground italic text-sm md:text-base">
                      "They didn't just help — they taught me. My viva went smoothly 
                      because I understood every line of my code."
                    </p>
                    <p className="text-xs md:text-sm text-primary mt-3 font-medium">— CS Final Year Student</p>
                  </div>
                  <div className="bg-card rounded-xl p-4 md:p-6 shadow-soft border border-border/50">
                    <p className="text-foreground italic text-sm md:text-base">
                      "The consultation sessions cleared all my doubts. I felt 
                      confident presenting my research paper."
                    </p>
                    <p className="text-xs md:text-sm text-primary mt-3 font-medium">— Master's Research Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
