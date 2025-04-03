
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Info,
  DollarSign,
  Check
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data for charts
const pricingData = [
  { date: "Jun 01", current: 189, recommended: 219, competitors: 199 },
  { date: "Jun 02", current: 189, recommended: 219, competitors: 199 },
  { date: "Jun 03", current: 189, recommended: 209, competitors: 199 },
  { date: "Jun 04", current: 189, recommended: 229, competitors: 209 },
  { date: "Jun 05", current: 239, recommended: 259, competitors: 249 },
  { date: "Jun 06", current: 239, recommended: 279, competitors: 259 },
  { date: "Jun 07", current: 219, recommended: 249, competitors: 229 },
  { date: "Jun 08", current: 189, recommended: 209, competitors: 199 },
  { date: "Jun 09", current: 189, recommended: 199, competitors: 189 },
  { date: "Jun 10", current: 179, recommended: 199, competitors: 189 },
  { date: "Jun 11", current: 189, recommended: 209, competitors: 199 },
  { date: "Jun 12", current: 239, recommended: 269, competitors: 249 },
  { date: "Jun 13", current: 239, recommended: 279, competitors: 259 },
  { date: "Jun 14", current: 219, recommended: 239, competitors: 229 },
];

const pricingFactors = [
  { name: "Local Events", impact: "+15%", description: "Major concert in town June 15-17" },
  { name: "Seasonal Demand", impact: "+10%", description: "Peak summer travel season" },
  { name: "Competitor Pricing", impact: "+5%", description: "Similar properties raising rates" },
  { name: "Day of Week", impact: "+20%", description: "Weekend premium applied" },
];

const PricingOptimizationWidget = () => {
  const { toast } = useToast();
  const [timeFrame, setTimeFrame] = useState("14d");
  
  const handleApplyRecommendations = () => {
    toast({
      title: "Recommended Pricing Applied",
      description: "Your pricing has been updated based on AI recommendations"
    });
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="chart">
        <div className="flex items-center justify-between mb-3">
          <TabsList>
            <TabsTrigger value="chart">Price Chart</TabsTrigger>
            <TabsTrigger value="factors">Factors</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="7d" onClick={() => setTimeFrame("7d")}>7D</TabsTrigger>
              <TabsTrigger value="14d" onClick={() => setTimeFrame("14d")}>14D</TabsTrigger>
              <TabsTrigger value="30d" onClick={() => setTimeFrame("30d")}>30D</TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="chart" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={pricingData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#94a3b8"
                  name="Current Price"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="recommended"
                  stroke="#7c3aed"
                  name="AI Recommended"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="competitors"
                  stroke="#64748b"
                  strokeDasharray="5 5"
                  name="Competitors Avg"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-1">Average Gap</div>
                  <div className="text-lg font-bold text-green-600 flex items-center">
                    +$30 <TrendingUp className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-1">Potential Revenue</div>
                  <div className="text-lg font-bold text-purple-600">+18%</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-1">Occupancy Impact</div>
                  <div className="text-lg font-bold text-amber-600">-2%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="factors">
          <div className="space-y-3">
            {pricingFactors.map((factor, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-100 text-slate-700 rounded-md p-2">
                        <Info className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{factor.name}</p>
                        <p className="text-xs text-muted-foreground">{factor.description}</p>
                      </div>
                    </div>
                    <Badge variant={factor.impact.includes('+') ? "default" : "outline"}>
                      {factor.impact}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Special Event Detected</p>
                  <p className="text-xs text-amber-700">Summer Music Festival (June 15-17) is driving higher demand in your area</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-col sm:flex-row justify-between pt-2 gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <DollarSign className="h-3 w-3 mr-1" /> Customize Rules
        </Button>
        <Button size="sm" className="text-xs" onClick={handleApplyRecommendations}>
          <Check className="h-3 w-3 mr-1" /> Apply Recommendations
        </Button>
      </div>
    </div>
  );
};

export default PricingOptimizationWidget;
