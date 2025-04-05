import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  language: string;
  platform: 'whatsapp' | 'email' | 'sms';
}

const AVAILABLE_TAGS = [
  { label: 'Guest Name', value: '{{guest_name}}' },
  { label: 'Check-in Time', value: '{{checkin_time}}' },
  { label: 'Property Name', value: '{{property_name}}' },
  { label: 'Booking Reference', value: '{{booking_ref}}' },
  { label: 'Check-out Time', value: '{{checkout_time}}' },
];

export function MessageTemplateEditor() {
  const [template, setTemplate] = useState<MessageTemplate>({
    id: Date.now().toString(),
    name: '',
    content: '',
    language: 'en',
    platform: 'whatsapp'
  });

  const [previewData, setPreviewData] = useState({
    guest_name: 'John Doe',
    checkin_time: '3:00 PM',
    property_name: 'Beach Villa',
    booking_ref: 'BK123456',
    checkout_time: '11:00 AM'
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving template:', template);
  };

  const handlePreview = () => {
    let previewContent = template.content;
    Object.entries(previewData).forEach(([key, value]) => {
      previewContent = previewContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return previewContent;
  };

  const insertTag = (tag: string) => {
    setTemplate(prev => ({
      ...prev,
      content: prev.content + tag
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={template.name}
                onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Welcome Message"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-language">Language</Label>
              <Select
                value={template.language}
                onValueChange={(value) => setTemplate(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-content">Message Content</Label>
            <Textarea
              id="template-content"
              value={template.content}
              onChange={(e) => setTemplate(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter your message template..."
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Available Tags</Label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <Button
                  key={tag.value}
                  variant="outline"
                  size="sm"
                  onClick={() => insertTag(tag.value)}
                >
                  {tag.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setTemplate(prev => ({ ...prev, content: '' }))}>
              Clear
            </Button>
            <Button onClick={handleSave}>Save Template</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Preview</h3>
        <div className="bg-muted p-4 rounded-md">
          <p className="whitespace-pre-wrap">{handlePreview()}</p>
        </div>
      </Card>
    </div>
  );
} 