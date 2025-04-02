
import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownRight, ArrowUpRight, BarChart3, BookOpen, Calendar, DollarSign, Download, LineChart, PieChart, TrendingUp, Users } from "lucide-react";

const Analytics = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("30d");
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {showOnboarding && (
              <Card className="bg-gradient-to-r from-propcloud-50 to-blue-50 border-propcloud-100">
                <CardHeader>
                  <CardTitle>Property Analytics</CardTitle>
                  <CardDescription>
                    AI-powered insights and performance reporting for your properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      Your analytics dashboard provides deep insights into your property performance, 
                      revenue trends, and guest behavior. Our AI automatically detects patterns and 
                      provides actionable recommendations to optimize your business.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          toast({
                            title: "Tour Started",
                            description: "Let's explore the Analytics features",
                          });
                        }}
                      >
                        Take a Quick Tour
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => setShowOnboarding(false)}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Analytics</h1>
              <div className="flex items-center gap-3">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="ytd">Year to date</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2" onClick={() => {
                  toast({
                    title: "Report Generated",
                    description: "Your analytics report has been downloaded",
                  });
                }}>
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
                <TabsTrigger value="guests">Guest Analytics</TabsTrigger>
                <TabsTrigger value="channels">Channel Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between space-y-0">
                        <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <h2 className="text-3xl font-bold">$24,853</h2>
                        <div className="text-sm text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+12.5%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Compared to previous period</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between space-y-0">
                        <h3 className="tracking-tight text-sm font-medium">Occupancy Rate</h3>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <h2 className="text-3xl font-bold">76%</h2>
                        <div className="text-sm text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+4.2%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Compared to previous period</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between space-y-0">
                        <h3 className="tracking-tight text-sm font-medium">Average Daily Rate</h3>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <h2 className="text-3xl font-bold">$218</h2>
                        <div className="text-sm text-red-600 flex items-center">
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                          <span>-2.1%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Compared to previous period</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between space-y-0">
                        <h3 className="tracking-tight text-sm font-medium">Total Bookings</h3>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <h2 className="text-3xl font-bold">86</h2>
                        <div className="text-sm text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+8.3%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Compared to previous period</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                      <CardDescription>
                        Monthly revenue breakdown by property
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Revenue trend visualization</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Sources</CardTitle>
                      <CardDescription>
                        Distribution of bookings by channel
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex flex-col">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Channel distribution chart</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-sm">Airbnb</span>
                          </div>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">Booking.com</span>
                          </div>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Direct</span>
                          </div>
                          <span className="text-sm font-medium">23%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Properties</CardTitle>
                      <CardDescription>
                        Based on revenue and occupancy
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "Beach Villa", revenue: "$10,480", occupancy: "82%", trend: "up" },
                          { name: "Downtown Apartment", revenue: "$8,320", occupancy: "78%", trend: "up" },
                          { name: "Mountain Cabin", revenue: "$6,053", occupancy: "65%", trend: "down" }
                        ].map((property, index) => (
                          <div key={index} className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center">
                              <div className="mr-3 w-2 h-10 bg-propcloud-500 rounded-sm"></div>
                              <div>
                                <h4 className="font-medium">{property.name}</h4>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <span>Revenue: {property.revenue}</span>
                                  <span>•</span>
                                  <span>Occupancy: {property.occupancy}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              {property.trend === "up" ? (
                                <Badge variant="success" className="flex items-center gap-1">
                                  <ArrowUpRight className="h-3 w-3" />
                                  <span>Up</span>
                                </Badge>
                              ) : (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <ArrowDownRight className="h-3 w-3" />
                                  <span>Down</span>
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>AI Insights & Recommendations</CardTitle>
                      <CardDescription>
                        Automatically generated analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-propcloud-500 pl-4 py-1">
                          <h4 className="font-medium">Weekend Rate Optimization</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your weekend rates could be increased by 12-15% without affecting 
                            occupancy, based on market demand analysis.
                          </p>
                          <Button variant="link" className="px-0 mt-1 h-6" onClick={() => {
                            toast({
                              title: "Optimization Applied",
                              description: "Weekend rate optimization has been applied to your properties",
                            });
                          }}>Apply Recommendation</Button>
                        </div>

                        <div className="border-l-4 border-amber-500 pl-4 py-1">
                          <h4 className="font-medium">Seasonal Trend Alert</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Bookings for December are 30% below last year's pace. Consider 
                            running early bird promotions.
                          </p>
                          <Button variant="link" className="px-0 mt-1 h-6" onClick={() => {
                            toast({
                              title: "Promotion Created",
                              description: "Early bird promotion for December has been created",
                            });
                          }}>Create Promotion</Button>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4 py-1">
                          <h4 className="font-medium">Direct Booking Opportunity</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            17 guests have booked multiple times through OTAs. Target them with 
                            direct booking incentives to save on commissions.
                          </p>
                          <Button variant="link" className="px-0 mt-1 h-6" onClick={() => {
                            toast({
                              title: "Campaign Created",
                              description: "Direct booking campaign targeting repeat guests has been created",
                            });
                          }}>Create Campaign</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="revenue" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Revenue Analysis</CardTitle>
                        <CardDescription>
                          Detailed breakdown of revenue streams
                        </CardDescription>
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Properties</SelectItem>
                          <SelectItem value="beach">Beach Villa</SelectItem>
                          <SelectItem value="downtown">Downtown Apartment</SelectItem>
                          <SelectItem value="mountain">Mountain Cabin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Revenue analysis chart visualization</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Base Revenue</h3>
                        <div className="mt-1 text-2xl font-semibold">$18,640</div>
                        <div className="text-xs text-green-600 mt-1 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+8.3% vs prev. period</span>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Additional Services</h3>
                        <div className="mt-1 text-2xl font-semibold">$3,520</div>
                        <div className="text-xs text-green-600 mt-1 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+15.6% vs prev. period</span>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Cleaning Fees</h3>
                        <div className="mt-1 text-2xl font-semibold">$2,693</div>
                        <div className="text-xs text-green-600 mt-1 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+7.1% vs prev. period</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Optimization Opportunities</CardTitle>
                    <CardDescription>
                      AI-identified opportunities to increase revenue
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Dynamic Pricing Optimization</h3>
                            <Badge>High Impact</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Our AI analysis shows that implementing more aggressive dynamic pricing based on 
                            demand patterns could increase revenue by 14-18% during peak seasons.
                          </p>
                          <Button className="mt-4" onClick={() => {
                            toast({
                              title: "Dynamic Pricing Enabled",
                              description: "Advanced dynamic pricing has been enabled for your properties",
                            });
                          }}>Enable Advanced Pricing</Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Length-of-Stay Discounts</h3>
                            <Badge>Medium Impact</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Offering tiered discounts for stays longer than 7 nights could increase your 
                            overall occupancy by an estimated 8-10% during shoulder seasons.
                          </p>
                          <Button className="mt-4" onClick={() => {
                            toast({
                              title: "Discount Structure Created",
                              description: "Length-of-stay discount structure has been created",
                            });
                          }}>Create Discount Structure</Button>
                        </div>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Revenue Forecast</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="text-left text-sm border-b">
                                  <th className="py-2 px-4 font-medium">Month</th>
                                  <th className="py-2 px-4 font-medium">Projected Revenue</th>
                                  <th className="py-2 px-4 font-medium">Projected Occupancy</th>
                                  <th className="py-2 px-4 font-medium">Forecast Accuracy</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { month: "October 2023", revenue: "$9,840", occupancy: "78%", accuracy: "High" },
                                  { month: "November 2023", revenue: "$7,260", occupancy: "65%", accuracy: "Medium" },
                                  { month: "December 2023", revenue: "$12,450", occupancy: "85%", accuracy: "Medium" },
                                ].map((forecast, index) => (
                                  <tr key={index} className="border-b hover:bg-slate-50">
                                    <td className="py-2 px-4">{forecast.month}</td>
                                    <td className="py-2 px-4">{forecast.revenue}</td>
                                    <td className="py-2 px-4">{forecast.occupancy}</td>
                                    <td className="py-2 px-4">
                                      <Badge variant="outline">
                                        {forecast.accuracy}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="occupancy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Occupancy Analysis</CardTitle>
                        <CardDescription>
                          Detailed overview of property occupancy
                        </CardDescription>
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Properties</SelectItem>
                          <SelectItem value="beach">Beach Villa</SelectItem>
                          <SelectItem value="downtown">Downtown Apartment</SelectItem>
                          <SelectItem value="mountain">Mountain Cabin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Occupancy rate visualization</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Average Occupancy</h3>
                        <div className="text-2xl font-semibold mt-1">76%</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Last 30 days
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Weekday Avg.</h3>
                        <div className="text-2xl font-semibold mt-1">68%</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Monday-Thursday
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium">Weekend Avg.</h3>
                        <div className="text-2xl font-semibold mt-1">89%</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Friday-Sunday
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Occupancy Optimization</CardTitle>
                    <CardDescription>
                      Strategies to improve occupancy rates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="font-medium">Weekday Promotions</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Create targeted weekday promotions to increase occupancy during your lowest demand periods.
                          </p>
                          <Button variant="outline" className="w-full mt-3" onClick={() => {
                            toast({
                              title: "Promotion Created",
                              description: "Weekday promotion has been created",
                            });
                          }}>Create Promotion</Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-green-100 p-2 rounded-full">
                              <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <h3 className="font-medium">Last-minute Deals</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Automatically offer discounted rates for unsold inventory within 72 hours of check-in date.
                          </p>
                          <Button variant="outline" className="w-full mt-3" onClick={() => {
                            toast({
                              title: "Feature Enabled",
                              description: "Last-minute deals have been enabled",
                            });
                          }}>Enable Feature</Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                              <TrendingUp className="h-5 w-5 text-purple-600" />
                            </div>
                            <h3 className="font-medium">Extended Stay Focus</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Optimize pricing for longer stays (7+ nights) to increase overall occupancy.
                          </p>
                          <Button variant="outline" className="w-full mt-3" onClick={() => {
                            toast({
                              title: "Strategy Applied",
                              description: "Extended stay pricing optimization applied",
                            });
                          }}>Apply Strategy</Button>
                        </div>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Low Occupancy Analysis</CardTitle>
                          <CardDescription>Periods with below-average occupancy</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="bg-amber-100 p-2 rounded-full h-fit">
                                <Calendar className="h-5 w-5 text-amber-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">November 15-30, 2023</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Current occupancy: 42% (34% below your average). Consider creating a special 
                                  promotion for this period or adjusting your base rates.
                                </p>
                                <Button variant="link" className="px-0 mt-1 h-6" onClick={() => {
                                  toast({
                                    title: "Rates Adjusted",
                                    description: "Base rates for November 15-30 have been adjusted",
                                  });
                                }}>Adjust Rates</Button>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                              <div className="bg-amber-100 p-2 rounded-full h-fit">
                                <Calendar className="h-5 w-5 text-amber-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Mondays and Tuesdays</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  These days consistently show 28% lower occupancy than other weekdays.
                                  Consider creating a weekday special or business traveler package.
                                </p>
                                <Button variant="link" className="px-0 mt-1 h-6" onClick={() => {
                                  toast({
                                    title: "Package Created",
                                    description: "Business traveler package has been created",
                                  });
                                }}>Create Package</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="guests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Demographics</CardTitle>
                    <CardDescription>
                      Analysis of your guest profiles and behavior
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="h-[200px] flex items-center justify-center border rounded-lg">
                          <div className="text-center">
                            <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm">Guest age distribution</p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>25-34 years</span>
                            <span>38%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>35-44 years</span>
                            <span>32%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>45-54 years</span>
                            <span>18%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Other</span>
                            <span>12%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="h-[200px] flex items-center justify-center border rounded-lg">
                          <div className="text-center">
                            <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm">Guest origin distribution</p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Domestic</span>
                            <span>65%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Europe</span>
                            <span>18%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Asia</span>
                            <span>10%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Other</span>
                            <span>7%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="h-[200px] flex items-center justify-center border rounded-lg">
                          <div className="text-center">
                            <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm">Trip purpose distribution</p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Vacation</span>
                            <span>72%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Business</span>
                            <span>15%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Family Visit</span>
                            <span>8%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Other</span>
                            <span>5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Guest Satisfaction</CardTitle>
                      <CardDescription>
                        Analysis of guest reviews and feedback
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-3xl font-bold">4.8/5</h3>
                            <p className="text-sm text-muted-foreground">Average Rating</p>
                          </div>
                          <div className="text-right">
                            <h4 className="font-medium">Total Reviews</h4>
                            <p className="text-xl">142</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Cleanliness</span>
                              <span>4.9/5</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="bg-propcloud-500 h-full rounded-full" style={{ width: "98%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Location</span>
                              <span>4.7/5</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="bg-propcloud-500 h-full rounded-full" style={{ width: "94%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Value</span>
                              <span>4.6/5</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="bg-propcloud-500 h-full rounded-full" style={{ width: "92%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Communication</span>
                              <span>4.9/5</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="bg-propcloud-500 h-full rounded-full" style={{ width: "98%" }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Recent Feedback Highlights</h3>
                          <div className="space-y-3">
                            <div className="text-sm">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarFallback>MG</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">Michael G.</span>
                              </div>
                              <p className="mt-1 text-muted-foreground italic">
                                "The automated check-in process was incredibly smooth, and the property was exactly as described."
                              </p>
                            </div>
                            <div className="text-sm">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarFallback>SR</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">Sarah R.</span>
                              </div>
                              <p className="mt-1 text-muted-foreground italic">
                                "Communication was excellent. Always got quick responses to my questions."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Guest Behavior Insights</CardTitle>
                      <CardDescription>
                        AI analysis of booking patterns and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-5">
                        <div className="border-l-4 border-propcloud-500 pl-4 py-1">
                          <h3 className="font-medium">Booking Lead Time</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Average booking lead time has shortened to 18 days (was 24 days last quarter).
                            Consider adjusting your last-minute availability strategy.
                          </p>
                        </div>

                        <div className="border-l-4 border-propcloud-500 pl-4 py-1">
                          <h3 className="font-medium">Length of Stay</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Beach Villa guests are staying 1.2 days longer on average than your other properties.
                            Consider analyzing what amenities are driving this trend.
                          </p>
                        </div>

                        <div className="border-l-4 border-propcloud-500 pl-4 py-1">
                          <h3 className="font-medium">Repeat Guests</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            24% of your guests have booked more than once. This is 8% higher than the 
                            industry average, indicating strong guest satisfaction.
                          </p>
                        </div>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Opportunity: Loyalty Program</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Based on your repeat guest rate, implementing a simple loyalty program could 
                              increase direct bookings by an estimated 15-20% and reduce OTA commission costs.
                            </p>
                            <Button className="mt-4" onClick={() => {
                              toast({
                                title: "Loyalty Program",
                                description: "Loyalty program setup has been initiated",
                              });
                            }}>Create Loyalty Program</Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="channels" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Channel Performance</CardTitle>
                        <CardDescription>
                          Compare metrics across booking channels
                        </CardDescription>
                      </div>
                      <Button variant="outline" onClick={() => {
                        toast({
                          title: "Report Generated",
                          description: "Channel performance report has been generated",
                        });
                      }}>Generate Report</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm border-b">
                            <th className="py-3 px-4 font-medium">Channel</th>
                            <th className="py-3 px-4 font-medium">Bookings</th>
                            <th className="py-3 px-4 font-medium">Revenue</th>
                            <th className="py-3 px-4 font-medium">Avg. Stay</th>
                            <th className="py-3 px-4 font-medium">Conversion</th>
                            <th className="py-3 px-4 font-medium">Commission Cost</th>
                            <th className="py-3 px-4 font-medium">Net Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="bg-red-100 w-8 h-8 rounded-full flex items-center justify-center">
                                  <span className="text-red-600 text-xs font-bold">Ab</span>
                                </div>
                                <span>Airbnb</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">42</td>
                            <td className="py-3 px-4">$12,480</td>
                            <td className="py-3 px-4">3.8 nights</td>
                            <td className="py-3 px-4">8.2%</td>
                            <td className="py-3 px-4">$1,872</td>
                            <td className="py-3 px-4">$10,608</td>
                          </tr>
                          <tr className="border-b hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 text-xs font-bold">Bk</span>
                                </div>
                                <span>Booking.com</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">36</td>
                            <td className="py-3 px-4">$9,840</td>
                            <td className="py-3 px-4">4.2 nights</td>
                            <td className="py-3 px-4">7.5%</td>
                            <td className="py-3 px-4">$1,476</td>
                            <td className="py-3 px-4">$8,364</td>
                          </tr>
                          <tr className="border-b hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                                  <span className="text-green-600 text-xs font-bold">Dr</span>
                                </div>
                                <span>Direct Website</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">18</td>
                            <td className="py-3 px-4">$6,300</td>
                            <td className="py-3 px-4">5.1 nights</td>
                            <td className="py-3 px-4">4.3%</td>
                            <td className="py-3 px-4">$0</td>
                            <td className="py-3 px-4">$6,300</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 h-[300px] flex items-center justify-center border rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Channel comparison chart visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Channel Optimization</CardTitle>
                      <CardDescription>
                        Strategies to improve channel performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-propcloud-500 pl-4 py-2">
                          <h3 className="font-medium">Direct Booking Focus</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Direct bookings have a 20% higher net revenue and 0.9 nights longer average stay.
                            Consider investing in direct booking incentives.
                          </p>
                          <Button variant="link" className="px-0 mt-1 h-6" onClick={() => {
                            toast({
                              title: "Campaign Created",
                              description: "Direct booking campaign has been created",
                            });
                          }}>Create Direct Booking Campaign</Button>
                        </div>

                        <div className="border-l-4 border-amber-500 pl-4 py-2">
                          <h3 className="font-medium">Airbnb Listing Optimization</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your Airbnb listing visibility score is 82/100. Optimizing photos and description
                            could improve visibility and conversion rate.
                          </p>
                          <Button variant="link" className="px-0 mt-1 h-6" onClick={() => {
                            toast({
                              title: "Optimization Started",
                              description: "AI will generate optimization suggestions for your Airbnb listings",
                            });
                          }}>Optimize Listing</Button>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4 py-2">
                          <h3 className="font-medium">Booking.com Pricing Strategy</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Booking.com guests are more price-sensitive. Consider a dynamic pricing
                            strategy specific to this channel.
                          </p>
                          <Button variant="link" className="px-0 mt-1 h-6" onClick={() => {
                            toast({
                              title: "Strategy Applied",
                              description: "Channel-specific pricing strategy has been applied",
                            });
                          }}>Apply Strategy</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Future Channel Strategy</CardTitle>
                      <CardDescription>
                        AI recommendations for channel mix
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">Target Channel Mix</h3>
                          <div className="h-[160px] flex items-center justify-center">
                            <div className="text-center">
                              <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                              <p className="text-muted-foreground text-sm">Target channel mix visualization</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Direct Bookings</span>
                              <span>40% (Currently 23%)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Airbnb</span>
                              <span>35% (Currently 42%)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Booking.com</span>
                              <span>25% (Currently 35%)</span>
                            </div>
                          </div>
                        </div>

                        <Button onClick={() => {
                          toast({
                            title: "Strategy Applied",
                            description: "Channel optimization strategy has been applied",
                          });
                        }}>Implement Channel Strategy</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Analytics;
