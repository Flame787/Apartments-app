import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favoritesSlice";
import type { RootState } from "../../store/store";
import type { Apartment } from "../../types/apartment";

type FavoriteButtonProps = {
  apartment: Apartment;
};

export default function FavoriteButton({ apartment }: FavoriteButtonProps) {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favoriteApartments.some(
      (fav: Apartment) => fav.id === apartment.id,
    ),
  );

  const [hovered, setHovered] = useState(false);

  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); 
    // preventing click on Favorite-button from propagating to card and opening new page: FullApartment.
    // (otherwise full ApartmentCard is clickable and opens new page, but we need to prevent that when clicking on FavoriteButton)

    if (isFavorite) {
      dispatch(removeFromFavorites(apartment.id));
    } else {
      dispatch(addToFavorites(apartment));
    }
  };

    const isActive = hovered || isFavorite;

  return (
    <button
      className="apartment-card-button"
      onClick={handleFavorite}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* <img
        className={`apartment-card-icon ${isActive ? "active" : ""}`}
        src="/icons/favorite2.svg"
        alt="Add to favorites"
       style={{ background: "transparent" }}
      /> */}

      <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 80 80"
    className={`apartment-card-icon ${isActive ? "active" : ""}`}
  >
    <circle cx="40" cy="40" r="36" fill="#d32f2f"/>
    <path
      d="M40 59 C25 49 20 39 20 34 C20 28 25 24 32 24 C36 24 39 26 40 28 C41 26 44 24 48 24 C55 24 60 28 60 34 C60 39 55 49 40 59 Z"
      fill="none"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>

      {hovered && (
        <span className="favorite-label">
          {isFavorite ? "Remove" : "Favorite"}
        </span>
      )}
    </button>
  );
}
