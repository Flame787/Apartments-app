type SortingBoxProps = {
  onSortChange: (value: string) => void;
};

export default function SortingBox({ onSortChange }: SortingBoxProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sorting-box">
      <label htmlFor="sort-select" className="sorting-label">
        Sort by
      </label>

      <select
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
      </select>
    </div>
  );
}


// import { useState } from "react";

// type SortingBoxProps = {
//   onSortChange: (value: string) => void;
// };

// const OPTIONS = [
//   { value: "", label: "Default" },
//   { value: "price", label: "Price (low to high)" },
//   { value: "price-desc", label: "Price (high to low)" },
//   { value: "rating", label: "Rating (high to low)" },
//   { value: "reviews", label: "Reviews count" },
//   { value: "size", label: "Size (m²)" },
// ];

// export default function SortingBox({ onSortChange }: SortingBoxProps) {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState("Default");

//   const handleSelect = (value: string, label: string) => {
//     setSelected(label);
//     onSortChange(value);
//     setOpen(false);
//   };

//   return (
//     <div className="sorting-box-wrapper">
//       <label className="sorting-label">Sort by</label>

//       <div
//         className="sorting-box-trigger"
//         onClick={() => setOpen((prev) => !prev)}
//       >
//         {selected}

//         <span className="sorting-arrow">▼</span>
//       </div>

//       {open && (
//         <div className="sorting-dropdown">
//           {OPTIONS.map((opt) => (
//             <div
//               key={opt.value}
//               className="sorting-dropdown-item"
//               onClick={() => handleSelect(opt.value, opt.label)}
//             >
//               {opt.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

