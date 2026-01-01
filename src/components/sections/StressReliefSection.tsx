import { Smile, MessageCircle, BookOpen } from "lucide-react";

const reliefMessages = [
  {
    icon: Smile,
    text: "You're not late. You just need the right guidance.",
  },
  {
    icon: MessageCircle,
    text: "Expert consultation is just one message away.",
  },
  {
    icon: BookOpen,
    text: "Learn while you build — the smart way.",
  },
];

export const StressReliefSection = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-3xl font-bold text-foreground mb-6 md:mb-10">
            Take a Deep Breath
          </h2>
          
          <div className="space-y-4 md:space-y-6">
            {reliefMessages.map((message, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 md:gap-4 text-base md:text-xl text-foreground/80"
              >
                <message.icon className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                <span className="italic text-sm md:text-xl">{message.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
