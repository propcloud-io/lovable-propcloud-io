
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Generate sample data for bookings chart
const generateBookingsData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month) => {
    // Generate realistic booking patterns with seasonality
    let directBase = 15; // Base direct bookings
    let airbnbBase = 28; // Base Airbnb bookings
    let bookingBase = 22; // Base Booking.com bookings
    
    // Summer months (Jun-Aug) have higher bookings overall
    if (month === "Jun" || month === "Jul" || month === "Aug") {
      directBase = 24;
      airbnbBase = 45;
      bookingBase = 38;
    }
    
    // Winter holidays (Dec) has higher bookings
    if (month === "Dec") {
      directBase = 22;
      airbnbBase = 40;
      bookingBase = 32;
    }
    
    // Shoulder seasons (Apr-May, Sep-Oct) have moderate bookings
    if (month === "Apr" || month === "May" || month === "Sep" || month === "Oct") {
      directBase = 18;
      airbnbBase = 35;
      bookingBase = 28;
    }
    
    // Add some randomness
    const direct = Math.max(5, Math.round(directBase + (Math.random() * 10 - 5)));
    const airbnb = Math.max(10, Math.round(airbnbBase + (Math.random() * 16 - 8)));
    const booking = Math.max(8, Math.round(bookingBase + (Math.random() * 12 - 6)));
    
    return {
      month,
      "Direct": direct,
      "Airbnb": airbnb,
      "Booking.com": booking
    };
  });
};

const data = generateBookingsData();

const BookingsChart = () => {
  return (
    <ChartContainer 
      config={{
        "Direct": { color: "#8B5CF6" },
        "Airbnb": { color: "#EC4899" },
        "Booking.com": { color: "#3B82F6" }
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="Direct" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Airbnb" fill="#EC4899" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Booking.com" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BookingsChart;
