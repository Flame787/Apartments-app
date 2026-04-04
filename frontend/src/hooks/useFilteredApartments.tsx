import { useQuery } from "@tanstack/react-query";
import { getFilteredApartments } from "../services/apartmentsService";
import type { FilteredSearchState } from "../store/filteredSearchSlice";

// type Filters = {
//   destination?: string;
//   persons?: string;
//   priceRange?: [number, number];
//   accommodation?: string;
//   toggles?: Record<string, boolean>;
// };

export function useFilteredApartments(
  filters: FilteredSearchState,
//   searchTriggered: boolean,
) {
  const hasSearchTerm = !!filters.globalSearch;

  const hasFilters =
    !!filters.destination ||
    !!filters.persons ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 500 ||
    !!filters.accommodation ||
    Object.keys(filters.toggles).length > 0;

  const isFiltering = hasSearchTerm || hasFilters;

  return useQuery({
    queryKey: ["filtered-apartments", filters.globalSearch, filters],
    queryFn: () => getFilteredApartments(filters),
    enabled: isFiltering,
    // query starts only if searchTriggered = true and if there is either a global search term or at least one filter applied
  });
}
