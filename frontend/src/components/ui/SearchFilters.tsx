import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFilteredSearch } from "../../store/filteredSearchSlice";

import FiltersModal from "./FiltersModal";
import CalendarModal from "./CalendarModal";
import SearchButton from "./SearchButton";
import getUniqueLocations from "../../utils/locations";

export default function SearchFilters() {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [persons, setPersons] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  // new
  const [locations, setLocations] = useState<string[]>([]);
  const [showLocationsDropdown, setShowLocationsDropdown] = useState(false);
  const [showPersonsDropdown, setShowPersonsDropdown] = useState(false);

  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  // new - load locations -> fetching all locations from helper-file and saving them into state - happens once, when component mounts
  useEffect(() => {
    const locs = getUniqueLocations();
    setLocations(locs);
  }, []);

  // Filter locations based on user input:
  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(destination.toLowerCase()),
  );

  // Close dropdowns if clicked outside:
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // if (!target.closest(".search-filters-box__dropdown-wrapper")) {
      //   setShowPersonsDropdown(false);
      // }
      if (!target.closest(".search-filters-box__dropdown-wrapper-persons")) {
        setShowPersonsDropdown(false);
      }
      if (
        !target.closest(".search-filters-box__dropdown-wrapper-destination")
      ) {
        setShowLocationsDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const triggerSearch = useCallback(() => {
    dispatch(
      setFilteredSearch({
        destination,
        dates,
        persons,
      }),
    );
    // dispatch(setSearchTriggered());
  }, [destination, dates, persons, dispatch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // dispatch(resetSearchTriggered());
    if (e.key === "Enter") {
      triggerSearch();
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      dispatch(
        setFilteredSearch({
          destination,
          dates,
          persons,
        }),
      );
    }, 500);
    // When user stops typing for 500ms, we don't trigger search, but change Redux state (filteredSearchSlice).
    // Real search is triggered when user clicks on SearchButton or presses Enter
    // - this way we avoid triggering search on every keystroke, but still keep Redux state updated with latest input values

    setDebounceTimer(timer);
  };

  return (
    <>
      <div className="search-filters-box">
        {/* DESTINATION AUTOCOMPLETE */}
        <div className="search-filters-box__dropdown-wrapper-destination">
          <input
            className="search-filters-box__input  search-filters-box__input-destination"
            placeholder="Destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowLocationsDropdown(true);
              console.log(destination);
            }}
            onKeyDown={handleKeyDown}
            onClick={() => setShowLocationsDropdown(true)}
          />

          {showLocationsDropdown && filteredLocations.length > 0 && (
            <div className="search-filters-box__dropdown-destination">
              {filteredLocations.map((loc) => (
                <div
                  key={loc}
                  className="search-filters-box__dropdown-item "
                  onClick={() => {
                    setDestination(loc);
                    setShowLocationsDropdown(false);
                    triggerSearch();
                  }}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DATE PICKER */}
        {/* <div className="search-filters-box__dropdown-wrapper-dates"> */}
        <input
          className="search-filters-box__input search-filters-box__input-dates"
          placeholder="Date from - to"
          value={dates}
          readOnly
          onClick={() => setIsDateModalOpen(true)}
        />
        {/* </div> */}

        {/* NR. OF PERSONS */}
        <div className="search-filters-box__dropdown-wrapper-persons">
          <input
            className="search-filters-box__input search-filters-box__input-persons"
            placeholder="Nr. of persons"
            value={persons}
            readOnly
            onClick={() => setShowPersonsDropdown((prev) => !prev)}
            onKeyDown={handleKeyDown}
          />

          {showPersonsDropdown && (
            <div className="search-filters-box__dropdown-persons">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className="search-filters-box__dropdown-item"
                  onClick={() => {
                    setPersons(String(num));
                    setShowPersonsDropdown(false);
                    triggerSearch();
                  }}
                >
                  {num}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="both-buttons-filtered-search">
          <button
            className="search-filters__button"
            onClick={() => setIsModalOpen(true)}
          >
            + ADD FILTERS
          </button>

          <SearchButton
            className="run-search-filtered-button"
            onSearch={() => {
              triggerSearch(); // saves filtered queries and tags

              // dispatch(setSearchTriggered());
            }}
          />
        </div>
      </div>

      {isModalOpen && (
        <FiltersModal
          onClose={() => setIsModalOpen(false)}
          onApply={(filters: any) => {
            dispatch(
              setFilteredSearch({
                destination,
                dates,
                persons,
                ...filters, // adds filters to search terms
              }),
            );
            // dispatch(setSearchTriggered());
            setIsModalOpen(false);
          }}
        />
      )}

      {isDateModalOpen && (
        <CalendarModal
          onClose={() => setIsDateModalOpen(false)}
          onApply={({ startDate, endDate }) => {
            const formatted = `${startDate.toLocaleDateString("hr-HR")}-${endDate.toLocaleDateString("hr-HR")}`;
            setDates(formatted);
            setIsDateModalOpen(false);
            triggerSearch();
          }}
        />
      )}
    </>
  );
}
