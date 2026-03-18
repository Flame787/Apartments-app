type SortingBoxProps = {
  onSortChange: (value: string) => void;
};

export default function SortingBox({ onSortChange }: SortingBoxProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sorting-box">
      <label htmlFor="sort-select">Sort by:</label>
      <select id="sort-select" onChange={handleSortChange}>
        <option value="">Default</option>
        <option value="price">Price (low to high)</option>
        <option value="price-desc">Price (high to low)</option>
        <option value="rating">Rating (high to low)</option>
        <option value="reviews">Reviews count</option>
        <option value="size">Size (m²)</option>
      </select>
    </div>
  );
}
