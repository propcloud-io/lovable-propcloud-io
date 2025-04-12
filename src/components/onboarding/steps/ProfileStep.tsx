
import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ProfileStep: React.FC = () => {
  const { nextStep, prevStep } = useOnboarding();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data to your backend
    localStorage.setItem('user_profile', JSON.stringify(formData));
    
    toast({
      title: "Profile saved",
      description: "Your profile information has been saved"
    });
    
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
        <p className="text-muted-foreground">
          Let's set up your profile to personalize your PropCloud experience
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input 
            id="name" 
            name="name"
            placeholder="Enter your full name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name (Optional)</Label>
          <Input 
            id="companyName" 
            name="companyName"
            placeholder="Enter your company name" 
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio (Optional)</Label>
          <Textarea 
            id="bio" 
            name="bio"
            placeholder="Tell us a bit about yourself or your business" 
            value={formData.bio}
            onChange={handleChange}
            rows={3}
          />
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row justify-between space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4 mt-8">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileStep;
