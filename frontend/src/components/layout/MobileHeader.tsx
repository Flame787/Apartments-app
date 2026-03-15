// import { useState, useEffect } from "react";
import HamburgerMenu from "../ui/HamburgerMenu";
import ApartmentsTitle from "../ui/ApartmentsMainTitle";
import type { HeaderProps } from "../../types/header";
// import useIsMobile from "../../hooks/useIsMobile";
// import Banner from "./Banner";

export default function MobileHeader({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">

      <ApartmentsTitle variant="header"/>
      <HamburgerMenu onMenuClick={onMenuClick} />
    </header>
  );
}
