
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp, Users, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: <Clock className="h-10 w-10 text-propcloud-500" />,
    title: "Save 20+ Hours Weekly",
    description:
      "Automate repetitive tasks like guest communication, booking management, and operational scheduling.",
    stat: "20+",
    statLabel: "Hours Saved Weekly",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-propcloud-500" />,
    title: "Increase Revenue by 15-30%",
    description:
      "Dynamic pricing and direct booking strategies optimize your revenue across all properties.",
    stat: "15-30%",
    statLabel: "Revenue Increase",
  },
  {
    icon: <Users className="h-10 w-10 text-propcloud-500" />,
    title: "Improve Guest Satisfaction",
    description:
      "Instant responses, personalized service, and proactive communication enhance guest experience.",
    stat: "98%",
    statLabel: "Positive Reviews",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-propcloud-500" />,
    title: "Reduce Management Costs",
    description:
      "Minimize staff needs, streamline operations, and reduce overhead with intelligent automation.",
    stat: "40%",
    statLabel: "Cost Reduction",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Clear{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-propcloud-600 to-propcloud-400">
              Business Benefits
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            PropCloud.io delivers measurable improvements to your property management business,
            from time savings to revenue growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border border-border/40 shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-4">{benefit.icon}</div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 space-y-4">
                <p className="text-muted-foreground">{benefit.description}</p>
                <div className="flex items-center mt-4">
                  <span className="text-3xl font-bold text-propcloud-600 mr-2">
                    {benefit.stat}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {benefit.statLabel}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
