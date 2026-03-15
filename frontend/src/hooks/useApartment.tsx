import { useQuery } from "@tanstack/react-query";
import { getApartmentById } from "../services/apartmentsService";

export function useApartment(id: number) {
  return useQuery({
    queryKey: ["apartment", id],
    queryFn: () => getApartmentById(id),
    staleTime: 1000 * 60 * 30
  });
}