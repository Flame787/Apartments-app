import { useQuery } from "@tanstack/react-query";
import { getFilteredApartments } from "../services/apartmentsService";

type Filters = {
  destination?: string;
  persons?: string;
  priceRange?: [number, number];
  accommodation?: string;
  toggles?: Record<string, boolean>;
};


export function useFilteredApartments(filters: Filters, searchTriggered: boolean) {
  return useQuery({
    queryKey: ["filtered-apartments", filters],
    queryFn: () => getFilteredApartments(filters),
    enabled: searchTriggered,    // query starts only if searchTriggered = true
  });
}
