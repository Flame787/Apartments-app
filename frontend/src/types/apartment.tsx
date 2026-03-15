export type Apartment = {
  id: number;
  name: string;
  location: string;
  category: string;
  description: string;
  images: string[];
  size_m2: number;
  tags: string[];
  price_per_night: number;
  max_guests: number;
  availability: string;
  rating: number;
  reviews_count: number;
};
