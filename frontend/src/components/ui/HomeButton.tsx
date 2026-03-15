import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      className="button-home"
      aria-label="Home button"
      onClick={() => {
        navigate("/");
      }}
    >
      HOME
    </button>
  );
}

