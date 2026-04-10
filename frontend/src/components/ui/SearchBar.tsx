// import { useState } from "react";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/searchSlice";
import { setFilteredSearch } from "../../store/filteredSearchSlice";
import { useLocation } from "react-router-dom";

import useIsMobile from "../../hooks/useIsMobile";
import ApartmentsTitle from "./ApartmentsMainTitle";
import SearchButton from "./SearchButton";
import SortingBox from "./SortingBox";

type SearchBarProps = {
  className?: string;
  onSearch?: (term: string) => void;
  onSortChange?: (value: string) => void;
  showSorting?: boolean;
};

export default function SearchBar({
  className,
  onSearch,
  onSortChange,
  showSorting = true,
}: SearchBarProps) {
  const dispatch = useDispatch();
  const location = useLocation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // dispatch(clearSearchTerm());
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [location.pathname]);

  const handleSearch = () => {
    const value = inputRef.current?.value ?? "";
    // dispatch(setSearchTerm(value));

    // 1. save searchTerm for highlighting:
    dispatch(setSearchTerm(value));

    // 2. trigger backend search:
    dispatch(setFilteredSearch({ globalSearch: value }));
    // dispatch(setSearchTriggered());

    onSearch?.(value);

    // if (inputRef.current) {
    //   inputRef.current.value = "";
    // }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const isMobile = useIsMobile();
  const iconSource = `/icons/Search5.svg`;
  const shouldShowSorting = showSorting && typeof onSortChange === "function";

  return (
    <div className={`searchbar ${className ?? ""}`}>
      {/* adding additional class provided by parent-component, if available (if not, then just "") */}

      {!isMobile && <ApartmentsTitle variant="searchbar" />}

      <div className="search-field">
        <img
          className="search-field__img"
          src={iconSource}
          alt="Search-icon"
          onClick={focusInput}
        />

        <input
          ref={inputRef}
          className="search-field__input"
          type="text"
          placeholder="Search apartments"
          maxLength={20}
          onKeyDown={handleKeyDown}
        />

        <SearchButton onSearch={handleSearch} />
      </div>

      {shouldShowSorting && <SortingBox onSortChange={onSortChange!} />}
    </div>
  );
}
