export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
  };
  images: string[];
  status: 'available' | 'pending' | 'sold';
  propertyType: 'house' | 'apartment' | 'land' | 'commercial';
  amenities: string[];
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  propertyType?: string;
  location?: string;
  searchQuery?: string;
}

export interface PropertyStats {
  totalListings: number;
  pendingApprovals: number;
  totalViews: number;
  averagePrice: number;
}