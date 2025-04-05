import React from 'react';
import { Card } from '@/components/ui/card';
import { Building2, Users, Sparkles } from 'lucide-react';

export function WhoWeAre() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            PropCloud.io is revolutionizing property management by combining cutting-edge AI technology with human expertise. 
            We're on a mission to make property management more efficient, profitable, and enjoyable for everyone involved.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-propcloud-50 rounded-full mb-4">
                <Building2 className="h-6 w-6 text-propcloud-600" />
              </div>
              <h3 className="font-semibold mb-2">Property Management Experts</h3>
              <p className="text-sm text-muted-foreground">
                Our team brings years of experience in property management, understanding the unique challenges and opportunities in the industry.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-propcloud-50 rounded-full mb-4">
                <Users className="h-6 w-6 text-propcloud-600" />
              </div>
              <h3 className="font-semibold mb-2">Guest-Centric Approach</h3>
              <p className="text-sm text-muted-foreground">
                We believe in creating exceptional guest experiences while maximizing property performance through smart automation.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-propcloud-50 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-propcloud-600" />
              </div>
              <h3 className="font-semibold mb-2">Innovation Driven</h3>
              <p className="text-sm text-muted-foreground">
                Leveraging the latest AI technology to streamline operations, reduce costs, and increase revenue for property owners.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
} 