import { useInfiniteQuery } from "@tanstack/react-query";
import { getTopRatedApartments } from "../services/apartmentsService";

const PAGE_SIZE = 10;

// export function useTopRatedApartments() {
//   return useInfiniteQuery({
//     queryKey: ["top-rated-apartments"],

//     queryFn: ({ pageParam = 0 }) =>
//       getTopRatedApartments(pageParam, PAGE_SIZE),

//     getNextPageParam: (lastPage) => {
//       const loaded = (lastPage.page + 1) * lastPage.pageSize;
//       if (loaded >= lastPage.total) return undefined;
//       return lastPage.page + 1;
//     },

//     initialPageParam: 0,
//     staleTime: 0
//   });
// }

export function useTopRatedApartments() {
  return useInfiniteQuery({
    queryKey: ["top-rated-apartments"],

    queryFn: ({ pageParam = 0 }) => getTopRatedApartments(pageParam, PAGE_SIZE),

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * PAGE_SIZE;
      if (loaded >= lastPage.total) return undefined;
      return allPages.length;
    },

    // Infinite scroll must have control over pagination and when to fetch the next page, so we disable automatic refetching on mount, focus, and reconnect.
    // The data is considered fresh indefinitely, so it won't be refetched unless we explicitly call fetchNextPage.
    // This way, we avoid unnecessary network requests and keep the data available without refetching on every mount or focus.
    // We don't want to refetch the top-rated apartments on every mount or focus, because they don't change that often and we want to avoid unnecessary network requests.
    // So we set these options to prevent unnecessary refetches and keep the data fresh indefinitely.
    refetchOnMount: false, // don't refetch when the component mounts if we already have data
    refetchOnWindowFocus: false, // don't refetch when the window regains focus
    refetchOnReconnect: false, // don't refetch when the browser reconnects to the internet
    staleTime: Infinity, // data is always fresh, never stale
    // refetch means re-running the query function to get fresh data from the server.
    // By setting these options to false and staleTime to Infinity, we're telling React Query that the top-rated apartments data
    // doesn't need to be refetched automatically, and it can be considered fresh indefinitely.
    // This is useful for data that doesn't change frequently and doesn't need to be updated in real-time.
    // It helps reduce unnecessary network requests and improves performance by keeping the cached data available without refetching
    // on every mount or focus.

    // Fetch fresh data every 5 minutes:
    // refetchInterval: 5 * 60 * 1000, // 5 min
    // refetchIntervalInBackground: true,
    // - if we use this, 1st page is loaded immediately, then next pages are loaded on demand when fetchNextPage is called 
    // (e.g. when the user scrolls to the bottom of the list). But then all pages are loaded automatically if data is still in cache, which is not what we want for infinite scroll. 
    // So we disable automatic refetching and only fetch next page when fetchNextPage is called.
  });
}
