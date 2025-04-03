import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { CheckCircle2, Calendar, DollarSign, TrendingUp, AlertCircle, Info, Download, RefreshCw, MessageSquare, Instagram } from "lucide-react";

// Sample data for charts
const pricingData = [
  { day: "Mon", current: 189, recommended: 219, competitors: 199 },
  { day: "Tue", current: 189, recommended: 219, competitors: 199 },
  { day: "Wed", current: 189, recommended: 209, competitors: 199 },
  { day: "Thu", current: 189, recommended: 229, competitors: 209 },
  { day: "Fri", current: 239, recommended: 259, competitors: 249 },
  { day: "Sat", current: 239, recommended: 279, competitors: 259 },
  { day: "Sun", current: 219, recommended: 249, competitors: 229 },
  { day: "Mon", current: 189, recommended: 209, competitors: 199 },
  { day: "Tue", current: 189, recommended: 199, competitors: 189 },
  { day: "Wed", current: 179, recommended: 199, competitors: 189 },
  { day: "Thu", current: 189, recommended: 209, competitors: 199 },
  { day: "Fri", current: 239, recommended: 269, competitors: 249 },
  { day: "Sat", current: 239, recommended: 279, competitors: 259 },
  { day: "Sun", current: 219, recommended: 239, competitors: 229 },
];

const occupancyData = [
  { month: "Jan", rate: 65 },
  { month: "Feb", rate: 68 },
  { month: "Mar", rate: 75 },
  { month: "Apr", rate: 82 },
  { month: "May", rate: 85 },
  { month: "Jun", rate: 92 },
  { month: "Jul", rate: 95 },
  { month: "Aug", rate: 94 },
  { month: "Sep", rate: 88 },
  { month: "Oct", rate: 80 },
  { month: "Nov", rate: 72 },
  { month: "Dec", rate: 70 },
];

const properties = [
  { id: 1, name: "Beach Villa", baseRate: 219, minRate: 179, maxRate: 299, status: "active" },
  { id: 2, name: "Downtown Apartment", baseRate: 149, minRate: 129, maxRate: 219, status: "active" },
  { id: 3, name: "Mountain Cabin", baseRate: 179, minRate: 139, maxRate: 249, status: "active" },
];

const pricingFactors = [
  { name: "Local Events", impact: "+15%", description: "Major concert in town June 15-17" },
  { name: "Seasonal Demand", impact: "+10%", description: "Peak summer travel season" },
  { name: "Competitor Pricing", impact: "+5%", description: "Similar properties raising rates" },
  { name: "Day of Week", impact: "+20%", description: "Weekend premium applied" },
  { name: "Length of Stay", impact: "-5%", description: "Discount for stays > 5 nights" },
];

// Sample social media inquiries
const socialInquiries = [
  {
    id: 1,
    platform: "Instagram",
    user: "traveler_jane",
    message: "Hi! Is your Beach Villa available next weekend? Looking for a place for 4 people.",
    timestamp: "2 hours ago",
    status: "new"
  },
  {
    id: 2,
    platform: "Facebook",
    user: "john_smith",
    message: "What's the price for a 5-night stay at the Downtown Apartment in July?",
    timestamp: "Yesterday",
    status: "responded"
  },
  {
    id: 3,
    platform: "WhatsApp",
    user: "+1 (555) 123-4567",
    message: "Do you allow pets at the Mountain Cabin?",
    timestamp: "2 days ago",
    status: "booked"
  }
];

