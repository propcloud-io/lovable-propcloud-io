
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Sliders, Save } from "lucide-react";

const AIChatbotCustomization = () => {
  const { toast } = useToast();
  const [botName, setBotName] = useState("PropCloud Assistant");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! I'm your PropCloud virtual assistant. How can I help you with your stay?");
  const [tone, setTone] = useState("friendly");
  const [autoLearn, setAutoLearn] = useState(true);

  const handleSaveSettings = () => {
    toast({
      title: "Chatbot Settings Saved",
      description: "Your AI assistant preferences have been updated successfully.",
    });
  };

  const tones = [
    { value: "friendly", label: "Friendly & Casual" },
    { value: "professional", label: "Professional & Formal" },
    { value: "concise", label: "Concise & Direct" },
    { value: "enthusiastic", label: "Enthusiastic & Energetic" },
  ];

  const languages = [
    { value: "auto", label: "Auto-detect (Recommended)" },
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sliders className="mr-2 h-5 w-5" />
          AI Assistant Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bot-name">Assistant Name</Label>
          <Input 
            id="bot-name" 
            value={botName} 
            onChange={(e) => setBotName(e.target.value)} 
            placeholder="How your AI assistant will identify itself" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="welcome-message">Welcome Message</Label>
          <Textarea 
            id="welcome-message" 
            value={welcomeMessage} 
            onChange={(e) => setWelcomeMessage(e.target.value)} 
            placeholder="Initial message shown to guests" 
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tone">Communication Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Primary Language</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Continuous Learning</h4>
              <p className="text-sm text-muted-foreground">AI learns from your manual responses to improve future replies</p>
            </div>
            <Switch 
              checked={autoLearn} 
              onCheckedChange={setAutoLearn} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Auto-translation</h4>
              <p className="text-sm text-muted-foreground">Automatically translate messages to/from guest's language</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">After-hours Only</h4>
              <p className="text-sm text-muted-foreground">Only use AI assistant outside of business hours</p>
            </div>
            <Switch />
          </div>
        </div>

        <Button className="w-full" onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Assistant Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIChatbotCustomization;
