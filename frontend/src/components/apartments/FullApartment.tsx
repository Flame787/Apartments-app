import { useState } from "react";
import type { Apartment } from "../../types/apartment";
import { highlightResults } from "../../utils/highlightResults";
import FavoriteButton from "../ui/FavoriteButton";
import { IMAGE_BASE_URL } from "../../config/constants";
import CalendarModal from "../ui/CalendarModal";
import ProceedButton from "../ui/ProceedButton";

export default function FullApartment({
  apartment,
  highlight,
}: {
  apartment: Apartment;
  highlight?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // state for opening/closing Calendar and selecting dates:
  const [selectedDates, setSelectedDates] = useState("");

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const hasMultipleImages = apartment.images && apartment.images.length > 1;

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === apartment.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? apartment.images.length - 1 : prev - 1,
    );
  };

  return (
    <div className="apartment-full">
      {/* IMAGE CAROUSEL */}
      <div className="apartment-full-picture desktop-only-full-picture">
        {apartment.images?.length ? (
          <div className="carousel-wrapper">
            <img
              src={`${IMAGE_BASE_URL}/${apartment.images[currentIndex]}`}
              alt={`${apartment.name} – image ${currentIndex + 1}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/icons/no-image.png";
                e.currentTarget.onerror = null;
              }}
            />

            {/* LEFT BUTTON */}
            {hasMultipleImages && (
              <button className="carousel-btn left" onClick={prevImage}>
                ‹
              </button>
            )}

            {/* RIGHT BUTTON */}
            {hasMultipleImages && (
              <button className="carousel-btn right" onClick={nextImage}>
                ›
              </button>
            )}
          </div>
        ) : (
          <div className="no-image">No image available</div>
        )}
      </div>

      {/* CATEGORY + FAVORITE */}
      <div className="apartment-card-category apartment-full-category">
        {apartment.category}
        <div className="favorite-large">
          <FavoriteButton apartment={apartment} />
        </div>
      </div>

      {/* LOCATION */}
      <div className="apartment-full-location">
        <strong>
          {highlight
            ? highlightResults(apartment.location, highlight)
            : apartment.location}
        </strong>
      </div>

      {/* NAME */}
      {/* <h2 className="apartment-full-title">
        {highlight
          ? highlightResults(apartment.name, highlight)
          : apartment.name}
      </h2> */}

      {/* RATING */}
      <div className="apartment-full-rating">
        <img
          src="/icons/toprated-small.svg"
          alt="Top rated"
          className="rating-icon"
        />{" "}
        <strong>{apartment.rating.toFixed(1)} </strong>{" "}
        <span className="reviews">({apartment.reviews_count} reviews)</span>
      </div>

      {/* PRICE */}
      <div className="apartment-full-price">
        <strong>{apartment.price_per_night} €</strong> <span>/ night</span>
      </div>

      {/* DETAILS */}
      <div className="apartment-full-details">
        <div className="apartment-full-size">
          <strong>Size:</strong> {apartment.size_m2} m²
        </div>
        <div className="apartment-full-guests">
          <strong>Max guests:</strong> {apartment.max_guests}
        </div>
        {apartment.tags.length > 0 && (
          <div className="apartment-full-tags">
            <strong>Highlights:</strong>{" "}
            {apartment.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
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

      {/* AVALIBILITY */}
      <div className="apartment-full-availibility">
        <strong>Select dates (check-in — check-out): </strong>
      </div>
      <div className="apartment-full-calendar">
        <input
          className="search-filters-box__input search-filters-box__input-dates"
          placeholder="Date from - to"
          value={selectedDates}
          readOnly
          onClick={() => setIsDateModalOpen(true)}
        />
      </div>

      

      <ProceedButton />

      {isDateModalOpen && (
        <CalendarModal
          onClose={() => setIsDateModalOpen(false)}
          onApply={({ startDate, endDate }) => {
            const formatted = `${startDate.toLocaleDateString("hr-HR")}-${endDate.toLocaleDateString("hr-HR")}`;
            setSelectedDates(formatted);
            setIsDateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
