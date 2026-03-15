import { useNavigate } from "react-router-dom";

export default function ApartmentsMainTitle({
  variant = "header",
}: {
  variant?: "header" | "categories" | "searchbar";
}) {
  const navigate = useNavigate();
  
  return (
    <div
      className={`myapartments-title myapartments-title--${variant}`}
      aria-label="Blue - Resorts"
      onClick={() => {
        navigate("/");
      }}
    >
      Adriatic<span className="myapartments-title-span">Resorts</span>
    </div>
  );
}
