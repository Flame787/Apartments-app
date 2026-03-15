import type { Apartment } from "../../types/apartment";
import { highlightResults } from "../../utils/highlightResults";
import FavoriteButton from "../ui/FavoriteButton";

export default function FullApartment({
  apartment,
  highlight,
}: {
  apartment: Apartment;
  highlight?: string;
}) {
  return (
    <div className="apartment-full">

      {/* IMAGE */}
      <div className="apartment-full-picture desktop-only-full-picture">
        {apartment.images?.[0] ? (
          <img
            src={apartment.images[0]}
            alt={apartment.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/icons/no-image.png";
              e.currentTarget.onerror = null;
            }}
          />
        ) : (
          <div className="no-image">No image available</div>
        )}
      </div>

      {/* LOCATION */}
      <div className="apartment-full-location">
        {highlight
          ? highlightResults(apartment.location, highlight)
          : apartment.location}
      </div>

      {/* CATEGORY + FAVORITE */}
      <div className="apartment-card-category apartment-full-category">
        {apartment.category}
        <div className="favorite-large"><FavoriteButton apartment={apartment} /></div>
      </div>

      {/* NAME */}
      <h2 className="apartment-full-title">
        {highlight
          ? highlightResults(apartment.name, highlight)
          : apartment.name}
      </h2>

      {/* RATING */}
      <div className="apartment-full-rating">
        ⭐ {apartment.rating.toFixed(1)}{" "}
        <span className="reviews">({apartment.reviews_count} reviews)</span>
      </div>

      {/* PRICE */}
      <div className="apartment-full-price">
        <strong>{apartment.price_per_night} €</strong> <span>/ night</span>
      </div>

      {/* DETAILS */}
      <div className="apartment-full-details">
        <div className="apartment-full-size"><strong>Size:</strong> {apartment.size_m2} m²</div>
        <div className="apartment-full-guests"><strong>Max guests:</strong> {apartment.max_guests}</div>
        {apartment.tags.length > 0 && (
          <div className="apartment-full-tags">
            <strong>Highlights:</strong>{" "}
            {apartment.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="apartment-full-description">
        {highlight
          ? highlightResults(apartment.description, highlight)
          : apartment.description}
      </div>
    </div>
  );
}
