import { useNavigate } from "react-router-dom";
import type { Apartment } from "../../types/apartment";
import { highlightResults } from "../../utils/highlightResults";

type LatestApartmentTitleProps = {
  apartment: Apartment;
  highlight?: string;
};

export default function TopRatedTitle({
  apartment,
  highlight,
}: LatestApartmentTitleProps) {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/apartment/${apartment.id}`, { state: { apartment } });
  };

  const iconSource = `/icons/location.svg`;

  return (
    <div className="toprated-apartment-title" onClick={handleOpen}>
      <div className="apartment-card-title toprated-title">
        {highlight
          ? highlightResults(apartment.name, highlight)
          : apartment.name}
      </div>

      <div className="apartment-card-location toprated-location">
        <img
          src={iconSource}
          style={{ marginRight: "4px", height: "14px", width: "auto" }}
          alt="Location icon"
        />
        {apartment.location}
      </div>

      <div className="toprated-rating">
        <img
          src="/icons/toprated-small.svg"
          alt="Top rated"
          className="rating-icon"
        />{" "}
        <strong>{apartment.rating.toFixed(1)}</strong> (
        {apartment.reviews_count})
      </div>
    </div>
  );
}
