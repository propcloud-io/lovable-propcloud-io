
import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, User, ExternalLink, Calendar as CalendarIcon, MessagesSquare, Mail } from "lucide-react";
import { format } from "date-fns";

const Bookings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  const upcomingBookings = [
    {
      id: 1,
      guest: "John Smith",
      property: "Beach Villa",
      checkIn: "Oct 25, 2023",
      checkOut: "Oct 30, 2023",
      guests: 3,
      amount: "$1,240",
      source: "Airbnb",
      status: "confirmed"
    },
    {
      id: 2,
      guest: "Maria Garcia",
      property: "Downtown Apartment",
      checkIn: "Nov 2, 2023",
      checkOut: "Nov 5, 2023",
      guests: 2,
      amount: "$680",
      source: "Direct",
      status: "confirmed"
    },
    {
      id: 3,
      guest: "Robert Johnson",
      property: "Mountain Cabin",
      checkIn: "Nov 8, 2023",
      checkOut: "Nov 15, 2023",
      guests: 4,
      amount: "$1,960",
      source: "Booking.com",
      status: "pending"
    },
  ];

  const handleBookingDetails = (bookingId: number) => {
    toast({
      title: "Booking Details",
      description: `Viewing details for booking #${bookingId}`,
    });
  };

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Created",
      description: "New booking has been added successfully",
    });
    setBookingDialogOpen(false);
  };

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
                  <CardTitle>Bookings Management</CardTitle>
                  <CardDescription>
                    Centralized dashboard for tracking and managing all your property bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      Welcome to your Bookings Hub! Here you can track all your reservations across 
                      channels, manage calendar availability, and handle guest communications in one place.
                      The AI automatically syncs bookings from all connected platforms.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          toast({
                            title: "Tour Started",
                            description: "Let's explore the Bookings features",
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

            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Bookings</h1>
              <Button onClick={() => setBookingDialogOpen(true)}>
                Add Booking
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="past">Past Bookings</TabsTrigger>
                <TabsTrigger value="channels">Booking Channels</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <CardDescription>
                      Manage your confirmed and pending reservations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="py-3 px-4 font-medium">Guest</th>
                            <th className="py-3 px-4 font-medium">Property</th>
                            <th className="py-3 px-4 font-medium">Check-in</th>
                            <th className="py-3 px-4 font-medium">Check-out</th>
                            <th className="py-3 px-4 font-medium">Guests</th>
                            <th className="py-3 px-4 font-medium">Amount</th>
                            <th className="py-3 px-4 font-medium">Source</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upcomingBookings.map((booking) => (
                            <tr key={booking.id} className="border-b hover:bg-slate-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{booking.guest.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                  </Avatar>
                                  <span>{booking.guest}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{booking.property}</td>
                              <td className="py-3 px-4">{booking.checkIn}</td>
                              <td className="py-3 px-4">{booking.checkOut}</td>
                              <td className="py-3 px-4">{booking.guests}</td>
                              <td className="py-3 px-4">{booking.amount}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">
                                    {booking.source}
                                  </Badge>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant={booking.status === "confirmed" ? "success" : "secondary"}>
                                  {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleBookingDetails(booking.id)}
                                  >
                                    Details
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      toast({
                                        title: "Message Sent",
                                        description: `AI has sent a pre-arrival message to ${booking.guest}`,
                                      });
                                    }}
                                  >
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Check-ins</CardTitle>
                      <CardDescription>Next 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingBookings.filter(b => b.checkIn === "Oct 25, 2023").map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">{booking.guest}</p>
                              <p className="text-sm text-muted-foreground">{booking.property}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <CalendarCheck className="h-3 w-3 text-propcloud-600" />
                                <span className="text-xs">{booking.checkIn}</span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Check-in Instructions",
                                  description: `AI has sent check-in instructions to ${booking.guest}`,
                                });
                              }}
                            >
                              Send Instructions
                            </Button>
                          </div>
                        ))}
                        <Button variant="link" className="w-full" size="sm">View All Check-ins</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Check-outs</CardTitle>
                      <CardDescription>Next 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Sarah Wilson</p>
                            <p className="text-sm text-muted-foreground">Beach Villa</p>
                            <div className="flex items-center gap-1 mt-1">
                              <CalendarCheck className="h-3 w-3 text-propcloud-600" />
                              <span className="text-xs">Today</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Checkout Reminder",
                                description: "AI has sent a checkout reminder to Sarah Wilson",
                              });
                            }}
                          >
                            Send Reminder
                          </Button>
                        </div>
                        <Button variant="link" className="w-full" size="sm">View All Check-outs</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Booking Activity</CardTitle>
                      <CardDescription>Latest activity across channels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>New Booking</span>
                            <Badge>Airbnb</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Robert Johnson booked Mountain Cabin</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Cancellation</span>
                            <Badge variant="destructive">Booking.com</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Emily Davis cancelled Downtown Apartment</p>
                          <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Modification</span>
                            <Badge variant="outline">Direct</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Maria Garcia changed dates for Beach Villa</p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Booking Calendar</CardTitle>
                        <CardDescription>
                          View and manage your property availability
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
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-2">
                        {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                      </h3>
                      
                      {selectedDate && selectedDate.getDate() === 25 && selectedDate.getMonth() === 9 ? (
                        <div className="border rounded-md p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>JS</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">John Smith</p>
                                <p className="text-sm text-muted-foreground">Beach Villa • Check-in</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Instructions Sent",
                                    description: "Check-in instructions sent to John Smith",
                                  });
                                }}
                              >
                                Send Instructions
                              </Button>
                              <Button 
                                variant="ghost"
                                size="sm"
                                onClick={() => handleBookingDetails(1)}
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No bookings for this date</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Block Dates</CardTitle>
                      <CardDescription>Block availability for maintenance or personal use</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="block-property">Property</Label>
                          <Select defaultValue="beach">
                            <SelectTrigger id="block-property">
                              <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beach">Beach Villa</SelectItem>
                              <SelectItem value="downtown">Downtown Apartment</SelectItem>
                              <SelectItem value="mountain">Mountain Cabin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="from-date">From</Label>
                            <Input id="from-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="to-date">To</Label>
                            <Input id="to-date" type="date" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="block-reason">Reason</Label>
                          <Select defaultValue="maintenance">
                            <SelectTrigger id="block-reason">
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="personal">Personal Use</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full" onClick={() => {
                          toast({
                            title: "Dates Blocked",
                            description: "The selected dates have been blocked on your calendar",
                          });
                        }}>Block Dates</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Sync Calendars</CardTitle>
                      <CardDescription>Sync with external booking platforms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-red-100 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-red-600 text-xs font-bold">Ab</span>
                            </div>
                            <span>Airbnb</span>
                          </div>
                          <Badge variant="outline" className="text-green-600 bg-green-50">Synced</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 text-xs font-bold">Bk</span>
                            </div>
                            <span>Booking.com</span>
                          </div>
                          <Badge variant="outline" className="text-green-600 bg-green-50">Synced</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 text-xs font-bold">Vb</span>
                            </div>
                            <span>VRBO</span>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => {
                            toast({
                              title: "Connection Started",
                              description: "Follow the instructions to connect your VRBO account",
                            });
                          }}>Connect</Button>
                        </div>
                        <Button variant="link" className="w-full" size="sm">Manage Calendar Connections</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Booking Rules</CardTitle>
                      <CardDescription>Set rules for automatic approvals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="min-nights">Minimum Nights</Label>
                          <Input id="min-nights" type="number" defaultValue="2" />
                        </div>
                        <div>
                          <Label htmlFor="max-guests">Maximum Guests</Label>
                          <Input id="max-guests" type="number" defaultValue="6" />
                        </div>
                        <div>
                          <Label htmlFor="advance-days">Advance Booking Days</Label>
                          <Input id="advance-days" type="number" defaultValue="90" />
                        </div>
                        <Button className="w-full" onClick={() => {
                          toast({
                            title: "Rules Updated",
                            description: "Your booking rules have been updated",
                          });
                        }}>Save Rules</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Past Bookings</CardTitle>
                    <CardDescription>
                      Review your historical bookings and guest data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="py-3 px-4 font-medium">Guest</th>
                            <th className="py-3 px-4 font-medium">Property</th>
                            <th className="py-3 px-4 font-medium">Dates</th>
                            <th className="py-3 px-4 font-medium">Guests</th>
                            <th className="py-3 px-4 font-medium">Amount</th>
                            <th className="py-3 px-4 font-medium">Source</th>
                            <th className="py-3 px-4 font-medium">Review</th>
                            <th className="py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              id: 101,
                              guest: "Emma Johnson",
                              property: "Beach Villa",
                              dates: "Sept 18-23, 2023",
                              guests: 4,
                              amount: "$1,480",
                              source: "Airbnb",
                              review: "5/5"
                            },
                            {
                              id: 102,
                              guest: "Michael Chen",
                              property: "Downtown Apartment",
                              dates: "Sept 10-15, 2023",
                              guests: 2,
                              amount: "$860",
                              source: "Booking.com",
                              review: "4/5"
                            },
                            {
                              id: 103,
                              guest: "Sophia Rodriguez",
                              property: "Mountain Cabin",
                              dates: "Aug 28-Sept 4, 2023",
                              guests: 6,
                              amount: "$2,240",
                              source: "Direct",
                              review: "5/5"
                            },
                          ].map((booking) => (
                            <tr key={booking.id} className="border-b hover:bg-slate-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{booking.guest.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                  </Avatar>
                                  <span>{booking.guest}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{booking.property}</td>
                              <td className="py-3 px-4">{booking.dates}</td>
                              <td className="py-3 px-4">{booking.guests}</td>
                              <td className="py-3 px-4">{booking.amount}</td>
                              <td className="py-3 px-4">
                                <Badge variant="outline">
                                  {booking.source}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">{booking.review}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleBookingDetails(booking.id)}
                                  >
                                    Details
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "Follow-up Sent",
                                        description: `Follow-up message sent to ${booking.guest}`,
                                      });
                                    }}
                                  >
                                    Follow-up
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Guest Insights</CardTitle>
                    <CardDescription>
                      AI-generated insights about your past guests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">Repeat Guests</h3>
                          <div className="text-2xl font-semibold mb-2">24%</div>
                          <p className="text-sm text-muted-foreground">
                            Of your guests have booked more than once
                          </p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">Average Stay</h3>
                          <div className="text-2xl font-semibold mb-2">4.3 nights</div>
                          <p className="text-sm text-muted-foreground">
                            Average length of stay across properties
                          </p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">Top Source</h3>
                          <div className="text-2xl font-semibold mb-2">Airbnb</div>
                          <p className="text-sm text-muted-foreground">
                            42% of your bookings come from Airbnb
                          </p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-4">Guest Recommendations</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <User className="h-5 w-5 mt-1 text-propcloud-600" />
                            <div>
                              <p className="font-medium">Target returning guests for direct bookings</p>
                              <p className="text-sm text-muted-foreground">
                                12 past guests show patterns suggesting they'd book directly with a 10% discount.
                              </p>
                              <Button variant="link" size="sm" className="px-0 h-6" onClick={() => {
                                toast({
                                  title: "Campaign Created",
                                  description: "Direct booking campaign created for returning guests",
                                });
                              }}>
                                Create Campaign
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <User className="h-5 w-5 mt-1 text-propcloud-600" />
                            <div>
                              <p className="font-medium">Adjust minimum stay for weekends</p>
                              <p className="text-sm text-muted-foreground">
                                Weekend bookings have a 30% higher cancellation rate with short stays.
                              </p>
                              <Button variant="link" size="sm" className="px-0 h-6" onClick={() => {
                                toast({
                                  title: "Rule Updated",
                                  description: "Weekend minimum stay updated to 2 nights",
                                });
                              }}>
                                Update Rule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="channels" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Connected Channels</CardTitle>
                        <CardDescription>
                          Manage your booking channel distribution
                        </CardDescription>
                      </div>
                      <Button onClick={() => {
                        toast({
                          title: "Add Channel",
                          description: "Select a new channel to connect with your properties",
                        });
                      }}>
                        Add Channel
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-red-50 p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-white rounded-full p-2">
                              <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center">
                                <span className="text-red-600 text-xs font-bold">Ab</span>
                              </div>
                            </div>
                            <h3 className="font-medium">Airbnb</h3>
                          </div>
                          <Badge variant="success">Connected</Badge>
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="flex justify-between text-sm">
                            <span>Properties Listed:</span>
                            <span>3/3</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Bookings (30 days):</span>
                            <span>12</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Revenue (30 days):</span>
                            <span>$4,860</span>
                          </div>
                          <div className="pt-2">
                            <Button variant="outline" size="sm" className="w-full flex items-center gap-2" onClick={() => {
                              toast({
                                title: "Channel Settings",
                                description: "Viewing Airbnb channel settings",
                              });
                            }}>
                              <span>Manage</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-blue-50 p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-white rounded-full p-2">
                              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-xs font-bold">Bk</span>
                              </div>
                            </div>
                            <h3 className="font-medium">Booking.com</h3>
                          </div>
                          <Badge variant="success">Connected</Badge>
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="flex justify-between text-sm">
                            <span>Properties Listed:</span>
                            <span>2/3</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Bookings (30 days):</span>
                            <span>8</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Revenue (30 days):</span>
                            <span>$3,240</span>
                          </div>
                          <div className="pt-2">
                            <Button variant="outline" size="sm" className="w-full flex items-center gap-2" onClick={() => {
                              toast({
                                title: "Channel Settings",
                                description: "Viewing Booking.com channel settings",
                              });
                            }}>
                              <span>Manage</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden border-dashed border-muted-foreground/30">
                        <div className="bg-slate-50 p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-white rounded-full p-2">
                              <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center">
                                <span className="text-slate-600 text-xs font-bold">+</span>
                              </div>
                            </div>
                            <h3 className="font-medium text-muted-foreground">Connect New Channel</h3>
                          </div>
                        </div>
                        <div className="p-4 space-y-2 flex flex-col items-center justify-center h-[172px]">
                          <p className="text-sm text-muted-foreground text-center">
                            Connect additional booking channels to expand your reach
                          </p>
                          <Button onClick={() => {
                            toast({
                              title: "Connect Channel",
                              description: "Choose a channel to connect with your properties",
                            });
                          }}>Add Channel</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Channel Performance</CardTitle>
                      <CardDescription>
                        Compare performance across your connected booking channels
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Channel performance chart visualization</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Channel Management</CardTitle>
                      <CardDescription>
                        Configure how your properties appear on each channel
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">Pricing Rules</h3>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="same">
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select rule" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="same">Same Across All</SelectItem>
                                <SelectItem value="airbnb">Airbnb +10%</SelectItem>
                                <SelectItem value="booking">Booking.com +8%</SelectItem>
                                <SelectItem value="custom">Custom Rules</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={() => {
                              toast({
                                title: "Pricing Rules",
                                description: "Updated pricing rules across all channels",
                              });
                            }}>Apply</Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium">Availability Rules</h3>
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="all">
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select rule" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Channels</SelectItem>
                                <SelectItem value="limited">Limited on Booking.com</SelectItem>
                                <SelectItem value="direct">Direct Priority</SelectItem>
                                <SelectItem value="custom">Custom Rules</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={() => {
                              toast({
                                title: "Availability Rules",
                                description: "Updated availability rules across all channels",
                              });
                            }}>Apply</Button>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button onClick={() => {
                            toast({
                              title: "Settings Saved",
                              description: "Channel management settings have been updated",
                            });
                          }}>Save All Settings</Button>
                        </div>
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

      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent>
          <form onSubmit={handleAddBooking}>
            <DialogHeader>
              <DialogTitle>Add New Booking</DialogTitle>
              <DialogDescription>
                Add a manual booking to your calendar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="property">Property</Label>
                  <Select defaultValue="beach">
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beach">Beach Villa</SelectItem>
                      <SelectItem value="downtown">Downtown Apartment</SelectItem>
                      <SelectItem value="mountain">Mountain Cabin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="source">Booking Source</Label>
                  <Select defaultValue="direct">
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">Direct Booking</SelectItem>
                      <SelectItem value="airbnb">Airbnb</SelectItem>
                      <SelectItem value="booking">Booking.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guest-name">Guest Name</Label>
                <Input id="guest-name" placeholder="Enter guest name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="check-in">Check-in Date</Label>
                  <Input id="check-in" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="check-out">Check-out Date</Label>
                  <Input id="check-out" type="date" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input id="guests" type="number" min="1" defaultValue="2" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Total Price</Label>
                  <Input id="price" type="text" placeholder="$0.00" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setBookingDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Booking</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bookings;
