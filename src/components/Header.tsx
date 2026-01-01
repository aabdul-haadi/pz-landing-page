import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { ContactFormModal } from "./ContactFormModal";
import { Button } from "./ui/button";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#contact", label: "Contact" },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur-md border-b border-border/50" 
        : "bg-transparent"
    }`}>
      <div className="container px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo Text - Now visible on both mobile and desktop */}
          <a href="/" className="flex items-center gap-2">
            <span className="font-black text-lg sm:text-xl md:text-2xl text-foreground tracking-tight">
              ProjectZone
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ContactFormModal buttonLocation="header">
              <Button variant="outline" size="sm">
                Get Consultation
              </Button>
            </ContactFormModal>
            <WhatsAppButton text="Contact Us" size="sm" buttonLocation="header" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary py-2 text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <ContactFormModal buttonLocation="header_mobile">
                <Button variant="outline" size="sm" className="w-full">
                  Get Consultation
                </Button>
              </ContactFormModal>
              <WhatsAppButton text="Chat Now" size="sm" buttonLocation="header_mobile" className="w-full" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};