const SalesAutomation = () => {
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState(1);
  const [timeFrame, setTimeFrame] = useState("14d");
  const [aiPricing, setAiPricing] = useState(true);
  const [minPrice, setMinPrice] = useState(properties[0].minRate);
  const [maxPrice, setMaxPrice] = useState(properties[0].maxRate);
  const [simulationMode, setSimulationMode] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);
  const [activeTab, setActiveTab] = useState("dynamic-pricing");
  const [showChatPreview, setShowChatPreview] = useState(false);

  const handlePropertyChange = (id) => {
    const property = properties.find(p => p.id === parseInt(id));
    if (property) {
      setSelectedProperty(parseInt(id));
      setMinPrice(property.minRate);
      setMaxPrice(property.maxRate);
    }
  };
  
  const handleApplyRecommendations = () => {
    toast({
      title: "AI Recommendations Applied",
      description: "Pricing has been updated based on AI recommendations",
    });
  };
  
  const handleSimulationToggle = (value) => {
    setSimulationMode(value);
    if (value) {
      setTimeout(() => {
        setSimulationResults({
          revenue: 28450,
          occupancy: 87,
          averageRate: 234,
        });
        toast({
          title: "Simulation Complete",
          description: "Projected metrics available for review",
        });
      }, 1500);
    } else {
      setSimulationResults(null);
    }
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Pricing analysis report has been downloaded",
    });
  };

  const handleShowChatPreview = () => {
    setShowChatPreview(true);
    toast({
      title: "Chat Simulation",
      description: "AI will demonstrate handling a booking inquiry",
    });
  };

  const currentProperty = properties.find(p => p.id === selectedProperty) || properties[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Sales Automation</h1>
                <p className="text-muted-foreground">
                  AI-powered tools to maximize your property's revenue
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedProperty.toString()} onValueChange={handlePropertyChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id.toString()}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleDownloadReport} variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
                <TabsTrigger value="dynamic-pricing">Dynamic Pricing</TabsTrigger>
                <TabsTrigger value="direct-booking">Direct Booking</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dynamic-pricing" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Base Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-3xl font-bold">${currentProperty.baseRate}</div>
                      <p className="text-sm text-muted-foreground">Average nightly rate</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Occupancy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-3xl font-bold">{occupancyData[5].rate}%</div>
                      <p className="text-sm text-muted-foreground">Last 30 days</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Revenue Potential
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-3xl font-bold">+18%</div>
                      <p className="text-sm text-muted-foreground">With recommended pricing</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Price Recommendations</CardTitle>
                        <CardDescription>
                          AI-powered pricing for {currentProperty.name} based on market analysis
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="ai-pricing" 
                            checked={aiPricing} 
                            onCheckedChange={setAiPricing}
                          />
                          <Label htmlFor="ai-pricing">AI Pricing</Label>
                        </div>
                        <ToggleGroup type="single" value={timeFrame} onValueChange={(value) => value && setTimeFrame(value)}>
                          <ToggleGroupItem value="7d">7D</ToggleGroupItem>
                          <ToggleGroupItem value="14d">14D</ToggleGroupItem>
                          <ToggleGroupItem value="30d">30D</ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={pricingData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
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
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Price Influencing Factors</h4>
                      <div className="space-y-2">
                        {pricingFactors.map((factor, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                            <div className="flex items-center">
                              <Info className="h-4 w-4 mr-2 text-slate-500" />
                              <span>{factor.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground">{factor.description}</span>
                              <Badge variant={factor.impact.includes('+') ? "default" : "outline"}>
                                {factor.impact}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <Label>Price Range</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            value={minPrice} 
                            onChange={(e) => setMinPrice(Number(e.target.value))} 
                            className="w-20" 
                          />
                          <span>to</span>
                          <Input 
                            type="number" 
                            value={maxPrice} 
                            onChange={(e) => setMaxPrice(Number(e.target.value))} 
                            className="w-20" 
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => {
                          const property = properties.find(p => p.id === selectedProperty);
                          if (property) {
                            setMinPrice(property.minRate);
                            setMaxPrice(property.maxRate);
                          }
                        }}>
                          Reset
                        </Button>
                        <Button onClick={handleApplyRecommendations}>
                          Apply Recommendations
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Revenue Simulation</CardTitle>
                        <CardDescription>
                          Test pricing strategies and see projected outcomes
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="simulation"
                          checked={simulationMode}
                          onCheckedChange={handleSimulationToggle}
                        />
                        <Label htmlFor="simulation">Enable Simulation</Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {simulationMode ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Simulation Period</Label>
                            <Select defaultValue="90">
                              <SelectTrigger>
                                <SelectValue placeholder="Select period" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">Next 30 days</SelectItem>
                                <SelectItem value="60">Next 60 days</SelectItem>
                                <SelectItem value="90">Next 90 days</SelectItem>
                                <SelectItem value="180">Next 6 months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Pricing Strategy</Label>
                            <Select defaultValue="dynamic">
                              <SelectTrigger>
                                <SelectValue placeholder="Select strategy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fixed">Fixed Pricing</SelectItem>
                                <SelectItem value="dynamic">Dynamic Pricing (AI)</SelectItem>
                                <SelectItem value="aggressive">Aggressive Pricing</SelectItem>
                                <SelectItem value="conservative">Conservative Pricing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Minimum Stay Requirements</Label>
                            <Select defaultValue="2">
                              <SelectTrigger>
                                <SelectValue placeholder="Select minimum" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 night</SelectItem>
                                <SelectItem value="2">2 nights</SelectItem>
                                <SelectItem value="3">3 nights</SelectItem>
                                <SelectItem value="5">5 nights</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {simulationResults ? (
                            <Button variant="outline" onClick={() => {
                              setSimulationMode(false);
                              setSimulationResults(null);
                            }} className="w-full">
                              Reset Simulation
                            </Button>
                          ) : (
                            <Button onClick={() => {
                              setTimeout(() => {
                                setSimulationResults({
                                  revenue: 28450,
                                  occupancy: 87,
                                  averageRate: 234,
                                });
                                toast({
                                  title: "Simulation Complete",
                                  description: "Projected metrics available for review",
                                });
                              }, 1500);
                            }} className="w-full">
                              Run Simulation
                            </Button>
                          )}
                        </div>
                        
                        {simulationResults ? (
                          <div className="md:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-2xl font-bold">${simulationResults.revenue.toLocaleString()}</div>
                                  <p className="text-sm text-muted-foreground">Projected Revenue</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-2xl font-bold">{simulationResults.occupancy}%</div>
                                  <p className="text-sm text-muted-foreground">Projected Occupancy</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-2xl font-bold">${simulationResults.averageRate}</div>
                                  <p className="text-sm text-muted-foreground">Avg. Nightly Rate</p>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={occupancyData}
                                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="rate" name="Occupancy Rate %" fill="#8884d8" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-lg">
                              <div className="flex items-center">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                                <div>
                                  <h4 className="font-medium">AI Recommendation</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Apply dynamic pricing with weekend premiums for maximum revenue
                                  </p>
                                </div>
                              </div>
                              <Button size="sm" onClick={handleApplyRecommendations}>Apply</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="md:col-span-2 flex items-center justify-center h-64">
                            <div className="text-center">
                              <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-spin" />
                              <p className="text-muted-foreground">Configuring simulation parameters...</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-12 text-center">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Revenue Simulation</h3>
                        <p className="text-muted-foreground mb-6">
                          Enable simulation mode to test different pricing strategies and see 
                          projected revenue, occupancy rates, and recommended actions.
                        </p>
                        <Button onClick={() => setSimulationMode(true)}>
                          Enable Simulation Mode
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="direct-booking" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Automated Responses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-3xl font-bold">98%</div>
                      <p className="text-sm text-muted-foreground">Inquiries handled by AI</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Instagram className="h-4 w-4 mr-2" />
                        Social Bookings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-3xl font-bold">24</div>
                      <p className="text-sm text-muted-foreground">Direct bookings this month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Conversion Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-3xl font-bold">68%</div>
                      <p className="text-sm text-muted-foreground">Inquiries to bookings</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>AI Chatbot Automation</CardTitle>
                        <CardDescription>
                          Automatically respond to inquiries and secure bookings across social platforms
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="ai-chat" 
                          checked={true}
                        />
                        <Label htmlFor="ai-chat">AI Chat Assistant</Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Recent Inquiries</h4>
                        
                        {socialInquiries.map((inquiry) => (
                          <div key={inquiry.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer" onClick={inquiry.id === 1 ? handleShowChatPreview : undefined}>
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                inquiry.platform === "Instagram" ? "bg-purple-100 text-purple-600" :
                                inquiry.platform === "Facebook" ? "bg-blue-100 text-blue-600" :
                                "bg-green-100 text-green-600"
                              }`}>
                                {inquiry.platform === "Instagram" ? <Instagram className="h-5 w-5" /> :
                                 inquiry.platform === "Facebook" ? <MessageSquare className="h-5 w-5" /> :
                                 <MessageSquare className="h-5 w-5" />}
                              </div>
                              <div>
                                <div className="font-medium">{inquiry.user}</div>
                                <div className="text-sm text-muted-foreground truncate max-w-[300px]">{inquiry.message}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground">{inquiry.timestamp}</span>
                              <Badge variant={
                                inquiry.status === "new" ? "default" :
                                inquiry.status === "responded" ? "secondary" : "outline"
                              }>
                                {inquiry.status === "new" ? "New" : 
                                 inquiry.status === "responded" ? "Responded" : "Booked"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {showChatPreview && (
                        <div className="mt-6 border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-medium flex items-center">
                              <Instagram className="h-4 w-4 mr-2 text-purple-600" />
                              Instagram Chat
                            </h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Live Preview</span>
                          </div>
                          
                          <div className="border rounded-lg p-3 mb-4">
                            <div className="flex items-start mb-3">
                              <div className="h-8 w-8 bg-gray-200 rounded-full flex-shrink-0 mr-2"></div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">traveler_jane • 2 hours ago</p>
                                <div className="bg-gray-100 p-2 rounded-lg">
                                  <p className="text-sm">Hi! Is your Beach Villa available next weekend? Looking for a place for 4 people.</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-start mb-3">
                              <div className="h-8 w-8 bg-propcloud-100 rounded-full flex-shrink-0 mr-2 flex items-center justify-center">
                                <span className="text-xs font-medium text-propcloud-600">AI</span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">PropCloud AI • 2 hours ago</p>
                                <div className="bg-propcloud-50 p-2 rounded-lg">
                                  <p className="text-sm">Hello! Yes, our Beach Villa is available next weekend (Oct 27-29). For 4 guests, the total cost would be $799 for 2 nights, including all fees. Would you like to secure this booking?</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="h-8 w-8 bg-gray-200 rounded-full flex-shrink-0 mr-2"></div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">traveler_jane • 1 hour ago</p>
                                <div className="bg-gray-100 p-2 rounded-lg">
                                  <p className="text-sm">That sounds great! How do I book it?</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white border rounded-lg p-4">
                            <h5 className="text-sm font-medium mb-2">AI Generated Booking Link</h5>
                            <div className="bg-propcloud-50 rounded-lg p-3 flex items-center justify-between mb-3">
                              <span className="text-sm font-medium">Secure Payment Link Created</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Automatic</span>
                            </div>
                            <Button size="sm" className="w-full">Preview Payment Link</Button>
                          </div>
                        </div>
                      )}
                      
                      {!showChatPreview && (
                        <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg">
                          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Chat Simulation</h3>
                          <p className="text-muted-foreground mb-6">
                            Click "Simulate Conversation" to see how our AI handles booking inquiries
                            from start to payment processing.
                          </p>
                          <Button onClick={handleShowChatPreview}>
                            Simulate Conversation
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AI Assistant Configuration</CardTitle>
                    <CardDescription>
                      Customize how your AI booking assistant communicates with potential guests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="personality">Assistant Personality</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger>
                          <SelectValue placeholder="Select personality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional & Concise</SelectItem>
                          <SelectItem value="friendly">Friendly & Conversational</SelectItem>
                          <SelectItem value="luxury">Luxury & Premium</SelectItem>
                          <SelectItem value="casual">Casual & Relaxed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="response-speed">Response Speed</Label>
                      <Select defaultValue="instant">
                        <SelectTrigger>
                          <SelectValue placeholder="Select speed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instant">Instant (within seconds)</SelectItem>
                          <SelectItem value="quick">Quick (1-5 minutes)</SelectItem>
                          <SelectItem value="delayed">Delayed (appear human-like)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Follow-up Intensity</Label>
                        <span className="text-xs text-muted-foreground">Medium</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <h4 className="font-medium">Enabled Platforms</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="py-1 px-3 bg-blue-50 border-blue-200">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                          Facebook Messenger
                        </Badge>
                        <Badge variant="outline" className="py-1 px-3 bg-purple-50 border-purple-200">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                          Instagram DM
