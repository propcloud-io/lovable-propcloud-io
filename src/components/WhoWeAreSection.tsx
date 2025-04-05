import React from 'react';
import { Users2, Target, Heart, Sparkles } from 'lucide-react';

export function WhoWeAreSection() {
  const values = [
    {
      icon: Users2,
      title: 'Customer-Centric',
      description: 'We put property managers and their guests first, designing solutions that enhance their experience.',
    },
    {
      icon: Target,
      title: 'Innovation-Driven',
      description: 'Leveraging cutting-edge AI technology to revolutionize property management.',
    },
    {
      icon: Heart,
      title: 'Passionate Team',
      description: 'A dedicated team of experts committed to transforming the vacation rental industry.',
    },
    {
      icon: Sparkles,
      title: 'Quality Focus',
      description: 'Delivering reliable, high-performance solutions that exceed expectations.',
    },
  ];

  return (
    <section id="who-we-are" className="py-24 bg-slate-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg text-muted-foreground">
            PropCloud.io is more than just a property management platform. We're a team of innovators
            passionate about transforming the way properties are managed through AI-powered automation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm border border-border hover:border-propcloud-200 transition-colors"
            >
              <div className="w-12 h-12 bg-propcloud-50 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-propcloud-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center bg-white p-6 rounded-lg border border-border">
            <div className="text-left">
              <h4 className="text-xl font-semibold mb-2">Join Our Mission</h4>
              <p className="text-muted-foreground max-w-lg">
                We're always looking for passionate individuals to join our team and help shape the
                future of property management.
              </p>
            </div>
            <a
              href="mailto:careers@propcloud.io"
              className="shrink-0 inline-flex h-10 items-center justify-center rounded-md bg-propcloud-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-propcloud-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-propcloud-700"
            >
              View Opportunities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 