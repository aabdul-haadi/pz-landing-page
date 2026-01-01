import icon1 from "@/assets/icons/icon-1.png";
import icon2 from "@/assets/icons/icon-2.png";
import icon3 from "@/assets/icons/icon-3.png";

const problems = [
  {
    icon: icon1,
    text: "\"I have no idea how to even start this project...\"",
  },
  {
    icon: icon2,
    text: "\"Deadline is close and I'm completely lost.\"",
  },
  {
    icon: icon3,
    text: "\"My supervisor keeps changing requirements.\"",
  },
  {
    icon: icon1,
    text: "\"I don't understand the technical concepts.\"",
  },
  {
    icon: icon2,
    text: "\"My code has bugs I can't figure out.\"",
  },
  {
    icon: icon3,
    text: "\"Documentation and report format confuse me.\"",
  },
];

export const ProblemsSection = () => {
  return (
    <section className="py-6 md:py-12 bg-secondary/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
            Sound Familiar?
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            You're not alone. Every student faces these challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-xl border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <img src={problem.icon} alt="Problem icon" className="w-4 h-4 md:w-5 md:h-5 rounded-full" />
              </div>
              <p className="text-foreground/80 italic text-xs md:text-base leading-relaxed">
                {problem.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
