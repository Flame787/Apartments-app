// import { useState } from "react";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm, clearSearchTerm } from "../../store/searchSlice";
import { useLocation } from "react-router-dom";

import useIsMobile from "../../hooks/useIsMobile";
import ApartmentsTitle from "./ApartmentsMainTitle";
import SearchButton from "./SearchButton";

type SearchBarProps = { className?: string; onSearch?: (term: string) => void;  };   

export default function SearchBar({ className, onSearch }: SearchBarProps) {    


  const dispatch = useDispatch();
  const location = useLocation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(clearSearchTerm());
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [location.pathname]);

  const handleSearch = () => {
    const value = inputRef.current?.value ?? "";
    dispatch(setSearchTerm(value));

    onSearch?.(value);  


    if (inputRef.current) {
      inputRef.current.value = "";
    }
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
  const iconSource = `/icons/Search.png`;

  return (
    <div className={`searchbar ${className ?? ""}`}>
      {/* adding additional class provided by parent-component, if available (if not, then just "") */}

      {!isMobile && <ApartmentsTitle variant="searchbar" />}

      <div className="search-field">
        <img className="search-field__img" src={iconSource} alt="Search-icon"  onClick={focusInput} />

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
    </div>
  );
}
