
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, TrendingUp, CalendarDays, DollarSign, BarChart } from "lucide-react";

const PricingOptimizationWidget = () => {
  const { toast } = useToast();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [priceRange, setPriceRange] = useState([50, 250]);
  
  // Suggested price increases based on simulated market conditions
  const suggestions = [
    { 
      dates: "June 15-20", 
      currentPrice: "$179/night", 
      suggestedPrice: "$219/night", 
      reason: "Local festival", 
      increase: "+22%",
      accepted: false
    },
    { 
      dates: "July 4-6", 
      currentPrice: "$179/night", 
      suggestedPrice: "$249/night", 
      reason: "Holiday weekend", 
      increase: "+39%",
      accepted: true
    },
    { 
      dates: "July 10-12", 
      currentPrice: "$179/night", 
      suggestedPrice: "$199/night", 
      reason: "Competitor price increase", 
      increase: "+11%",
      accepted: false
    },
  ];
  
  const handleAcceptSuggestion = (index: number) => {
    toast({
      title: "Price Updated",
      description: `Price for ${suggestions[index].dates} has been updated to ${suggestions[index].suggestedPrice}`,
    });
    
    suggestions[index].accepted = true;
  };
  
  const handleToggleAI = () => {
    setAiEnabled(!aiEnabled);
    
    toast({
      title: aiEnabled ? "AI Pricing Disabled" : "AI Pricing Enabled",
      description: aiEnabled 
        ? "You will need to set prices manually" 
        : "PropCloud AI will now suggest optimal pricing",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
          <h3 className="text-sm font-medium">AI Price Optimization</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground mr-1">
            {aiEnabled ? "Enabled" : "Disabled"}
          </span>
          <Switch 
            checked={aiEnabled} 
            onCheckedChange={handleToggleAI}
          />
        </div>
      </div>
      
      {aiEnabled && (
        <>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-xs">Price Range ($/night)</Label>
                <span className="text-xs font-medium">${priceRange[0]} - ${priceRange[1]}</span>
              </div>
              <Slider 
                value={priceRange}
                min={50}
                max={500}
                step={5}
                onValueChange={setPriceRange}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-xs text-muted-foreground font-medium">Price Suggestions</h4>
            
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs font-medium">{suggestion.dates}</p>
                      </div>
                      <div className="flex items-center mt-1 gap-1">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.reason}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 text-xs border-0">
                          {suggestion.increase}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          {suggestion.currentPrice}
                        </span>
                        <span className="text-sm font-bold">
                          {suggestion.suggestedPrice}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={suggestion.accepted ? "outline" : "default"}
                      onClick={() => handleAcceptSuggestion(index)}
                      disabled={suggestion.accepted}
                      className="h-7 text-xs"
                    >
                      {suggestion.accepted ? "Applied" : "Apply"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-2">
            <BarChart className="h-3.5 w-3.5 mr-2" />
            View All Price Suggestions
          </Button>
        </>
      )}
      
      {!aiEnabled && (
        <div className="py-6 text-center">
          <DollarSign className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-sm font-medium mb-1">AI Pricing Disabled</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Enable AI pricing to receive smart price suggestions
          </p>
          <Button size="sm" onClick={handleToggleAI}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Enable AI Pricing
          </Button>
        </div>
      )}
    </div>
  );
};

export default PricingOptimizationWidget;
