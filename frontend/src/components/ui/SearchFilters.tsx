import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
// import { setFilteredSearch } from "../../store/filteredSearchSlice";
import {
  setFilteredSearch,
  setSearchTriggered,
} from "../../store/filteredSearchSlice";
import { resetSearchTriggered } from "../../store/filteredSearchSlice";

import FiltersModal from "./FiltersModal";
import CalendarModal from "./CalendarModal";
import SearchButton from "./SearchButton";

export default function SearchFilters() {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [persons, setPersons] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  const [showPersonsDropdown, setShowPersonsDropdown] = useState(false);

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const triggerSearch = useCallback(() => {
    dispatch(
      setFilteredSearch({
        destination,
        dates,
        persons,
      }),
    );
  }, [destination, dates, persons, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".search-filters-box__dropdown-wrapper")) {
        setShowPersonsDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch(resetSearchTriggered());
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
        <input
          className="search-filters-box__input search-filters-box__input-destination"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>

        <input
          className="search-filters-box__input search-filters-box__input-dates"
          placeholder="Date from - to"
          value={dates}
          readOnly
          onClick={() => setIsDateModalOpen(true)}
        />

        <div className="search-filters-box__dropdown-wrapper">
          <input
            className="search-filters-box__input search-filters-box__input-persons"
            placeholder="Nr. of persons"
            value={persons}
            readOnly
            onClick={() => setShowPersonsDropdown((prev) => !prev)}
            onKeyDown={handleKeyDown}
          />

          {showPersonsDropdown && (
            <div className="search-filters-box__dropdown">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className="search-filters-box__dropdown-item"
                  onClick={() => {
                    setPersons(String(num));
                    setShowPersonsDropdown(false);
                  }}
                >
                  {num}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className="search-filters__button"
          onClick={() => setIsModalOpen(true)}
        >
          + FILTERS
        </button>

        <SearchButton
          onSearch={() => {
            triggerSearch();
            dispatch(setSearchTriggered());
          }}
        />
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
                ...filters,
              }),
            );
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
          }}
        />
      )}
    </>
  );
}
