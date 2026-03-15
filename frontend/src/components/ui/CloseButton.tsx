import type { CloseButtonProps } from "../../types/categories";

export default function CloseButton({onClose}: CloseButtonProps) {
  
  const iconSource = `/icons/Button-close.png`;
  return (
    <button className="button-close" onClick={onClose} aria-label="Close menu">
      <img className="button-close__img" src={iconSource} alt="Close-button" />
    </button>
  );
}
