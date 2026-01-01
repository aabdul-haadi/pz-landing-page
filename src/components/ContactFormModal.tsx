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
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium text-foreground mb-3 block">What type of project do you need help with?</Label>
              <div className="grid grid-cols-2 gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateFormData("project_type", type)}
                    className={`p-3 text-sm rounded-lg border transition-all text-left ${
                      formData.project_type === type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-base font-medium text-foreground mb-3 block">Your education level?</Label>
              <div className="grid grid-cols-3 gap-2">
                {educationLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => updateFormData("education_level", level)}
                    className={`p-3 text-sm rounded-lg border transition-all ${
                      formData.education_level === level
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
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
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium text-foreground mb-3 block">Your field of study?</Label>
              <div className="grid grid-cols-2 gap-2">
                {fieldsOfStudy.map((field) => (
                  <button
                    key={field}
                    onClick={() => updateFormData("field_of_study", field)}
                    className={`p-3 text-sm rounded-lg border transition-all text-left ${
                      formData.field_of_study === field
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-base font-medium text-foreground mb-3 block">When is your deadline?</Label>
              <div className="grid grid-cols-2 gap-2">
                {deadlineOptions.map((deadline) => (
                  <button
                    key={deadline}
                    onClick={() => updateFormData("deadline", deadline)}
                    className={`p-3 text-sm rounded-lg border transition-all text-left ${
                      formData.deadline === deadline
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-foreground">Your Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="your.email@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-foreground">Phone/WhatsApp Number (Optional)</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="03XX-XXXXXXX"
                className="mt-1"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="message" className="text-foreground">Additional Details (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateFormData("message", e.target.value)}
                placeholder="Tell us more about your project, specific requirements, or any questions..."
                className="mt-1 min-h-[120px]"
              />
            </div>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {step === 4 ? "Almost Done!" : "Tell Us About Your Project"}
          </DialogTitle>
          <div className="flex items-center gap-2 pt-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
        </DialogHeader>

        <div className="py-4">
          {renderStep()}
        </div>

        <div className="flex justify-between gap-3">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <Button 
              onClick={() => setStep(step + 1)} 
              disabled={!canProceed()}
              className="ml-auto"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              variant="whatsapp" 
              onClick={handleSubmit} 
              disabled={isSubmitting || !canProceed()}
              className="ml-auto"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4 mr-2" />
              )}
              Submit & Chat on WhatsApp
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
