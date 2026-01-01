import { 
  Shield, 
  Lock, 
  FileCheck, 
  MessageSquare, 
  Clock, 
  Heart 
} from "lucide-react";

const trustPoints = [
  {
    icon: Heart,
    title: "Student-Focused",
    description: "We understand academic stress and prioritize your learning",
  },
  {
    icon: Shield,
    title: "Ethical Approach",
    description: "Teaching and guidance — you do the work and learn",
  },
  {
    icon: FileCheck,
    title: "Personalized Sessions",
    description: "Every consultation tailored to your project needs",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    description: "Your discussions and project details stay private",
  },
  {
    icon: MessageSquare,
    title: "Clear Explanations",
    description: "We break down complex concepts into simple terms",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Sessions at times that work for you",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-6 md:py-12 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
            Why Students Choose Us
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            We're here to help you learn and succeed on your own terms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-br from-secondary/50 to-transparent"
            >
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <point.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">{point.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
