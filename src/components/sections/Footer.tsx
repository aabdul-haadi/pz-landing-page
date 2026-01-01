import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="py-6 md:py-8 bg-foreground text-background/80">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Project Zone" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
            <span className="font-semibold text-background text-sm md:text-base">Project Zone</span>
          </div>
          <p className="text-xs md:text-sm text-center md:text-right">
            Academic consultation and project guidance for students.
          </p>
        </div>
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-background/10 text-center text-xs md:text-sm text-background/60">
          © {new Date().getFullYear()} Project Zone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
