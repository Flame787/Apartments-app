import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../ui/FavoriteButton";
import type { Apartment } from "../../types/apartment";
import { highlightResults } from "../../utils/highlightResults";

type LatestApartmentCardProps = {
  apartment: Apartment;
  highlight?: string;
};

export default function TopApartmentCard({
  apartment,
  highlight,
}: LatestApartmentCardProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/apartment/${apartment.id}`, { state: { apartment } });
  };

  return (
    <div className="apartment-card">
      {/* IMAGE */}
      <div className="apartment-card-picture" onClick={handleOpen}>
        {apartment.images?.[0] ? (
          <img
            src={apartment.images[0]}
            alt={apartment.name}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = "/icons/no-image.png";
              e.currentTarget.onerror = null;
            }}
          />
        ) : (
          <img
            src="/icons/no-image.png"
            alt="No image available"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      {/* RATING + FAVORITE (mobile) */}
      <div className="latest-apartment-card-rating special-card-time">
        <span>
          ⭐ {apartment.rating.toFixed(1)} ({apartment.reviews_count})
        </span>
        {isMobile && <FavoriteButton apartment={apartment} />}
      </div>

      {/* NAME */}
      <div
        className="apartment-card-title"
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
      >
        {highlight
          ? highlightResults(apartment.name, highlight)
          : apartment.name}
      </div>

      {/* LOCATION + FAVORITE (desktop) */}
      <div className="apartment-card-location">
        <span>{apartment.location}</span>
        {!isMobile && <FavoriteButton apartment={apartment} />}
      </div>
    </div>
  );
}
