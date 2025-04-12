
import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const messageTemplates = [
  {
    id: 'welcome',
    title: 'Welcome Message',
    content: 'Hi {{guest_name}}, welcome to {{property_name}}! We're excited to have you stay with us. Check-in is at {{check_in_time}}. Please let me know if you have any questions!'
  },
  {
    id: 'checkin',
    title: 'Check-in Instructions',
    content: 'Hello {{guest_name}}, your stay at {{property_name}} begins tomorrow. To access the property, please use the code {{access_code}} on the keypad at the main entrance. Feel free to reach out if you need assistance!'
  },
  {
    id: 'checkout',
    title: 'Check-out Reminder',
    content: 'Hi {{guest_name}}, we hope you're enjoying your stay at {{property_name}}. Just a friendly reminder that check-out is tomorrow at {{check_out_time}}. Please leave the keys on the kitchen counter when you leave. Thank you!'
  }
];

const CommunicationStep: React.FC = () => {
  const { nextStep, prevStep } = useOnboarding();
  const { toast } = useToast();
  const [templates, setTemplates] = useState(messageTemplates);
  const [aiAssistant, setAiAssistant] = useState(true);

  const handleTemplateChange = (id: string, newContent: string) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === id ? { ...template, content: newContent } : template
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save this data to your backend
    localStorage.setItem('message_templates', JSON.stringify(templates));
    localStorage.setItem('ai_assistant_enabled', String(aiAssistant));
    
    toast({
      title: "Communication preferences saved",
      description: aiAssistant 
        ? "AI assistant is enabled to help with guest communications" 
        : "Message templates saved successfully"
    });
    
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Communication Setup</h2>
        <p className="text-muted-foreground">
          Configure how you want to communicate with your guests
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="space-y-1">
            <h3 className="font-medium">AI Communication Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Let our AI handle routine guest communications automatically
            </p>
          </div>
          <Switch 
            checked={aiAssistant} 
            onCheckedChange={setAiAssistant} 
            id="ai-assistant"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Message Templates</h3>
          <p className="text-sm text-muted-foreground">
            Customize these templates for common communications with your guests
          </p>
          
          {templates.map(template => (
            <div key={template.id} className="space-y-2">
              <Label htmlFor={`template-${template.id}`}>{template.title}</Label>
              <Textarea 
                id={`template-${template.id}`}
                value={template.content}
                onChange={(e) => handleTemplateChange(template.id, e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Available variables: {"{guest_name}"}, {"{property_name}"}, {"{check_in_time}"}, {"{check_out_time}"}, {"{access_code}"}
              </p>
            </div>
          ))}
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

export default CommunicationStep;
