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

  const handleFavorite = () => {
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
      <img
        className={`apartment-card-icon ${isActive ? "active" : ""}`}
        src="/icons/favorite.svg"
        alt="Add to favorites"
      />

      {hovered && (
        <span className="favorite-label">
          {isFavorite ? "Remove" : "Favorite"}
        </span>
      )}
    </button>
  );
}
