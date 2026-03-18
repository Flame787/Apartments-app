// import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllApartments } from "../services/apartmentsService";

// export function useAllApartments(){
//     return useQuery({
//         queryKey: ["all-apartments"],
//         queryFn: getAllApartments,
//         staleTime: 1000 * 60 * 30    // 30 min cache available
//     })
// }

const PAGE_SIZE = 10;

// export function useAllApartments() {
//   return useInfiniteQuery({
//     queryKey: ["all-apartments"],

//     queryFn: ({ pageParam = 0 }) =>
//       getAllApartments(pageParam, PAGE_SIZE),

//     initialPageParam: 0,

//     getNextPageParam: (lastPage, allPages) => {
//       const loaded = allPages.length * PAGE_SIZE;
//       if (loaded >= lastPage.total) return null;
//       return allPages.length;
//     },

//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     staleTime: Infinity,

//     // optional: refresh every 5 min
//     // refetchInterval: 5 * 60 * 1000,
//     // refetchIntervalInBackground: true,
//   });
// }

export function useAllApartments(allAtOnce = false) {
  return useInfiniteQuery({
    queryKey: ["all-apartments", allAtOnce],

    queryFn: ({ pageParam = 0 }) =>
      getAllApartments(pageParam, allAtOnce ? 9999 : PAGE_SIZE),

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (allAtOnce) return null;       // STOP infinite scroll

      const loaded = allPages.length * PAGE_SIZE;
      if (loaded >= lastPage.total) return null;

      return allPages.length;
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}
