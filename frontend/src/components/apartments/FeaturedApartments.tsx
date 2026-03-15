// import { useSelector } from "react-redux";
// import { useEffect, useRef } from "react";
// import ApartmentCard from "./ApartmentCard";
// // import useIsMobile from "../../hooks/useIsMobile";
// import type { Apartment } from "../../types/apartment";
// // import { useAllApartments } from "../../hooks/useAllApartments";
// // import { useApartmentsByCategory } from "../../hooks/useApartmentsByCategory";
// import Loader from "../ui/Loader";

// type FeaturedApartmentsProps = {
//   mode: "home" | "category";
//   data: any;
//   isLoading: boolean;
//   error: any;
//   fetchNextPage?: () => void;
//   hasNextPage?: boolean;
//   isFetchingNextPage?: boolean;
//   // category: string;
//   offset?: number;
//   limit?: number;
//   // source?: "home" | "category";
//   onCountChange?: (count: number) => void;
// };

// export default function FeaturedApartments({
//   mode,
//   data,
//   isLoading,
//   error,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
//   // category,
//   offset,
//   limit,
//   // source,
//   onCountChange,
// }: FeaturedApartmentsProps) {
//   // const isMobile = useIsMobile();
//   const searchTerm = useSelector((state: any) => state.search.searchTerm);

//   const loaderRef = useRef<HTMLDivElement | null>(null);


//   // NORMALIZE DATA
//   let apartments: Apartment[] = [];

//   if (mode === "home") {
//     const pages = data?.pages ?? [];
//     apartments = pages.flatMap((p: any) => p.items);
//   }

//   if (mode === "category") {
//     apartments = data ?? [];
//   }

//   // SEARCH FILTER
//   const searchFiltered = apartments.filter((apt) => {
//     const q = searchTerm.toLowerCase();

//     // if (isMobile) {
//     //   return apt.name.toLowerCase().includes(q);
//     // }

//     return (
//       apt.name?.toLowerCase().includes(q) ||
//       apt.location?.toLowerCase().includes(q) ||
//       apt.category?.toLowerCase().includes(q) ||
//       apt.tags?.some((tag) => tag.toLowerCase().includes(q) ?? false)
//       // if tags is undefined, some will return undefined, so we use ?? false to treat it as false
//     );
//   });

//   // UPDATE RESULT COUNT
//   useEffect(() => {
//     onCountChange?.(searchFiltered.length);
//   }, [searchFiltered.length, onCountChange]);

//   // SORT — po ratingu (najbolji prvi)
//   let sorted = [...searchFiltered].sort((a, b) => b.rating - a.rating);

//   // OFFSET / LIMIT
//   if (offset) sorted = sorted.slice(offset);
//   if (limit) sorted = sorted.slice(0, limit);

//   // INFINITE SCROLL OBSERVER (only for Home)
//   useEffect(() => {
//     if (mode !== "home") return;
//     if (!fetchNextPage) return;
//     if (!loaderRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           hasNextPage &&
//           !isFetchingNextPage &&
//           fetchNextPage
//         ) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 0.1, rootMargin: "200px" },
//       // trigger when 10% of the loader is visible, and start loading before the user reaches the loader
//       // (preload when it's within 200px of the viewport)
//     );

//     observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [mode, fetchNextPage, hasNextPage, isFetchingNextPage]);

  
//   if (isLoading) return <Loader />;
//   if (error) return <p>Failed to load apartments</p>;

//   return (
//     <>
//       {sorted.map((apt) => (
//         <ApartmentCard key={apt.id} apartment={apt} highlight={searchTerm} />
//       ))}

//       {/* Infinite scroll sentinel (only for Home) */}
//       {mode === "home" && sorted.length > 0 && (
//         <>
//           <div ref={loaderRef} style={{ height: "60px" }} />
//           {isFetchingNextPage && <p>Loading more...</p>}
//         </>
//       )}
//     </>
//   );
// }


import ApartmentCard from "./ApartmentCard";
import type { Apartment } from "../../types/apartment";

type FeaturedApartmentsProps = {
  apartments: Apartment[];
  highlight: string;
};

export default function FeaturedApartments({ apartments, highlight }: FeaturedApartmentsProps) {
  return (
    <>
      {apartments.map((apt) => (
        <ApartmentCard key={apt.id} apartment={apt} highlight={highlight} />
      ))}
    </>
  );
}
