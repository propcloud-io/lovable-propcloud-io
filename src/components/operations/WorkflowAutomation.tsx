
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Clock, AlertTriangle, UserCheck, Trash, PlusCircle, Bot } from "lucide-react";

interface WorkflowRule {
  id: number;
  name: string;
  trigger: string;
  action: string;
  property: string;
  enabled: boolean;
  notifyOwner: boolean;
  notifyGuest: boolean;
}

const WorkflowAutomation = () => {
  const { toast } = useToast();
  const [rules, setRules] = useState<WorkflowRule[]>([
    {
      id: 1,
      name: "Auto-schedule cleaning after checkout",
      trigger: "checkout",
      action: "schedule_cleaning",
      property: "all",
      enabled: true,
      notifyOwner: true,
      notifyGuest: false,
    },
    {
      id: 2,
      name: "Check-in reminder for guests",
      trigger: "1_day_before_checkin",
      action: "send_reminder",
      property: "all",
      enabled: true,
      notifyOwner: false,
      notifyGuest: true,
    },
    {
      id: 3,
      name: "Monthly maintenance check",
      trigger: "monthly",
      action: "schedule_maintenance",
      property: "Beach Villa",
      enabled: false,
      notifyOwner: true,
      notifyGuest: false,
    }
  ]);
  
  const [showNewRuleForm, setShowNewRuleForm] = useState(false);
  const [newRule, setNewRule] = useState<Omit<WorkflowRule, "id">>({
    name: "",
    trigger: "",
    action: "",
    property: "all",
    enabled: true,
    notifyOwner: true,
    notifyGuest: false,
  });
  
  const triggers = [
    { value: "checkout", label: "Guest Checkout" },
    { value: "checkin", label: "Guest Check-in" },
    { value: "1_day_before_checkin", label: "1 Day Before Check-in" },
    { value: "booking_confirmed", label: "Booking Confirmed" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "maintenance_completed", label: "Maintenance Completed" },
  ];
  
  const actions = [
    { value: "schedule_cleaning", label: "Schedule Cleaning" },
    { value: "schedule_maintenance", label: "Schedule Maintenance" },
    { value: "send_reminder", label: "Send Reminder" },
    { value: "notify_staff", label: "Notify Staff" },
    { value: "update_calendar", label: "Update Calendar" },
    { value: "send_instructions", label: "Send Instructions" },
  ];
  
  const properties = [
    { value: "all", label: "All Properties" },
    { value: "Beach Villa", label: "Beach Villa" },
    { value: "Downtown Apartment", label: "Downtown Apartment" },
    { value: "Mountain Cabin", label: "Mountain Cabin" },
  ];
  
  const handleToggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast({
        title: rule.enabled ? "Rule Disabled" : "Rule Enabled",
        description: `"${rule.name}" has been ${rule.enabled ? "disabled" : "enabled"}.`,
      });
    }
  };
  
  const handleDeleteRule = (id: number) => {
    const rule = rules.find(r => r.id === id);
    setRules(rules.filter(rule => rule.id !== id));
    
    if (rule) {
      toast({
        title: "Rule Deleted",
        description: `"${rule.name}" has been permanently deleted.`,
      });
    }
  };
  
  const handleAddRule = () => {
    if (!newRule.name || !newRule.trigger || !newRule.action) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const createdRule = {
      ...newRule,
      id: Math.max(0, ...rules.map(r => r.id)) + 1
    };
    
    setRules([...rules, createdRule]);
    setShowNewRuleForm(false);
    setNewRule({
      name: "",
      trigger: "",
      action: "",
      property: "all",
      enabled: true,
      notifyOwner: true,
      notifyGuest: false,
    });
    
    toast({
      title: "Rule Created",
      description: `"${createdRule.name}" has been added to your workflow automation.`,
    });
  };
  
  const getTriggerIcon = (trigger: string) => {
    if (trigger.includes("checkout")) return <CalendarCheck className="h-5 w-5 text-red-500" />;
    if (trigger.includes("checkin")) return <CalendarCheck className="h-5 w-5 text-green-500" />;
    if (trigger.includes("before")) return <Clock className="h-5 w-5 text-amber-500" />;
    if (trigger.includes("booking")) return <UserCheck className="h-5 w-5 text-indigo-500" />;
    if (trigger.includes("weekly") || trigger.includes("monthly")) return <Clock className="h-5 w-5 text-blue-500" />;
    if (trigger.includes("maintenance")) return <AlertTriangle className="h-5 w-5 text-purple-500" />;
    return <Clock className="h-5 w-5 text-slate-500" />;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Workflow Automation
            </CardTitle>
            <CardDescription>Create rules to automate your property management tasks</CardDescription>
          </div>
          <Button onClick={() => setShowNewRuleForm(!showNewRuleForm)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Rule
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showNewRuleForm && (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Create New Automation Rule</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input 
                    id="rule-name" 
                    placeholder="E.g., Schedule cleaning after checkout" 
                    value={newRule.name}
                    onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="trigger">When this happens (Trigger)</Label>
                    <Select 
                      value={newRule.trigger}
                      onValueChange={(value) => setNewRule({...newRule, trigger: value})}
                    >
                      <SelectTrigger id="trigger">
                        <SelectValue placeholder="Select a trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        {triggers.map((trigger) => (
                          <SelectItem key={trigger.value} value={trigger.value}>
                            {trigger.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="action">Do this (Action)</Label>
                    <Select 
                      value={newRule.action}
                      onValueChange={(value) => setNewRule({...newRule, action: value})}
                    >
                      <SelectTrigger id="action">
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                      <SelectContent>
                        {actions.map((action) => (
                          <SelectItem key={action.value} value={action.value}>
                            {action.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="property">Apply to Property</Label>
                  <Select 
                    value={newRule.property}
                    onValueChange={(value) => setNewRule({...newRule, property: value})}
                  >
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.value} value={property.value}>
                          {property.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Notifications</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notify-owner"
                      checked={newRule.notifyOwner}
                      onCheckedChange={(checked) => 
                        setNewRule({...newRule, notifyOwner: checked === true})
                      }
                    />
                    <Label htmlFor="notify-owner">Notify me when this rule runs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notify-guest"
                      checked={newRule.notifyGuest}
                      onCheckedChange={(checked) => 
                        setNewRule({...newRule, notifyGuest: checked === true})
                      }
                    />
                    <Label htmlFor="notify-guest">Notify guest when this rule runs</Label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="outline" onClick={() => setShowNewRuleForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRule}>
                    Create Rule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="space-y-4">
          {rules.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
              <p>No automation rules found. Create your first workflow rule to get started.</p>
            </div>
          ) : (
            rules.map((rule) => (
              <Card key={rule.id} className={`overflow-hidden ${!rule.enabled ? 'opacity-70' : ''}`}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 md:py-6 md:pl-6 md:pr-4 flex gap-4 flex-1">
                      <div className="bg-slate-100 p-2 rounded-full h-fit">
                        {getTriggerIcon(rule.trigger)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{rule.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">
                            {triggers.find(t => t.value === rule.trigger)?.label || rule.trigger}
                          </Badge>
                          <Badge variant="outline">
                            {actions.find(a => a.value === rule.action)?.label || rule.action}
                          </Badge>
                          <Badge variant="outline">
                            {rule.property}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                          {rule.notifyOwner && (
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-4 w-4" />
                              Notify owner
                            </div>
                          )}
                          {rule.notifyGuest && (
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-4 w-4" />
                              Notify guest
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 md:p-6 flex md:flex-col justify-between items-center gap-4 border-t md:border-t-0 md:border-l">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={rule.enabled}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <span className="text-sm">
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex gap-3 items-start">
              <Bot className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-medium mb-1">AI-Powered Workflows</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI can analyze your property operation patterns and suggest optimal workflow rules. 
                  Enable AI recommendations to optimize your property management.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Enable AI Recommendations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default WorkflowAutomation;
