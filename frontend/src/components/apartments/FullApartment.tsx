import { useState } from "react";
import type { Apartment } from "../../types/apartment";
import { highlightResults } from "../../utils/highlightResults";
import FavoriteButton from "../ui/FavoriteButton";
import { IMAGE_BASE_URL } from "../../config/constants";

export default function FullApartment({
  apartment,
  highlight,
}: {
  apartment: Apartment;
  highlight?: string;
}) {


  const [currentIndex, setCurrentIndex] = useState(0);

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
      {/* IMAGE */}
      
      {/* <div className="apartment-full-picture desktop-only-full-picture">
        {apartment.images?.[0] ? (
          <img
            // src={apartment.images[0]}
            src={`${IMAGE_BASE_URL}/${apartment.images[0]}`}
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
      </div> */}

      {/* IMAGE CAROUSEL */}
      {/* <div className="apartment-full-carousel desktop-only-full-picture">
        {apartment.images && apartment.images.length > 0 ? (
          apartment.images.map((img, index) => (
            <img
              key={index}
              src={`${IMAGE_BASE_URL}/${img}`}
              alt={`${apartment.name} – image ${index + 1}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/icons/no-image.png";
                e.currentTarget.onerror = null;
              }}
            />
          ))
        ) : (
          <div className="no-image">No image available</div>
        )}
      </div> */}


{/* --------------------------------------------------- */}


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


      {/* LOCATION */}
      <div className="apartment-full-location">
        {highlight
          ? highlightResults(apartment.location, highlight)
          : apartment.location}
      </div>

      {/* CATEGORY + FAVORITE */}
      <div className="apartment-card-category apartment-full-category">
        {apartment.category}
        <div className="favorite-large">
          <FavoriteButton apartment={apartment} />
        </div>
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
    </div>
  );
}
