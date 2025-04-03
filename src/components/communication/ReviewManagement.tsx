
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Sparkles, ThumbsUp, Globe, Send } from "lucide-react";

const reviewPlatforms = [
  { id: "all", name: "All Platforms" },
  { id: "airbnb", name: "Airbnb" },
  { id: "booking", name: "Booking.com" },
  { id: "vrbo", name: "VRBO" },
  { id: "google", name: "Google" },
  { id: "tripadvisor", name: "TripAdvisor" },
];

const reviews = [
  {
    id: 1,
    guest: "Jennifer Wilson",
    platform: "airbnb",
    property: "Beach Villa",
    date: "2 days ago",
    content: "Amazing property with stunning views! The host was very responsive and the house was immaculately clean. Will definitely return for our next vacation.",
    rating: 5,
    status: "pending",
    avatar: "JW",
  },
  {
    id: 2,
    guest: "Robert Thomas",
    platform: "booking",
    property: "Downtown Apartment",
    date: "5 days ago",
    content: "Great location and clean apartment. The only issue was street noise at night which made it difficult to sleep, but overall a good experience.",
    rating: 4,
    status: "responded",
    avatar: "RT",
    response: "Thank you for your feedback, Robert! We appreciate your kind words about our apartment. We're sorry about the street noise - we'll be installing new soundproof windows next month which should help with this issue for future guests."
  },
  {
    id: 3,
    guest: "Lisa Peterson",
    platform: "vrbo",
    property: "Mountain Cabin",
    date: "1 week ago",
    content: "Beautiful location but the cabin needs some maintenance. The shower was leaking and there was a problem with the heating system. The host tried to help but these issues affected our stay.",
    rating: 3,
    status: "responded",
    avatar: "LP",
    response: "We sincerely apologize for the issues you experienced, Lisa. We've since fixed both the shower and heating system. We'd love to welcome you back with a 20% discount to give us another chance to provide the excellent stay we strive for."
  },
  {
    id: 4,
    guest: "Alex Johnson",
    platform: "google",
    property: "Beach Villa",
    date: "2 weeks ago",
    content: "Perfect place for a family vacation! The beach access was convenient and the amenities were exactly as described. The host even left a welcome basket for us.",
    rating: 5,
    status: "published",
    avatar: "AJ",
    response: "Thank you for your wonderful review, Alex! We're thrilled that you and your family enjoyed your stay. The welcome basket is our small way of making guests feel at home. We hope to welcome you back soon!"
  },
  {
    id: 5,
    guest: "Maria Garcia",
    platform: "tripadvisor",
    property: "Downtown Apartment",
    date: "3 weeks ago",
    content: "Excellent location, walking distance to restaurants and attractions. The apartment was comfortable and well-equipped. Would recommend!",
    rating: 5,
    status: "pending",
    avatar: "MG",
  },
];

const ReviewManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState("");
  
  const filteredReviews = reviews.filter(review => {
    const statusMatch = activeTab === "all" || review.status === activeTab;
    const platformMatch = selectedPlatform === "all" || review.platform === selectedPlatform;
    return statusMatch && platformMatch;
  });

  const handleSelectReview = (review) => {
    setSelectedReview(review);
    setResponseText(review.response || "");
  };
  
  const handleGenerateAIResponse = () => {
    if (!selectedReview) return;
    
    let aiResponse = "";
    
    if (selectedReview.rating >= 4) {
      aiResponse = `Thank you for your wonderful ${selectedReview.rating}-star review, ${selectedReview.guest}! We're thrilled that you enjoyed your stay at our ${selectedReview.property}. We work hard to provide a great experience for our guests, and feedback like yours makes it all worthwhile. We hope to welcome you back soon!`;
    } else {
      aiResponse = `Thank you for taking the time to share your feedback, ${selectedReview.guest}. We sincerely apologize for the issues you experienced during your stay at our ${selectedReview.property}. Your comments have been shared with our team and we're taking immediate steps to address them. We'd love the opportunity to welcome you back and provide the exceptional experience we strive for.`;
    }
    
    setResponseText(aiResponse);
    
    toast({
      title: "AI Response Generated",
      description: "An AI response has been drafted based on the review content and rating.",
    });
  };
  
  const handlePublishResponse = () => {
    if (!selectedReview || !responseText.trim()) return;
    
    toast({
      title: "Response Published",
      description: `Your response to ${selectedReview.guest}'s review has been published.`,
    });
    
    // In a real app, this would update the review in the database
    setSelectedReview(null);
    setResponseText("");
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 h-5 w-5" />
          Review Management
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-4 pt-0 flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="pending">
                Pending <Badge variant="outline" className="ml-2">{reviews.filter(r => r.status === "pending").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="responded">Responded</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            
            <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="all" className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">All</span>
                </TabsTrigger>
                <TabsTrigger value="airbnb" className="text-red-600">Airbnb</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex flex-col md:flex-row h-full overflow-hidden border-t mt-4">
            {/* Review List */}
            <div className="w-full md:w-1/2 lg:w-2/5 overflow-y-auto border-r">
              {filteredReviews.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No reviews found matching the current filters.
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div 
                    key={review.id} 
                    className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${selectedReview?.id === review.id ? 'bg-slate-50' : ''}`}
                    onClick={() => handleSelectReview(review)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{review.guest}</h3>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">{review.property}</p>
                            <Badge variant="outline" className="text-xs">{reviewPlatforms.find(p => p.id === review.platform)?.name}</Badge>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm line-clamp-3">{review.content}</p>
                    {review.status !== "pending" && (
                      <Badge variant="outline" className="mt-2">
                        {review.status === "responded" ? "Response Submitted" : "Published"}
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {/* Response Editor */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              {selectedReview ? (
                <>
                  <div className="mb-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < selectedReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      Review from {selectedReview.guest}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedReview.date} on {reviewPlatforms.find(p => p.id === selectedReview.platform)?.name}</p>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-md mb-4">
                    <p className="text-sm">{selectedReview.content}</p>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Your Response</label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleGenerateAIResponse}
                        disabled={selectedReview.status === "published"}
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1" /> 
                        Generate AI Response
                      </Button>
                    </div>
                    
                    <Textarea 
                      className="flex-1 resize-none"
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Write a response to this review..."
                      disabled={selectedReview.status === "published"}
                    />
                    
                    <div className="flex justify-end gap-2 mt-4">
                      {selectedReview.status === "published" ? (
                        <Button variant="outline" disabled>
                          <ThumbsUp className="h-4 w-4 mr-1" /> Already Published
                        </Button>
                      ) : (
                        <Button 
                          onClick={handlePublishResponse}
                          disabled={!responseText.trim()}
                        >
                          <Send className="h-4 w-4 mr-1" /> Publish Response
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground flex-col p-8">
                  <Star className="h-12 w-12 mb-4 text-slate-300" />
                  <p className="text-center">Select a review from the list to view details and respond</p>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReviewManagement;
