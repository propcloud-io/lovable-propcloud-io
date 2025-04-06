import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Brain, MessageCircle, User, Bot, Sparkles, Upload, Save, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

type TrainingSession = {
  id: string;
  date: string;
  category: string;
  prompts: number;
  accuracy: number;
};

const AITrainingCenter = () => {
  const [activeTab, setActiveTab] = useState("messaging");
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainedSessions, setTrainedSessions] = useState<TrainingSession[]>([
    { id: '1', date: '2024-04-01', category: 'Booking Policies', prompts: 12, accuracy: 92 },
    { id: '2', date: '2024-04-03', category: 'Local Recommendations', prompts: 8, accuracy: 87 },
  ]);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate AI response generation
    setTimeout(() => {
      setAiResponse("I'll help potential guests understand your cancellation policy. For cancellations made 48 hours or more before check-in, I'll explain that you offer a full refund minus the service fee. For cancellations made within 48 hours, I'll explain that only the cleaning fee is refundable.");
      setTrainingProgress(50);
      
      // Simulate training completion
      setTimeout(() => {
        setTrainingProgress(100);
        setIsTraining(false);
        
        // Add to training sessions
        const newSession = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          category: 'Cancellation Policy',
          prompts: 1,
          accuracy: 95
        };
        
        setTrainedSessions([newSession, ...trainedSessions]);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Training Center</h2>
        <p className="text-muted-foreground">
          Customize how your AI assistant communicates and operates by training it with your specific instructions.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="messaging">
            <MessageCircle className="h-4 w-4 mr-2" />
            Guest Messaging
          </TabsTrigger>
          <TabsTrigger value="operations">
            <Brain className="h-4 w-4 mr-2" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="history">
            <Sparkles className="h-4 w-4 mr-2" />
            Training History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messaging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-propcloud-500" />
                Train Messaging Responses
              </CardTitle>
              <CardDescription>
                Teach your AI how to handle specific guest scenarios and questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePromptSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scenario">Select Scenario</Label>
                  <select 
                    id="scenario" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="cancellation">Cancellation Policy</option>
                    <option value="checkin">Check-in Instructions</option>
                    <option value="amenities">Questions About Amenities</option>
                    <option value="local">Local Recommendations</option>
                    <option value="problems">Issue Resolution</option>
                    <option value="custom">Custom Scenario</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="training-prompt">Your Instructions</Label>
                  <Textarea 
                    id="training-prompt"
                    placeholder="Explain how you want the AI to handle this scenario..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Example: "When explaining our cancellation policy, emphasize that cancellations made 48 hours before check-in receive a full refund minus the service fee."
                  </p>
                </div>
                
                {isTraining && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Training Progress</span>
                      <span>{trainingProgress}%</span>
                    </div>
                    <Progress value={trainingProgress} />
                  </div>
                )}
                
                {aiResponse && (
                  <div className="bg-slate-50 p-4 rounded-md space-y-2">
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-propcloud-500" />
                      <span className="font-medium">AI Response Simulation</span>
                    </div>
                    <p className="text-sm">{aiResponse}</p>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button">
                <Upload className="h-4 w-4 mr-2" />
                Upload Examples
              </Button>
              <Button type="submit" onClick={handlePromptSubmit} disabled={!userPrompt || isTraining}>
                {isTraining ? (
                  <>Training...</>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Train AI
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>
                Common messaging scenarios you can quickly train your AI on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="h-auto py-3 justify-start text-left">
                  <div>
                    <p className="font-medium">Welcome Messages</p>
                    <p className="text-xs text-muted-foreground">Initial guest greetings</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-3 justify-start text-left">
                  <div>
                    <p className="font-medium">House Rules</p>
                    <p className="text-xs text-muted-foreground">Property policies</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-3 justify-start text-left">
                  <div>
                    <p className="font-medium">Check-out Instructions</p>
                    <p className="text-xs text-muted-foreground">Departure procedures</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="operations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-propcloud-500" />
                Operations Automation
              </CardTitle>
              <CardDescription>
                Train your AI on operational tasks like cleaning and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="cleaning-instructions">Cleaning Instructions</Label>
                  <Textarea 
                    id="cleaning-instructions"
                    placeholder="Enter detailed cleaning instructions for your properties..."
                    rows={3}
                    className="resize-none"
                  />
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Instructions
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label htmlFor="maintenance-contacts">Maintenance Contacts</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="plumber" className="text-xs">Plumber</Label>
                      <Input id="plumber" placeholder="Name & Contact" />
                    </div>
                    <div>
                      <Label htmlFor="electrician" className="text-xs">Electrician</Label>
                      <Input id="electrician" placeholder="Name & Contact" />
                    </div>
                    <div>
                      <Label htmlFor="handyman" className="text-xs">Handyman</Label>
                      <Input id="handyman" placeholder="Name & Contact" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Contacts
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Training History</CardTitle>
              <CardDescription>
                Review past AI training sessions and their effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainedSessions.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div>
                      <p className="font-medium">{session.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.date} • {session.prompts} prompt{session.prompts !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{session.accuracy}% accuracy</p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Test
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {trainedSessions.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No training sessions yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITrainingCenter;