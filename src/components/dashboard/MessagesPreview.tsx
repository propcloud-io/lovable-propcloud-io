
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const messages = [
  {
    id: 1,
    sender: "John Smith",
    message: "Hi, I'm interested in booking your property for next weekend. Is it available?",
    time: "10:45 AM",
    avatar: "",
    initials: "JS",
    platform: "Airbnb",
    read: false,
  },
  {
    id: 2,
    sender: "Maria Garcia",
    message: "What's the check-in procedure? We'll be arriving around 6pm tomorrow.",
    time: "Yesterday",
    avatar: "",
    initials: "MG",
    platform: "Booking.com",
    read: true,
  },
  {
    id: 3,
    sender: "Robert Johnson",
    message: "Is there parking available at the property or nearby?",
    time: "Yesterday",
    avatar: "",
    initials: "RJ",
    platform: "Direct",
    read: true,
  },
];

const MessagesPreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Recent Messages</span>
          <Button variant="ghost" size="sm" className="text-propcloud-600">
            View All
          </Button>
        </CardTitle>
        <CardDescription>Latest guest messages across platforms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={message.avatar} />
              <AvatarFallback>{message.initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium block">{message.sender}</span>
                  <span className="text-xs text-muted-foreground">{message.platform}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                  {!message.read && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-propcloud-500"></span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MessagesPreview;
