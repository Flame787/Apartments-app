import { useState, useEffect } from "react";
import CloseButton from "./CloseButton";
import PriceSlider from "./PriceSlider";

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

  // const [priceRange, setPriceRange] = useState([0, 500]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const [showAccommodationDropdown, setShowAccommodationDropdown] =
    useState(false);

  // Close dropdowns if clicked outside:
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // if (!target.closest(".search-filters-box__dropdown-wrapper")) {
      //   setShowPersonsDropdown(false);
      // }
      if (
        !target.closest(".search-filters-box__dropdown-wrapper-accommodation")
      ) {
        setShowAccommodationDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
                aria-label={`Toggle ${opt}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="filters-modal__section accommodation-section">
          <h3>Accommodation type</h3>

          {/* Accommodation type dropdown */}
          <div className="search-filters-box__dropdown-wrapper-accommodation">
            <input
              className="search-filters-box__input  search-filters-box__input-accommodation"
              placeholder="Accommodation type"
              value={accommodation}
              onChange={(e) => {
                setAccommodation(e.target.value);
                setShowAccommodationDropdown(true);
              }}
              onClick={() => setShowAccommodationDropdown(true)}
            />

            {showAccommodationDropdown && (
              <div className="search-filters-box__dropdown-accommodation">
                {accommodationTypes.map((acc) => (
                  <div
                    key={acc}
                    className="search-filters-box__dropdown-item "
                    onClick={() => {
                      setAccommodation(acc);
                      setShowAccommodationDropdown(false);
                    }}
                  >
                    {acc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="filters-modal__section">
          <h3>Price range</h3>

          <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />

          {/* <div className="price-slider">
            <div
              className="price-slider__track"
              style={{
                left: `${(priceRange[0] / 1000) * 100}%`,
                right: `${100 - (priceRange[1] / 1000) * 100}%`,
              }}
            />

            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="thumb thumb--left"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="thumb thumb--right"
            />
          </div>*/}

          {/* <div className="price-values">
            {priceRange[0]} € – {priceRange[1]} €
          </div> */}
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
