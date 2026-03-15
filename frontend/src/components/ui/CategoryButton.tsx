import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { clearSearchTerm } from "../../store/searchSlice";

import type { CategoryButtonProps } from "../../types/categories";

export default function CategoryButton({ category }: CategoryButtonProps) {
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // checking if this category is currently selected:
  const isSelected =
    (category === "Home" && location.pathname === "/") ||
    (category === "Favorites" && location.pathname === "/favorites") ||
    location.pathname === `/category/${category}`;

  // changing the icon to become red if hovered:
  // const iconSource = hovered || isSelected
  //   ? `/icons/${category}-red.svg`
  //   : `/icons/${category}.svg`;

  const isActive = hovered || isSelected;

  return (
    <button
      className={`button-category ${isSelected ? "selected" : ""}`} // adding special style if category is selected
      aria-label={`${category} category button`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        window.dispatchEvent(new Event("category-click")); // closing Modal if any category was selected

        dispatch(clearSearchTerm()); // reseting global search-state, so all apartments are rendered on new page

        if (category === "Home") {
          // + navigating to selected HomePage, CategoryPage or FavoritesPage
          navigate("/");
        } else if (category === "Favorites") {
          navigate("/favorites");
        } else {
          navigate(`/category/${category}`);
        }
      }}
    >
      {/* <img src={iconSource} alt={category} /> */}

      <img
        src={`/icons/${category}.svg`}
        alt={category}
        className={isActive ? "active" : ""}
      />

      <div className="button-category__title">{category}</div>
    </button>
  );
}
