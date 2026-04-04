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
const CACHE_TTL = 1000 * 60 * 10; // 10 min


/************* Helper-functions -> will be exported to apartmentsRoutes.ts, to build the API-routes: ****************/


// Fetch all apartments (from cache or new request):

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
  // filtering all apartments by category (returning if they match the category):
  return all.filter((apt) => apt.category === category);
}

// Fetch by ID:

export function fetchApartmentById(id: number): Apartment | undefined {
  const all = fetchAllApartments();
  // finding a specific apartment by matching id:
  return all.find((apt) => apt.id === id);
}

// Search (if a searchTerm is provided):

export function searchApartments(query: string): Apartment[] {
  const all = fetchAllApartments();
  const q = query.toLowerCase();
// filtering apartments by searchTerm, if it's included in name, location, category or tags:
  return all.filter(
    (apt) =>
      apt.name.toLowerCase().includes(q) ||
      apt.location.toLowerCase().includes(q) ||
      apt.category.toLowerCase().includes(q) ||
      apt.tags.some((tag) => tag.toLowerCase().includes(q)),   // not sure if needed here, because on HomePage tags are not displayed.
  );
}
