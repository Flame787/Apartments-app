import { useState } from "react";
import CloseButton from "./CloseButton";

const toggleOptions = [
  "breakfast",
  "parking",
  "near centre",
  "near beach",
  "pool",
  "spa",
  "nature",
  "sport",
  "balcony",
  "air conditioning",
  "dishwasher",
  "washer",
  "microwave",
  "elevator",
  "pets allowed",
];

const accommodationTypes = [
  "Apartments",
  "Studio",
  "Houses",
  "Camping",
  "Glamping",
  "Hotels",
];

export default function FiltersModal({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (filters: any) => void;
}) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [accommodation, setAccommodation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);

  const toggleFilter = (name: string) => {
    setToggles((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="filters-modal">
      <div className="filters-modal__content">
        
        <div className="filters-modal__close-wrapper">
          <CloseButton onClose={onClose} />
        </div>

        <div className="filters-modal__title">
          <h2>Filters</h2>
        </div>

        <div className="filters-modal__section">
          <h3>Amenities</h3>
          <div className="filters-modal__toggles">
            {toggleOptions.map((opt) => (
              <button
                key={opt}
                className={`toggle-btn ${toggles[opt] ? "active" : ""}`}
                onClick={() => toggleFilter(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="filters-modal__section">
          <h3>Accommodation type</h3>
          <select
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
          >
            <option value="">Any</option>
            {accommodationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="filters-modal__section">
          <h3>Price range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
          <div>
            {priceRange[0]} € – {priceRange[1]} €
          </div>
        </div>

        <button
          className="filters-modal__apply"
          onClick={() =>
            onApply({
              toggles,
              accommodation,
              priceRange,
            })
          }
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}
