// import axios from "axios";
// import dotenv from "dotenv";
import { APARTMENTS } from "../utils/apartments.ts";

// dotenv.config();

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

// not used here:
const CATEGORIES = [
  "Apartments",
  "Studio",
  "Houses",
  "Camping",
  "Glamping",
  "Hotels",
];


let cache: Apartment[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 1000 * 60 * 10;     // 10 min


// Fetch all apartments:

export function fetchAllApartments(): Apartment[] {
  const now = Date.now();

  if (cache && now - cacheTime < CACHE_TTL) {
    return cache;
  }

  cache = APARTMENTS;
  cacheTime = now;

  return APARTMENTS;
}

// Fetch by category:

export function fetchApartmentsByCategory(category: string): Apartment[] {
  const all = fetchAllApartments();
  return all.filter((apt) => apt.category === category);
}

// Fetch by ID:

export function fetchApartmentById(id: number): Apartment | undefined {
  const all = fetchAllApartments();
  return all.find((apt) => apt.id === id);
}

// Search (optional):

export function searchApartments(query: string): Apartment[] {
  const all = fetchAllApartments();
  const q = query.toLowerCase();

  return all.filter(
    (apt) =>
      apt.name.toLowerCase().includes(q) ||
      apt.location.toLowerCase().includes(q) ||
      apt.category.toLowerCase().includes(q) ||
      apt.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}

