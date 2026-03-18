import { useState } from "react";

type SortingBoxProps = {
  onSortChange: (value: string) => void;
};

export default function SortingBox({ onSortChange }: SortingBoxProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedLabel, setSelectedLabel] = useState("Default");

  const OPTIONS = [
    { value: "", label: "Default" },
    { value: "price", label: "Price (low to high)" },
    { value: "price-desc", label: "Price (high to low)" },
    { value: "rating", label: "Rating (high to low)" },
    { value: "reviews", label: "Reviews count" },
    { value: "size", label: "Size (m²)" },
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedLabel(label);
    onSortChange(value);
    setShowDropdown(false);
  };

  return (
    <div className="sorting-box">
      <label htmlFor="sort-select" className="sorting-label">
        Sort by
      </label>

      {/* <select
        id="sort-select"
        className="sorting-select"
        onChange={handleSortChange}
      >
        <option value="">Default</option>
        <option value="price">Price (low to high)</option>
        <option value="price-desc">Price (high to low)</option>
        <option value="rating">Rating (high to low)</option>
        <option value="reviews">Reviews count</option>
        <option value="size">Size (m²)</option>
      </select> */}

      {/* TRIGGER INPUT */}
      <input
        className="sorting-select"
        placeholder="Default"
        value={selectedLabel}
        readOnly
        onClick={() => setShowDropdown((prev) => !prev)}
      />

      {showDropdown && (
        <div className="sorting-select__dropdown">
          {OPTIONS.map((option) => (
            <div
              key={option.value}
              className="sorting-select__dropdown-item"
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
