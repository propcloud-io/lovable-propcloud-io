
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const WaitlistForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [propertyCount, setPropertyCount] = useState('1-5');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !propertyCount) {
      toast({
        title: 'Missing information',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Format property count as number
      const count = propertyCount === '20+' 
        ? 20 
        : parseInt(propertyCount.split('-')[0]);
      
      const { error } = await supabase
        .from('waitlist')
        .insert({
          full_name: name,
          email,
          number_of_properties: count,
        });
      
      if (error) throw error;
      
      toast({
        title: 'Successfully joined waitlist!',
        description: 'We\'ll be in touch soon with more information.',
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPropertyCount('1-5');
      
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      toast({
        title: 'Error joining waitlist',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="you@example.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="properties">Number of Properties</Label>
        <Select value={propertyCount} onValueChange={setPropertyCount}>
          <SelectTrigger id="properties">
            <SelectValue placeholder="Select number of properties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-5">1-5 properties</SelectItem>
            <SelectItem value="6-10">6-10 properties</SelectItem>
            <SelectItem value="11-20">11-20 properties</SelectItem>
            <SelectItem value="20+">20+ properties</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
      </Button>
    </form>
  );
};

export default WaitlistForm;
