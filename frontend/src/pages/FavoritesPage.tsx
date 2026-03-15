import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchTerm } from "../store/searchSlice";
import type { RootState } from "../store/store";

import TopRatedWidget from "../components/apartments/TopRatedWidget";
import useIsMobile from "../hooks/useIsMobile";

import type { Apartment } from "../types/apartment";
import ApartmentCard from "../components/apartments/ApartmentCard";
import HomeButton from "../components/ui/HomeButton";

type SelectedMobileView = "Featured" | "Latest";

export default function FavoritesPage() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  // FAVORITES
  const favoriteApartments = useSelector(
    (state: RootState) => state.favorites.favoriteApartments,
  );

  // SEARCH TERM
  const searchTerm = useSelector((state: any) => state.search.searchTerm);

  const [resultsCount, setResultsCount] = useState<number | null>(null);

  // SEARCH FILTER
  const searchFiltered = favoriteApartments.filter((apt) => {
    const q = searchTerm.toLowerCase();

    if (isMobile) {
      return apt.name.toLowerCase().includes(q);
    }

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

  const [selectedMobileView, setSelectedMobileView] =
    useState<SelectedMobileView>("Featured");

  const handleMobileView = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value as SelectedMobileView;
    dispatch(clearSearchTerm());
    setSelectedMobileView(value);
  };

  function ApartmentPlaceholder() {
    return <div className="apartment-placeholder"></div>;
  }

  return (
    <div className="homepage">
      {/* MOBILE */}
      {isMobile && (
        <div className="homepage-mobile">
          <div className="apartments-mobile-buttons">
            <button
              className={`button-featured ${
                selectedMobileView === "Featured" ? "active" : ""
              }`}
              onClick={handleMobileView}
              value="Featured"
            >
              Favorite apartments
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

          {/* FAVORITES LIST */}
          {selectedMobileView === "Featured" && (
            <div className="apartments-mobile-featured">
              {favoriteApartments.length === 0 && (
                <div className="apartments-mobile-featured-empty">
                  <span>No favorite apartments.</span>
                  <HomeButton />
                </div>
              )}

              {favoriteApartments.length > 0 &&
                searchTerm &&
                searchFiltered.length === 0 && (
                  <div className="apartments-mobile-featured-empty"></div>
                )}

              {favoriteApartments.length > 0 &&
                searchTerm &&
                searchFiltered.length > 0 &&
                searchFiltered.map((apt: Apartment) => (
                  <ApartmentCard
                    key={apt.id}
                    apartment={apt}
                    highlight={searchTerm}
                  />
                ))}

              {favoriteApartments.length > 0 &&
                !searchTerm &&
                favoriteApartments.map((apt: Apartment) => (
                  <ApartmentCard
                    key={apt.id}
                    apartment={apt}
                    highlight={searchTerm}
                  />
                ))}
            </div>
          )}

          {/* TOP RATED */}
          {selectedMobileView === "Latest" && (
            <div className="apartments-mobile-Latest">
              <TopRatedWidget />
            </div>
          )}
        </div>
      )}

      {/* DESKTOP */}
      {!isMobile && (
        <div>
          <div className="homepage-desktop-title">
            {!searchTerm && "Favorite apartments"}

            {searchTerm && resultsCount !== null && resultsCount > 0 && (
              <>
                Favorite apartments
                <span className="searchterm">
                  {" "}
                  – showing results for "{searchTerm}":
                </span>
              </>
            )}

            {searchTerm && resultsCount === 0 && (
              <>
                Favorite apartments
                <span className="searchterm">
                  {" "}
                  – no results found for "{searchTerm}".
                </span>
              </>
            )}
          </div>

          {/* GRID STARTS HERE */}
          <div className="homepage-desktop">

            {favoriteApartments.length === 0 ? (
              <>
                <div className="homepage-desktop-empty">
                  <span>No favorite apartments.</span>
                  <HomeButton />
                </div>
                <TopRatedWidget />
                <div className="homepage-desktop-empty-card"></div>
              </>

            ) : searchFiltered.length === 0 ? (
              <>
                <div className="homepage-desktop-empty"></div>
                <TopRatedWidget />
                <div className="homepage-desktop-empty-card"></div>
              </>
              
            ) : searchFiltered.length === 1 ? (
              <>
                <ApartmentCard
                  apartment={searchFiltered[0]}
                  highlight={searchTerm}
                />
                <ApartmentPlaceholder />
                <TopRatedWidget />
              </>
            ) : (
              <>
                {searchFiltered.slice(0, 2).map((apt: Apartment) => (
                  <ApartmentCard
                    key={apt.id}
                    apartment={apt}
                    highlight={searchTerm}
                  />
                ))}

                <TopRatedWidget />

                {searchFiltered.slice(2).map((apt: Apartment) => (
                  <ApartmentCard
                    key={apt.id}
                    apartment={apt}
                    highlight={searchTerm}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
