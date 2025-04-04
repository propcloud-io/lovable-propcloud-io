
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  DollarSign, 
  Calendar, 
  Star, 
  Zap, 
  BarChart, 
  Settings, 
  Clock, 
  Shield 
} from "lucide-react";

const features = [
  {
    icon: <DollarSign className="h-10 w-10 text-propcloud-500" />,
    title: "Revenue Optimization",
    description:
      "AI-driven dynamic pricing, booking management, and channel performance analytics to maximize your rental income.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-propcloud-500" />,
    title: "AI Communication Hub",
    description:
      "Centralized guest messaging with AI chatbot that handles inquiries, confirmations, and guest support across all platforms.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-propcloud-500" />,
    title: "Advanced Analytics",
    description:
      "Comprehensive dashboards for financial performance, occupancy trends, booking metrics, and operational efficiency.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-propcloud-500" />,
    title: "Booking Management",
    description:
      "Streamlined handling of reservations across all channels with calendar sync, instant notifications, and guest profiles.",
  },
  {
    icon: <Zap className="h-10 w-10 text-propcloud-500" />,
    title: "Sales Automation",
    description:
      "Omni-channel marketing automation, price optimization, and direct booking tools to fill your calendar efficiently.",
  },
  {
    icon: <Clock className="h-10 w-10 text-propcloud-500" />,
    title: "Operations Management",
    description:
      "Automated task scheduling for cleaning, maintenance, and check-ins with staff coordination and quality control.",
  },
  {
    icon: <Star className="h-10 w-10 text-propcloud-500" />,
    title: "Review Management",
    description:
      "Automated collection and response to guest reviews with sentiment analysis and reputation monitoring tools.",
  },
  {
    icon: <Shield className="h-10 w-10 text-propcloud-500" />,
    title: "Security & Compliance",
    description:
      "Secure guest verification, payment processing, and compliance with local regulations and tax requirements.",
  },
  {
    icon: <Settings className="h-10 w-10 text-propcloud-500" />,
    title: "Customizable Platform",
    description:
      "Flexible settings and integrations to tailor the platform to your specific property management needs.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Complete{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-propcloud-600 to-propcloud-400">
              End-to-End Platform
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            PropCloud.io unifies all aspects of property management into one seamless platform, 
            eliminating the need for multiple tools and reducing operational complexity.
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
