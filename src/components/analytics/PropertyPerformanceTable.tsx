
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for property performance
const properties = [
  { 
    name: "Seaside Villa", 
    location: "Malibu, CA", 
    occupancy: 92, 
    revenue: 24850, 
    adr: 275, 
    rating: 4.9,
    trend: "up" 
  },
  { 
    name: "Mountain Cabin", 
    location: "Aspen, CO", 
    occupancy: 84, 
    revenue: 18600, 
    adr: 210, 
    rating: 4.7,
    trend: "up" 
  },
  { 
    name: "Downtown Loft", 
    location: "New York, NY", 
    occupancy: 88, 
    revenue: 21200, 
    adr: 245, 
    rating: 4.6,
    trend: "stable" 
  },
  { 
    name: "Lakefront House", 
    location: "Lake Tahoe, NV", 
    occupancy: 78, 
    revenue: 16400, 
    adr: 195, 
    rating: 4.8,
    trend: "up" 
  },
  { 
    name: "Garden Apartment", 
    location: "San Francisco, CA", 
    occupancy: 72, 
    revenue: 12800, 
    adr: 180, 
    rating: 4.5,
    trend: "down" 
  },
  { 
    name: "Beachfront Condo", 
    location: "Miami, FL", 
    occupancy: 86, 
    revenue: 19500, 
    adr: 225, 
    rating: 4.7,
    trend: "stable" 
  }
];

const PropertyPerformanceTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Occupancy</TableHead>
          <TableHead>Monthly Revenue</TableHead>
          <TableHead>ADR</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Trend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.name}>
            <TableCell className="font-medium">{property.name}</TableCell>
            <TableCell>{property.location}</TableCell>
            <TableCell>{property.occupancy}%</TableCell>
            <TableCell>${property.revenue.toLocaleString()}</TableCell>
            <TableCell>${property.adr}</TableCell>
            <TableCell>{property.rating}</TableCell>
            <TableCell>
              <Badge variant={
                property.trend === "up" ? "success" : 
                property.trend === "down" ? "destructive" : "secondary"
              }>
                {property.trend === "up" ? "↑ Up" : 
                 property.trend === "down" ? "↓ Down" : "→ Stable"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropertyPerformanceTable;
