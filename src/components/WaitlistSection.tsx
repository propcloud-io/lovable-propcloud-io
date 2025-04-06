import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, ArrowRight } from "lucide-react";
import { WaitlistService } from "@/lib/supabase/services";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [properties, setProperties] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !name) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email address.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Number validation
    if (properties && isNaN(parseInt(properties))) {
      toast({
        title: "Invalid number",
        description: "Please provide a valid number of properties.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting waitlist form with:', { email, name, properties });

    try {
      console.log('Calling WaitlistService.addToWaitlist');
      await WaitlistService.addToWaitlist({
        email,
        fullName: name,
        numberOfProperties: properties ? parseInt(properties) : undefined
      });
      console.log('Successfully added to waitlist');

      toast({
        title: "Thank you for joining!",
        description: "We'll keep you updated on our launch.",
      });

      setIsSubmitted(true);
      setEmail('');
      setName('');
      setProperties('');
    } catch (error) {
      console.error('Waitlist submission error:', error);
      // Log more details about the error
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);

        // Handle specific error messages
        if (error.message.includes('already on our waitlist')) {
          toast({
            title: "Already registered",
            description: error.message,
            variant: "destructive",
          });
        } else if (error.message.includes('Permission denied')) {
          toast({
            title: "Permission error",
            description: "We're experiencing some technical difficulties. Please try again later.",
            variant: "destructive",
          });
        } else if (error.message.includes('table does not exist')) {
          toast({
            title: "System error",
            description: "Our waitlist system is currently unavailable. Please try again later.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: error.message || "An error occurred while joining the waitlist.",
            variant: "destructive",
          });
        }
      } else {
        console.error('Unknown error type:', typeof error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-propcloud-600 p-10 text-white">
              <h2 className="text-2xl font-bold mb-6">Join the PropCloud.io Waitlist</h2>
              <p className="mb-8">
                Be among the first to experience the future of AI-powered property management.
                Early access members receive:
              </p>
              <ul className="space-y-3">
                <ListItem>Priority access when we launch</ListItem>
                <ListItem>30% discount for the first 6 months</ListItem>
                <ListItem>Free onboarding and setup assistance</ListItem>
                <ListItem>Influence product development with your feedback</ListItem>
              </ul>
              <div className="mt-12 text-white/80">
                <p>Limited spots available. Don't miss out!</p>
              </div>
            </div>

            <div className="p-10">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="properties">Number of Properties</Label>
                    <Input
                      id="properties"
                      value={properties}
                      onChange={(e) => setProperties(e.target.value)}
                      placeholder="e.g. 5"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Joining..."
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By signing up, you agree to our{" "}
                    <a href="#" className="underline hover:text-propcloud-600">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-propcloud-600">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for joining the PropCloud.io waitlist. We'll be in touch soon with
                    early access information.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName("");
                      setEmail("");
                      setProperties("");
                    }}
                  >
                    Submit Another Response
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="flex items-start">
      <CheckCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
};

export default WaitlistSection;
