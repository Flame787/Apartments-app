import type { HamburgerMenuProps } from "../../types/header";
import HamburgerIcon from "/icons/Hamburger.png";

export default function HamburgerMenu({ onMenuClick }: HamburgerMenuProps) {
  return (
    <button
      className="header__menu"
      onClick={onMenuClick}
      aria-label="Open menu"
    >
      <img src={HamburgerIcon} alt="Menu icon" />
    </button>
  );
}
