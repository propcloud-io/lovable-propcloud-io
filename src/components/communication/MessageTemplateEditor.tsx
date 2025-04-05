import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Plus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'confirmation' | 'reminder' | 'checkout' | 'custom';
  variables: string[];
}

const availableVariables = [
  { label: 'Guest Name', value: '{{guestName}}' },
  { label: 'Property Name', value: '{{propertyName}}' },
  { label: 'Check-in Date', value: '{{checkInDate}}' },
  { label: 'Check-out Date', value: '{{checkOutDate}}' },
  { label: 'Total Amount', value: '{{totalAmount}}' },
  { label: 'Booking ID', value: '{{bookingId}}' },
  { label: 'Host Name', value: '{{hostName}}' },
];

export function MessageTemplateEditor() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: 'New Template',
      subject: '',
      content: '',
      type: 'custom',
      variables: [],
    };
    setTemplates([...templates, newTemplate]);
    setCurrentTemplate(newTemplate);
    setIsEditing(true);
  };

  const handleSaveTemplate = () => {
    if (!currentTemplate) return;

    const templateIndex = templates.findIndex(t => t.id === currentTemplate.id);
    const updatedTemplates = [...templates];

    if (templateIndex >= 0) {
      updatedTemplates[templateIndex] = currentTemplate;
    } else {
      updatedTemplates.push(currentTemplate);
    }

    setTemplates(updatedTemplates);
    setIsEditing(false);
    toast({
      title: 'Template saved',
      description: 'Your message template has been saved successfully.',
    });
  };

  const handleInsertVariable = (variable: string) => {
    if (!currentTemplate) return;

    const updatedTemplate = {
      ...currentTemplate,
      content: currentTemplate.content + ' ' + variable,
      variables: [...currentTemplate.variables, variable],
    };
    setCurrentTemplate(updatedTemplate);
  };

  const handleRemoveVariable = (variable: string) => {
    if (!currentTemplate) return;

    const updatedTemplate = {
      ...currentTemplate,
      content: currentTemplate.content.replace(variable, ''),
      variables: currentTemplate.variables.filter(v => v !== variable),
    };
    setCurrentTemplate(updatedTemplate);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Message Templates</h2>
        <Button onClick={handleCreateTemplate}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      {currentTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Edit Template' : currentTemplate.name}
            </CardTitle>
            <CardDescription>
              Customize your message template with variables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  value={currentTemplate.name}
                  onChange={(e) =>
                    setCurrentTemplate({
                      ...currentTemplate,
                      name: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="templateType">Template Type</Label>
                <Select
                  value={currentTemplate.type}
                  onValueChange={(value: Template['type']) =>
                    setCurrentTemplate({
                      ...currentTemplate,
                      type: value,
                    })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Message</SelectItem>
                    <SelectItem value="confirmation">Booking Confirmation</SelectItem>
                    <SelectItem value="reminder">Check-in Reminder</SelectItem>
                    <SelectItem value="checkout">Check-out Instructions</SelectItem>
                    <SelectItem value="custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="templateSubject">Subject</Label>
                <Input
                  id="templateSubject"
                  value={currentTemplate.subject}
                  onChange={(e) =>
                    setCurrentTemplate({
                      ...currentTemplate,
                      subject: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="templateContent">Message Content</Label>
                <Textarea
                  id="templateContent"
                  value={currentTemplate.content}
                  onChange={(e) =>
                    setCurrentTemplate({
                      ...currentTemplate,
                      content: e.target.value,
                    })
                  }
                  className="min-h-[200px]"
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div>
                  <Label>Insert Variables</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableVariables.map((variable) => (
                      <Button
                        key={variable.value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleInsertVariable(variable.value)}
                      >
                        {variable.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label>Used Variables</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentTemplate.variables.map((variable) => (
                    <Badge
                      key={variable}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {variable}
                      {isEditing && (
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveVariable(variable)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Template
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveTemplate}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Template
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!currentTemplate && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p>No template selected. Create a new template to get started.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 