export enum PropertyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  ARCHIVED = 'archived'
}

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  VILLA = 'villa',
  CONDO = 'condo',
  OTHER = 'other'
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'essential' | 'comfort' | 'safety' | 'outdoor' | 'special';
  icon?: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  amenities: Amenity[];
  images: PropertyImage[];
  basePrice: number;
  currency: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  cleaningFee?: number;
  otaListings: {
    airbnb?: { id: string; url: string; };
    booking?: { id: string; url: string; };
    vrbo?: { id: string; url: string; };
  };
  createdAt: Date;
  updatedAt: Date;
  rules?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  minimumStay?: number;
  cancellationPolicy?: string;
}
