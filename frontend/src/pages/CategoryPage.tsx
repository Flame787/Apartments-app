import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";
import { clearSearchTerm } from "../store/searchSlice";

import TopRatedWidget from "../components/apartments/TopRatedWidget";
import FeaturedApartments from "../components/apartments/FeaturedApartments";
import { useApartmentsByCategory } from "../hooks/useApartmentsByCategory";

import useIsMobile from "../hooks/useIsMobile";
import ApartmentCard from "../components/apartments/ApartmentCard";

import type { Apartment } from "../types/apartment";

type SelectedMobileView = "Featured" | "Latest";

export default function CategoryPage() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  // NEW:
  const { sortOption } = useOutletContext<{ sortOption: string }>();

  const searchTerm = useSelector((state: any) => state.search.searchTerm);

  // get category from URL
  const { categoryName } = useParams();

  const categoryQuery = useApartmentsByCategory(categoryName ?? null); // fetch apartments for this category

  const allApartments = categoryQuery.data ?? [];

  // Search filter
  // const filtered = allApartments.filter((apt: Apartment) =>
  //   apt.name.toLowerCase().includes(searchTerm.toLowerCase()),
  // );

  // SEARCH FILTER
  const filtered = allApartments.filter((apt: Apartment) => {
    const q = searchTerm.toLowerCase();
    return (
      apt.name.toLowerCase().includes(q) ||
      apt.location.toLowerCase().includes(q) ||
      apt.category.toLowerCase().includes(q) ||
      apt.tags.some((tag: any) => tag.toLowerCase().includes(q))
    );
  });

  // NEW SORTING LOGIC (from SortingBox component):

    const sorted = [...filtered].sort((a, b) => {
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
        return 0; // default backend order
    }
  });

  // Sort
  // const sorted = [...filtered].sort((a, b) => b.rating - a.rating);

  // Result count
  const [resultsCount, setResultsCount] = useState<number | null>(null);

  useEffect(() => {
    setResultsCount(sorted.length);
  }, [sorted.length]);

  const [selectedMobileView, setSelectedMobileView] =
    useState<SelectedMobileView>("Featured");

  const handleMobileView = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value as SelectedMobileView;
    dispatch(clearSearchTerm());
    setSelectedMobileView(value);
  };

  // Placeholder component for empty states
  function ApartmentPlaceholder() {
    return <div className="apartment-placeholder"></div>;
  }

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div className="homepage-mobile">
        {/* MOBILE BUTTONS */}
        <div className="apartments-mobile-buttons">
          <button
            className={`button-featured ${
              selectedMobileView === "Featured" ? "active" : ""
            }`}
            onClick={handleMobileView}
            value="Featured"
          >
            {categoryName}
          </button>

          <button
            className={`button-latest ${
              selectedMobileView === "Latest" ? "active" : ""
            }`}
            onClick={handleMobileView}
            value="Latest"
          >
            Top rated
          </button>
        </div>

        {/* SEARCH MESSAGES */}
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

        {/* FEATURED LIST */}
        <div className="apartments-mobile-featured">
          {selectedMobileView === "Featured" && (
            <FeaturedApartments apartments={sorted} highlight={searchTerm} />
          )}

          {/* TOP RATED */}
          {selectedMobileView === "Latest" && <TopRatedWidget />}
        </div>
      </div>
    );
  }

  // DESKTOP VIEW
  return (
    <div>
      <div className="homepage-desktop-title">
        {!searchTerm && categoryName}

        {searchTerm && resultsCount !== null && resultsCount > 0 && (
          <>
            {categoryName}
            <span className="searchterm">
              {" "}
              – showing results for "{searchTerm}":
            </span>
          </>
        )}

        {searchTerm && resultsCount === 0 && (
          <>
            {categoryName}
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
            {/* 3 + results - normal layout */}
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
          </>
        )}
      </div>
    </div>
  );
}
