import React, { useState } from 'react';
import { WaitlistService } from '@/lib/firebase/services/waitlist.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function WaitlistForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    propertyCount: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.propertyCount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await WaitlistService.addToWaitlist({
        name: formData.name,
        email: formData.email,
        propertyCount: parseInt(formData.propertyCount),
        source: 'website'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        propertyCount: '',
      });

      // Show success message
      toast({
        title: "Successfully Joined Waitlist!",
        description: "We'll be in touch soon.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join the Waitlist</CardTitle>
        <CardDescription>
          Be among the first to experience AI-powered property management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="propertyCount">Number of Properties</Label>
            <Input
              id="propertyCount"
              name="propertyCount"
              type="number"
              min="1"
              placeholder="How many properties do you manage?"
              value={formData.propertyCount}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Join Waitlist"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
