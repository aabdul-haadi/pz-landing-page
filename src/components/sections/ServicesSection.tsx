import { Sparkles } from "lucide-react";

import folderIcon from "@/assets/icons/folder.png";
import interviewIcon from "@/assets/icons/interview.png";
import searchIcon from "@/assets/icons/search.png";
import mentorIcon from "@/assets/icons/mentor.png";
import guidebookIcon from "@/assets/icons/guidebook.png";
import calendarIcon from "@/assets/icons/calendar.png";
import checklistIcon from "@/assets/icons/checklist.png";
import plagiarismIcon from "@/assets/icons/plagiarism.png";

const services = [
  {
    icon: folderIcon,
    title: "Final Year Project Guidance",
    description: "Concept selection, architecture planning & mentorship",
  },
  {
    icon: searchIcon,
    title: "Semester Project Help",
    description: "Step-by-step guidance for course projects",
  },
  {
    icon: mentorIcon,
    title: "Assignment Tutoring",
    description: "Understand concepts and solve problems yourself",
  },
  {
    icon: guidebookIcon,
    title: "Research Paper Consultation",
    description: "Learn IEEE format, structure & writing techniques",
  },
  {
    icon: calendarIcon,
    title: "Technical Mentorship",
    description: "AI, ML, Data Science, IoT concepts explained",
  },
  {
    icon: checklistIcon,
    title: "Documentation Guidance",
    description: "SRS, SDD, reports — learn the proper format",
  },
  {
    icon: plagiarismIcon,
    title: "Plagiarism Awareness",
    description: "Learn proper citation and academic writing",
  },
  {
    icon: interviewIcon,
    title: "Viva Preparation",
    description: "Mock sessions and Q&A practice",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-6 md:py-12 bg-secondary/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 mb-2 md:mb-3 text-xs md:text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span>Consultation Services</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
            Expert Academic Guidance
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            From concept clarity to viva confidence — we mentor you at every step.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-3 md:p-5 bg-card rounded-xl border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                <img src={service.icon} alt={service.title} className="w-9 h-9 md:w-11 md:h-11 object-contain" />
              </div>
              <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">{service.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-xs md:text-base mt-4 md:mt-6 max-w-2xl mx-auto">
          <strong className="text-foreground">Fields:</strong> Computer Science, Software Engineering, 
          Information Technology, Artificial Intelligence, Data Science, Electronics & more.
        </p>
      </div>
    </section>
  );
};
