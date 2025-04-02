
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const bookings = [
  {
    id: "BOK-8723",
    guest: "Michael Johnson",
    property: "Beachfront Villa",
    checkIn: "2023-10-15",
    checkOut: "2023-10-20",
    status: "confirmed",
    amount: "$1,250",
    source: "Airbnb",
  },
  {
    id: "BOK-8722",
    guest: "Sarah Williams",
    property: "Downtown Apartment",
    checkIn: "2023-10-12",
    checkOut: "2023-10-14",
    status: "confirmed",
    amount: "$450",
    source: "Booking.com",
  },
  {
    id: "BOK-8721",
    guest: "David Brown",
    property: "Mountain Cabin",
    checkIn: "2023-10-20",
    checkOut: "2023-10-25",
    status: "pending",
    amount: "$875",
    source: "Direct",
  },
  {
    id: "BOK-8720",
    guest: "Emily Davis",
    property: "Luxury Penthouse",
    checkIn: "2023-10-18",
    checkOut: "2023-10-22",
    status: "confirmed",
    amount: "$1,800",
    source: "VRBO",
  },
  {
    id: "BOK-8719",
    guest: "Robert Wilson",
    property: "Cozy Cottage",
    checkIn: "2023-10-25",
    checkOut: "2023-10-30",
    status: "pending",
    amount: "$925",
    source: "Airbnb",
  },
];

const RecentBookings = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Overview of latest bookings across all properties</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.guest}</TableCell>
                <TableCell>{booking.property}</TableCell>
                <TableCell>
                  {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>{booking.source}</TableCell>
                <TableCell>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "outline"}
                    className={booking.status === "confirmed" ? "bg-green-500" : "text-orange-500 border-orange-500"}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
