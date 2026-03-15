import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useIsMobile from "../hooks/useIsMobile";

import FullApartment from "../components/apartments/FullApartment";
import TopRatedWidget from "../components/apartments/TopRatedWidget";

import type { Apartment } from "../types/apartment";
import { highlightResults } from "../utils/highlightResults";

export default function ApartmentPage() {
  const location = useLocation();
  const selectedApartment = location.state?.apartment as Apartment | undefined;

  const searchTerm = useSelector((state: any) => state.search.searchTerm);
  const isMobile = useIsMobile();

  if (!selectedApartment) {
    return (
      <div className="apartment-container">
        <div className="apartments-mobile-full-apartment">Apartment not found.</div>
      </div>
    );
  }

  // SEARCH MATCH LOGIC
  const q = searchTerm.toLowerCase();
  const name = selectedApartment.name.toLowerCase();
  const locationText = selectedApartment.location.toLowerCase();
  const description = selectedApartment.description.toLowerCase();

  const searchMatches =
    name.includes(q) ||
    locationText.includes(q) ||
    description.includes(q) ||
    selectedApartment.tags.some((t) => t.toLowerCase().includes(q));

  return (
    <div className="homepage">
      {/* MOBILE */}
      {isMobile && (
        <div className="homepage-mobile">
          {/* TITLE */}
          <div className="apartment-full-title mobile-only-title">
            {highlightResults(selectedApartment.name, searchTerm)}
            {searchTerm && (
              <span className="searchterm">
                {" "}
                {searchMatches
                  ? `– showing results for "${searchTerm}":`
                  : `– no results found for "${searchTerm}".`}
              </span>
            )}
          </div>

          {/* FULL APARTMENT */}
          <div className="apartments-mobile-full-apartment mobile-only-full-apartment">
            <FullApartment
              apartment={selectedApartment}
              highlight={searchTerm}
            />
          </div>

          {/* TOP RATED LIST */}
          {/* <div className="apartments-mobile-latest">
            <TopRatedWidget />
          </div> */}
        </div>
      )}

      {/* DESKTOP */}
      {!isMobile && (
        <div>
          {/* TITLE */}
          <div className="apartment-full-title">
            {highlightResults(selectedApartment.name, searchTerm)}
            {searchTerm && (
              <span className="searchterm">
                {" "}
                {searchMatches
                  ? `– showing results for "${searchTerm}":`
                  : `– no results found for "${searchTerm}".`}
              </span>
            )}
          </div>

          <div className="apartment-container">
            {/* FULL APARTMENT */}
            <div className="apartments-mobile-full-apartment">
              <FullApartment
                apartment={selectedApartment}
                highlight={searchTerm}
              />
            </div>

            {/* TOP RATED WIDGET */}
            <TopRatedWidget />
          </div>
        </div>
      )}
    </div>
  );
}
