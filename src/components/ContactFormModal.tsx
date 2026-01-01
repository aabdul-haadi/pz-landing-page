import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  education_level: string;
  field_of_study: string;
  deadline: string;
  message: string;
}

const projectTypes = [
  "Final Year Project",
  "Semester Project",
  "Assignment",
  "Research Paper",
  "IEEE/Conference Paper",
  "Code + Documentation",
  "Report Writing",
  "Viva Preparation",
];

const educationLevels = ["University/Bachelor's", "Master's", "PhD"];

const fieldsOfStudy = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Artificial Intelligence",
  "Data Science",
  "Electronics",
  "Other",
];

const deadlineOptions = [
  "Less than 1 week",
  "1-2 weeks",
  "2-4 weeks",
  "1-2 months",
  "More than 2 months",
];

export const ContactFormModal = ({ 
  children, 
  buttonLocation 
}: { 
  children: React.ReactNode; 
  buttonLocation: string;
}) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    project_type: "",
    education_level: "",
    field_of_study: "",
    deadline: "",
    message: "",
  });

  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.project_type && formData.education_level;
      case 2:
        return formData.field_of_study && formData.deadline;
      case 3:
        return formData.name && formData.email;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_queries").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        project_type: formData.project_type,
        education_level: formData.education_level,
        field_of_study: formData.field_of_study || null,
        deadline: formData.deadline || null,
        message: formData.message || null,
      });

      if (error) throw error;

      toast({
        title: "Query Submitted!",
        description: "We'll get back to you soon. You can also chat with us on WhatsApp for faster response.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        project_type: "",
        education_level: "",
        field_of_study: "",
        deadline: "",
        message: "",
      });
      setStep(1);
      setOpen(false);

      // Open WhatsApp with pre-filled message
      const message = `Hi! I just submitted a query.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nProject Type: ${formData.project_type}\nEducation Level: ${formData.education_level}\nField of Study: ${formData.field_of_study || 'Not specified'}\nDeadline: ${formData.deadline || 'Not specified'}\nAdditional Details: ${formData.message || 'None'}`;
      const whatsappUrl = `https://wa.me/923138372573?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again or contact us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-base font-medium text-foreground block">
                What type of project do you need help with?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateFormData("project_type", type)}
                    className={`p-3 sm:p-3.5 text-sm sm:text-base rounded-lg border transition-all text-left w-full min-h-[44px] sm:min-h-[48px] ${
                      formData.project_type === type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    type="button"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-base font-medium text-foreground block">
                Your education level?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {educationLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => updateFormData("education_level", level)}
                    className={`p-3 sm:p-3.5 text-sm sm:text-base rounded-lg border transition-all w-full min-h-[44px] sm:min-h-[48px] ${
                      formData.education_level === level
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    type="button"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-base font-medium text-foreground block">
                Your field of study?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {fieldsOfStudy.map((field) => (
                  <button
                    key={field}
                    onClick={() => updateFormData("field_of_study", field)}
                    className={`p-3 sm:p-3.5 text-sm sm:text-base rounded-lg border transition-all text-left w-full min-h-[44px] sm:min-h-[48px] ${
                      formData.field_of_study === field
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    type="button"
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-base font-medium text-foreground block">
                When is your deadline?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {deadlineOptions.map((deadline) => (
                  <button
                    key={deadline}
                    onClick={() => updateFormData("deadline", deadline)}
                    className={`p-3 sm:p-3.5 text-sm sm:text-base rounded-lg border transition-all text-left w-full min-h-[44px] sm:min-h-[48px] ${
                      formData.deadline === deadline
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    type="button"
                  >
                    {deadline}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="name" className="text-foreground text-sm sm:text-base">
                Your Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="Enter your name"
                className="h-11 sm:h-12 text-sm sm:text-base"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email" className="text-foreground text-sm sm:text-base">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="your.email@example.com"
                className="h-11 sm:h-12 text-sm sm:text-base"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="phone" className="text-foreground text-sm sm:text-base">
                Phone/WhatsApp Number (Optional)
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="03XX-XXXXXXX"
                className="h-11 sm:h-12 text-sm sm:text-base"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="message" className="text-foreground text-sm sm:text-base">
                Additional Details (Optional)
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateFormData("message", e.target.value)}
                placeholder="Tell us more about your project, specific requirements, or any questions..."
                className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
              />
            </div>
            <div className="bg-muted/50 p-3 sm:p-4 rounded-lg space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <p className="font-medium text-foreground">Summary:</p>
              <p><span className="text-muted-foreground">Project:</span> {formData.project_type}</p>
              <p><span className="text-muted-foreground">Level:</span> {formData.education_level}</p>
              <p><span className="text-muted-foreground">Field:</span> {formData.field_of_study}</p>
              <p><span className="text-muted-foreground">Deadline:</span> {formData.deadline}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-lg mx-auto p-4 sm:p-6">
        <DialogHeader className="space-y-3 sm:space-y-4">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground text-center sm:text-left">
            {step === 4 ? "Almost Done!" : "Tell Us About Your Project"}
          </DialogTitle>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 sm:h-2 flex-1 rounded-full transition-colors ${
                    i < step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              Step {step} of {totalSteps}
            </p>
          </div>
        </DialogHeader>

        <div className="py-3 sm:py-4 overflow-y-auto max-h-[60vh] sm:max-h-[50vh]">
          {renderStep()}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
          {step > 1 ? (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)}
              className="h-11 sm:h-10 w-full sm:w-auto order-2 sm:order-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div className="order-2 sm:order-1 sm:flex-1" />
          )}

          {step < totalSteps ? (
            <Button 
              onClick={() => setStep(step + 1)} 
              disabled={!canProceed()}
              className="h-11 sm:h-10 w-full sm:w-auto order-1 sm:order-2"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              variant="whatsapp" 
              onClick={handleSubmit} 
              disabled={isSubmitting || !canProceed()}
              className="h-11 sm:h-10 w-full sm:w-auto order-1 sm:order-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4 mr-2" />
              )}
              <span className="text-sm sm:text-base">
                Submit & Chat on WhatsApp
              </span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};