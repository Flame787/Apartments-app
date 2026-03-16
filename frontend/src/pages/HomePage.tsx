import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchTerm } from "../store/searchSlice";

// import { clearFilteredSearch } from "../store/filteredSearchSlice";

import TopRatedWidget from "../components/apartments/TopRatedWidget";
import FeaturedApartments from "../components/apartments/FeaturedApartments";
import { useAllApartments } from "../hooks/useAllApartments";

import useIsMobile from "../hooks/useIsMobile";
import ApartmentCard from "../components/apartments/ApartmentCard";

type SelectedMobileView = "Featured" | "Latest";

export default function HomePage() {
  const homeQuery = useAllApartments(); // infinite scroll hook to fetch all apartments page by page

  const searchTerm = useSelector((s: any) => s.search.searchTerm);

  // new filtered search from SearchFilters component:
  const filters = useSelector((s: any) => s.filteredSearch);

  const { searchTriggered } = useSelector((s: any) => s.filteredSearch);

  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const [selectedMobileView, setSelectedMobileView] =
    useState<SelectedMobileView>("Featured");

  const loaderRef = useRef(null);

  // Flatten all pages
  const pages = homeQuery.data?.pages ?? [];
  const allApartments = pages.flatMap((p) => p.items);

  // SEARCH FILTER
  const searchTermFiltered = allApartments.filter((apt) => {
    const q = searchTerm?.toLowerCase() ?? "";
    if (!q) return true;
    return (
      apt.name.toLowerCase().includes(q) ||
      apt.location.toLowerCase().includes(q) ||
      apt.category.toLowerCase().includes(q) ||
      apt.tags.some((tag: any) => tag.toLowerCase().includes(q))
    );
  });

  // NEW FILTERED SEARCH

  const fullyFiltered = searchTermFiltered.filter((apt) => {
    // DESTINATION
    if (filters.destination) {
      const q = filters.destination.toLowerCase();
      if (
        !apt.name.toLowerCase().includes(q) &&
        !apt.location.toLowerCase().includes(q) &&
        !apt.category.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    // PERSONS
    if (filters.persons) {
      if (apt.max_guests < Number(filters.persons)) return false;
    }

    // PRICE RANGE
    if (
      apt.price_per_night < filters.priceRange[0] ||
      apt.price_per_night > filters.priceRange[1]
    ) {
      return false;
    }

    // ACCOMMODATION TYPE
    if (filters.accommodation) {
      if (apt.category.toLowerCase() !== filters.accommodation.toLowerCase()) {
        return false;
      }
    }

    // TOGGLES (amenities → ali ti ih NEMAŠ → koristiš tags!)
    for (const key in filters.toggles) {
      if (filters.toggles[key] === true) {
        const tags = apt.tags?.map((t: string) => t.toLowerCase()) ?? [];
        if (!tags.includes(key.toLowerCase())) return false;
      }
    }

    return true;
  });

  // Sort
  const sorted = [...fullyFiltered].sort((a, b) => b.rating - a.rating);

  useEffect(() => {
    if (searchTriggered) {
      console.log("SEARCH RESULTS:", sorted);
    }
  }, [sorted, searchTriggered]);

  // Result count
  const [resultsCount, setResultsCount] = useState<number | null>(null);

  useEffect(() => {
    setResultsCount(sorted.length);
  }, [sorted.length]);

  // Infinite scroll sentinel
  useEffect(() => {
    if (!loaderRef.current) return;
    if (!homeQuery.fetchNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          homeQuery.hasNextPage &&
          !homeQuery.isFetchingNextPage
        ) {
          homeQuery.fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [homeQuery.hasNextPage, homeQuery.isFetchingNextPage]);

  // Placeholder component for empty states
  function ApartmentPlaceholder() {
    return <div className="apartment-placeholder"></div>;
  }

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div className="homepage-mobile">
        {/* Toggle */}
        <div className="apartments-mobile-buttons">
          <button
            className={`button-featured ${
              selectedMobileView === "Featured" ? "active" : ""
            }`}
            onClick={() => {
              dispatch(clearSearchTerm());
              setSelectedMobileView("Featured");
            }}
          >
            Featured
          </button>

          <button
            className={`button-latest ${
              selectedMobileView === "Latest" ? "active" : ""
            }`}
            onClick={() => {
              dispatch(clearSearchTerm());
              setSelectedMobileView("Latest");
            }}
          >
            Top rated
          </button>
        </div>

        {/* SEARCH MESSAGES */}
        {searchTerm &&
          resultsCount !== null &&
          resultsCount > 0 &&
          selectedMobileView === "Featured" && (
            <div className="searchterm-mobile">
              <span className="searchterm">
                Showing results for "{searchTerm}":
              </span>
            </div>
          )}

        {searchTerm &&
          resultsCount === 0 &&
          selectedMobileView === "Featured" && (
            <div className="searchterm-mobile-no">
              <span className="searchterm">
                No results found for "{searchTerm}".
              </span>
            </div>
          )}

        {/* Featured */}
        <div className="apartments-mobile-featured">
          {selectedMobileView === "Featured" && (
            <>
              <FeaturedApartments apartments={sorted} highlight={searchTerm} />

              <div ref={loaderRef} style={{ height: "60px" }} />
              {homeQuery.isFetchingNextPage && <p>Loading more...</p>}
            </>
          )}

          {/* Latest */}
          {selectedMobileView === "Latest" && <TopRatedWidget />}
        </div>
      </div>
    );
  }

  // DESKTOP VIEW
  return (
    <div>
      <div className="homepage-desktop-title">
        {!searchTerm && "All accommodations"}

        {searchTerm && resultsCount !== null && resultsCount > 0 && (
          <>
            All accommodations
            <span className="searchterm">
              {" "}
              – showing results for "{searchTerm}":
            </span>
          </>
        )}

        {searchTerm && resultsCount === 0 && (
          <>
            All accommodations
            <span className="searchterm">
              {" "}
              – no results found for "{searchTerm}".
            </span>
          </>
        )}
      </div>

      {/* GRID STARTS HERE */}
      <div className="homepage-desktop">
        {sorted.length === 0 ? (
          <>
            {/* 0 results - 2 placeholders + widget */}
            <ApartmentPlaceholder />
            <ApartmentPlaceholder />
            <TopRatedWidget />
          </>
        ) : sorted.length === 1 ? (
          <>
            {/* 1 result - 1 card + 1 placeholder + widget */}
            <ApartmentCard apartment={sorted[0]} highlight={searchTerm} />
            <ApartmentPlaceholder />
            <TopRatedWidget />
          </>
        ) : sorted.length === 2 ? (
          <>
            {/* 2 results - 2 cards + widget */}
            <FeaturedApartments
              apartments={sorted.slice(0, 2)}
              highlight={searchTerm}
            />
            <TopRatedWidget />
          </>
        ) : (
          <>
            {/* TOP BLOCK */}
            <FeaturedApartments
              apartments={sorted.slice(0, 2)}
              highlight={searchTerm}
            />

            {/* WIDGET */}
            <TopRatedWidget />

            {/* BOTTOM BLOCK */}
            <FeaturedApartments
              apartments={sorted.slice(2)}
              highlight={searchTerm}
            />

            {/* SENTINEL */}
            <div ref={loaderRef} style={{ height: "60px" }} />
            {homeQuery.isFetchingNextPage && <p>Loading more...</p>}
          </>
        )}
      </div>
    </div>
  );
}
