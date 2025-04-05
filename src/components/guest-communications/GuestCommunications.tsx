import React, { useState, useEffect } from 'react';
import { useCommunication } from '@/hooks/useCommunication';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, MessageSquare, Mail, MessageCircle, HelpCircle } from 'lucide-react';
import { MessageTemplateEditor } from './MessageTemplateEditor';
import { IntegrationPlaceholder } from '@/components/ui/integration-placeholder';
import { config } from '@/services/config';

interface Message {
  id: string;
  from: string;
  message: string;
  platform: 'whatsapp' | 'email' | 'sms';
  timestamp: string;
  status: 'processing' | 'sent' | 'failed';
}

export function GuestCommunications() {
  const { handleGuestMessage, sendAutomatedMessage, checkMessageStatus, isLoading } = useCommunication();
  const { startCommunicationTour } = useOnboarding();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'email' | 'sms'>('whatsapp');
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      from: 'guest@example.com',
      message: newMessage,
      platform: selectedPlatform,
      timestamp: new Date().toISOString(),
      status: 'processing'
    };

    try {
      await handleGuestMessage(message);
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSendAutomatedMessage = async (to: string) => {
    try {
      await sendAutomatedMessage(
        to,
        'welcome_message',
        'en',
        [{ type: 'body', parameters: [{ type: 'text', text: 'Welcome to our property!' }] }]
      );
    } catch (error) {
      console.error('Failed to send automated message:', error);
    }
  };

  useEffect(() => {
    const checkStatuses = async () => {
      for (const message of messages) {
        if (message.status === 'processing') {
          try {
            const statusResponse = await checkMessageStatus(message.id);
            setMessages(prev =>
              prev.map(msg =>
                msg.id === message.id ? { ...msg, status: statusResponse.status as 'sent' | 'failed' | 'processing' } : msg
              )
            );
          } catch (error) {
            console.error('Failed to check message status:', error);
          }
        }
      }
    };

    const interval = setInterval(checkStatuses, 5000);
    return () => clearInterval(interval);
  }, [messages, checkMessageStatus]);

  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Guest Communications</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={startCommunicationTour}
          className="flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          Take a Tour
        </Button>
      </div>

      {!config.features.enableWhatsApp && (
        <IntegrationPlaceholder
          title="WhatsApp Integration"
          description="Connect your WhatsApp Business account to enable automated messaging and guest communications."
          platform="WhatsApp"
          onConnect={() => console.log('Connect WhatsApp')}
        />
      )}

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Send Message</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTemplateEditor(!showTemplateEditor)}
            className="message-templates"
          >
            {showTemplateEditor ? 'Hide Templates' : 'Message Templates'}
          </Button>
        </div>

        {showTemplateEditor ? (
          <MessageTemplateEditor />
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2 message-input">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value as 'whatsapp' | 'email' | 'sms')}
                className="border rounded-md px-2"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
              <Button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Send
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-4 message-history">
        <h2 className="text-lg font-semibold mb-4">Message History</h2>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {renderPlatformIcon(message.platform)}
                      <p className="font-medium">{message.from}</p>
                    </div>
                    <p className="text-sm text-gray-500">{message.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{message.platform}</span>
                    <span className={`text-xs ${
                      message.status === 'sent' ? 'text-green-500' :
                      message.status === 'failed' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => handleSendAutomatedMessage('guest@example.com')}
          className="welcome-message"
        >
          Send Welcome Message
        </Button>
      </div>
    </div>
  );
} 