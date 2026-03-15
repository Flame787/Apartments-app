import { useQuery } from "@tanstack/react-query";
import { getApartmentsByCategory } from "../services/apartmentsService";

export function useApartmentsByCategory(category: string | null){
    return useQuery({
        queryKey: ["apartments-category", category],
        queryFn: () => getApartmentsByCategory(category!),
        enabled: !!category,          // dependency: not running if no category selected
        staleTime: 1000 * 60 * 30    // 30 min cache available
    })
}