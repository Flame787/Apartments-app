import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchTerm } from "../store/searchSlice";

import { clearFilteredSearch } from "../store/filteredSearchSlice";

import TopRatedWidget from "../components/apartments/TopRatedWidget";
import FeaturedApartments from "../components/apartments/FeaturedApartments";
import ApartmentCard from "../components/apartments/ApartmentCard";

import { useAllApartments } from "../hooks/useAllApartments";
import { useFilteredApartments } from "../hooks/useFilteredApartments";

import useIsMobile from "../hooks/useIsMobile";
import { useOutletContext } from "react-router-dom";
import type { Apartment } from "../types/apartment";

type SelectedMobileView = "Featured" | "Latest";

export default function HomePage() {
  // const homeQuery = useAllApartments(); // infinite scroll hook to fetch all apartments page by page

  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const loaderRef = useRef(null);

  // getting sort-option from Outlet context (set in App.tsx):
  const { sortOption } = useOutletContext<{ sortOption: string }>();

  // infinite scroll hook to fetch all apartments page by page:
  const homeQuery = useAllApartments(sortOption !== "");

  // global search term from searchSlice (set in SearchBar component):
  const searchTerm = useSelector((s: any) => s.search.searchTerm);
  // s - state, s.search - searchSlice, s.search.searchTerm - searchTerm from searchSlice

  // new filtered search from SearchFilters component, it uses redux-state "filteredSearchSlice" (results are filtered on backend):
  const filters = useSelector((s: any) => s.filteredSearch);
  // s - state, s.filteredSearch - filteredSearchSlice, s.filteredSearch - all filter values from filteredSearchSlice (destination, dates, persons, toggles, accommodation, priceRange)
  const { searchTriggered } = useSelector((s: any) => s.filteredSearch);

  const [selectedMobileView, setSelectedMobileView] =
    useState<SelectedMobileView>("Featured");

  // new - backend search custom hook "useFilteredApartments" - it uses filters from filteredSearchSlice
  const { data: filteredData } = useFilteredApartments(
    filters,
    searchTriggered,
  );

  // clean filters when HomePage-component is loaded again, or when user returns back from Home:
  useEffect(() => {
    dispatch(clearFilteredSearch());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearFilteredSearch());
    };
  }, []);

  // Flatten all pages (received from useAllApartments infinite scroll custom hook) into a single array of apartments:
  const pages = homeQuery.data?.pages ?? [];
  const allApartments = pages.flatMap((p) => p.items);

  // choose data source:
  // const results = searchTriggered ? (filteredData?.items ?? []) : allApartments;
  const baseResults = searchTriggered
    ? (filteredData?.items ?? [])
    : allApartments;


  // LOCAL searchTerm filtering (global search):
  const searchTermFiltered = baseResults.filter((apt: Apartment) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      apt.name.toLowerCase().includes(q) ||
      apt.location.toLowerCase().includes(q) ||
      apt.category.toLowerCase().includes(q)
      // || apt.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const sorted = [...searchTermFiltered].sort((a, b) => {
    switch (sortOption) {
      case "price":
        return a.price_per_night - b.price_per_night;
      case "price-desc":
        return b.price_per_night - a.price_per_night;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews_count - a.reviews_count;
      case "size":
        return b.size_m2 - a.size_m2;
      default:
        return 0; // otherwise: default backend order (ID ASCENDING)
    }
  });

  // Result count
  const resultsCount = sorted.length;

  // 🔥 INFINITE SCROLL (* only disabled when searching)
  useEffect(() => {
    if (searchTriggered) return; // disable infinite scroll during search
    if (sortOption !== "") return;
    if (!loaderRef.current) return;
    if (!homeQuery.fetchNextPage) return;

    // if previously defined if-conditions weren't met, then infinite scroll works as intended:
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
      // this will trigger the fetch when the loader is within 200px of the viewport, giving a smoother loading experience
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [
    searchTriggered,
    sortOption,
    homeQuery.hasNextPage,
    homeQuery.isFetchingNextPage,
  ]);

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
              {sortOption === "" && (
                <>
                  <div ref={loaderRef} style={{ height: "60px" }} />
                  {homeQuery.isFetchingNextPage && <p>Loading more...</p>}
                </>
              )}
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
            {sortOption === "" && (
              <>
                <div ref={loaderRef} style={{ height: "60px" }} />
                {homeQuery.isFetchingNextPage && <p>Loading more...</p>}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
