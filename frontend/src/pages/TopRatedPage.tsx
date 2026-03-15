import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useIsMobile from "../hooks/useIsMobile";
import ApartmentCard from "../components/apartments/ApartmentCard";
import type { Apartment } from "../types/apartment";
import { useTopRatedApartments } from "../hooks/useTopRatedApartments";

export default function TopRatedPage() {
  const searchTerm = useSelector((state: any) => state.search.searchTerm);
  const [resultsCount, setResultsCount] = useState<number | null>(null);

  // for infinite scroll:
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // const { data } = useTopRatedApartments();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTopRatedApartments();

  const allApartments: Apartment[] =
    data?.pages.flatMap((page) => page.items) ?? [];

  // SEARCH FILTER
  const searchFiltered = allApartments.filter((apt) => {
    const q = searchTerm.toLowerCase();
    return (
      apt.name.toLowerCase().includes(q) ||
      apt.location.toLowerCase().includes(q) ||
      apt.category.toLowerCase().includes(q) ||
      apt.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setResultsCount(searchFiltered.length);
  }, [searchFiltered.length]);

  // SORT BY RATING DESCENDING, THEN BY REVIEWS COUNT DESCENDING:
  // const sorted = [...searchFiltered].sort((a, b) => b.rating - a.rating);

  // INFINITE SCROLL OBSERVER
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      // when the loader div is visible in the viewport, and we have more pages to load, and we're not already loading, then fetch the next page
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1, // trigger when 10% of the loader is visible
        rootMargin: "200px", // start loading before the user reaches the loader (preload when it's within 200px of the viewport)
      },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="homepage">
      {/* MOBILE */}
      {isMobile && (
        <div className="homepage-mobile">
          <div className="apartments-mobile-buttons">
            <button className="button-featured" onClick={() => navigate("/")}>
              Featured
            </button>

            <button className="button-latest active">Top Rated</button>
          </div>

          {/* SEARCH RESULTS INFO */}
          {searchTerm && resultsCount !== null && resultsCount > 0 && (
            <div className="searchterm-mobile">
              <span className="searchterm">
                Showing results for "{searchTerm}":
              </span>
            </div>
          )}

          {searchTerm && resultsCount === 0 && (
            <div className="searchterm-mobile-no">
              <span className="searchterm">
                No results found for "{searchTerm}".
              </span>
            </div>
          )}

          {/* LIST */}
          <div className="apartments-mobile-latest-page">
            {searchFiltered.map((apt: Apartment) => (
              <ApartmentCard
                key={apt.id}
                apartment={apt}
                highlight={searchTerm}
              />
            ))}

            {/* Infinite scroll sentinel */}
            <div ref={loaderRef} style={{ height: "60px" }} />

            {isFetchingNextPage && <p>Loading more...</p>}
          </div>
        </div>
      )}

      {/* DESKTOP */}
      {!isMobile && (
        <div>
          <div className="homepage-desktop-title">
            {!searchTerm && "Top Rated Accommodations"}

            {searchTerm && resultsCount !== null && resultsCount > 0 && (
              <>
                Top Rated Accommodations
                <span className="searchterm">
                  {" "}
                  – showing results for "{searchTerm}":
                </span>
              </>
            )}

            {searchTerm && resultsCount === 0 && (
              <>
                Top Rated Accommodations
                <span className="searchterm">
                  {" "}
                  – no results found for "{searchTerm}".
                </span>
              </>
            )}
          </div>

          <div className="homepage-desktop">
            {resultsCount === 0 ? (
              <div className="homepage-desktop-empty">
                No apartments match your search.
              </div>
            ) : (
              searchFiltered.map((apt: Apartment) => (
                <ApartmentCard
                  key={apt.id}
                  apartment={apt}
                  highlight={searchTerm}
                />
              ))
            )}
          </div>

          {/* Infinite scroll sentinel */}
          <div ref={loaderRef} style={{ height: "60px" }} />

          {isFetchingNextPage && <p>Loading more...</p>}
        </div>
      )}
    </div>
  );
}
