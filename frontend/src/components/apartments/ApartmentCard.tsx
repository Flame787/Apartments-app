import { useNavigate } from "react-router-dom";
// import useIsMobile from "../../hooks/useIsMobile";
import FavoriteButton from "../ui/FavoriteButton";
import type { Apartment } from "../../types/apartment";
import { highlightResults } from "../../utils/highlightResults";
import { IMAGE_BASE_URL } from "../../config/constants";

type ApartmentCardProps = {
  apartment: Apartment;
  highlight?: string;
};

export default function ApartmentCard({
  apartment,
  highlight,
}: ApartmentCardProps) {
  // const isMobile = useIsMobile();
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
            // src={apartment.images[0]}
            src={`${IMAGE_BASE_URL}/${apartment.images[0]}`}
            alt={apartment.name}
            // loading="lazy"
            // decoding="async"
            onError={(e) => {
              e.currentTarget.src = "/icons/no-image.png";
              e.currentTarget.onerror = null;
            }}
          />
        ) : (
          <img src="/icons/no-image.png" alt="no image" />
        )}
      </div>

      <div className="apartment-card-allinfo">
        {/* CATEGORY + FAVORITE */}
        <div className="apartment-card-category">
          <span>{apartment.category}</span>
          <FavoriteButton apartment={apartment} />
        </div>

        {/* NAME */}
        <div className="apartment-card-title" onClick={handleOpen}>
          {highlight
            ? highlightResults(apartment.name, highlight)
            : apartment.name}
        </div>

        <div className="apartment-card-lower-box">
          <div className="apartment-card-lower-box-left">
            {/* LOCATION + FAVORITE (desktop) */}
            <div className="apartment-card-location">
              <span>
                {highlight
                  ? highlightResults(apartment.location, highlight)
                  : apartment.location}
              </span>
            </div>

            <div className="apartment-card-price">
              <span style={{ fontWeight: "bold" }}>
                {apartment.price_per_night} €{" "}
              </span>{" "}
              <span>/ night</span>
            </div>
          </div>

          <div className="apartment-card-lower-box-right">
            {/* RATING  */}

            <div className="apartment-card-rating">
              <img
                src="/icons/toprated-small.svg"
                alt="Top rated"
                className="rating-icon"
              />{" "}
              {apartment.rating.toFixed(1)}{" "}
              <span className="reviews">({apartment.reviews_count})</span>
            </div>

            {/* {!isMobile && <FavoriteButton apartment={apartment} />} */}
          </div>
        </div>
      </div>
    </div>
  );
}
