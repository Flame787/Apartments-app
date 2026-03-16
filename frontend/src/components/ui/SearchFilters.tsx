import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFilteredSearch } from "../../store/filteredSearchSlice";
import FiltersModal from "./FiltersModal";

export default function SearchFilters() {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [persons, setPersons] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  const triggerSearch = useCallback(() => {
    dispatch(
      setFilteredSearch({
        destination,
        dates,
        persons,
      }),
    );
  }, [destination, dates, persons, dispatch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      triggerSearch();
    }, 500);

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
        >
       
        </input>
        <input
          className="search-filters-box__input search-filters-box__input-dates"
          placeholder="Date from - to"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <input
          className="search-filters-box__input search-filters-box__input-persons"
          placeholder="Nr. of persons"
          value={persons}
          onChange={(e) => setPersons(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="search-filters__button"
          onClick={() => setIsModalOpen(true)}
        >
          Add filters
        </button>
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
    </>
  );
}
