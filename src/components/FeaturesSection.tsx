
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, DollarSign, Calendar, Star, Zap, BarChart } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-propcloud-500" />,
    title: "AI Guest Communication",
    description:
      "Trainable AI chatbot responds to guest inquiries across all connected platforms, providing instant support 24/7.",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-propcloud-500" />,
    title: "Dynamic Pricing",
    description:
      "AI-driven pricing suggestions based on demand, competitor analysis, and occupancy trends to maximize revenue.",
  },
  {
    icon: <Star className="h-10 w-10 text-propcloud-500" />,
    title: "Review Management",
    description:
      "AI analyzes guest reviews, suggests responses, and helps maintain your stellar reputation across platforms.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-propcloud-500" />,
    title: "Automated Scheduling",
    description:
      "Cleaning and maintenance tasks automatically assigned based on check-ins/outs with smart staff coordination.",
  },
  {
    icon: <Zap className="h-10 w-10 text-propcloud-500" />,
    title: "Direct Booking Automation",
    description:
      "AI chatbot manages inquiries, confirms bookings, and processes payments via social media and messaging apps.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-propcloud-500" />,
    title: "Performance Analytics",
    description:
      "Real-time insights on revenue, occupancy, and guest satisfaction with actionable intelligence.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Complete AI-Powered{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-propcloud-600 to-propcloud-400">
              Property Management
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            PropCloud.io is the all-in-one solution that automates every aspect of property management,
            from guest communication to revenue optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border/40 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
