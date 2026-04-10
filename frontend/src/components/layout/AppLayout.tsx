import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import Header from "./Header";
import Footer from "./Footer";
import CategoriesDesktop from "./CategoriesDesktop";
import CategoriesMobile from "./CategoriesMobile";
import SearchBar from "../ui/SearchBar";
import useIsMobile from "../../hooks/useIsMobile";
import Banner from "./Banner";
import MobileHeader from "./MobileHeader";
import SearchFilters from "../ui/SearchFilters";

export default function AppLayout() {
  const isMobile = useIsMobile();

  const [menuOpen, setMenuOpen] = useState(false);

  const [sortOption, setSortOption] = useState("");

  // const [headerVisible, setHeaderVisible] = useState(true);

  // global event - closing the modal:
  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("category-click", handler);
    return () => window.removeEventListener("category-click", handler);
  }, []);

  const handleOpen = () => {
    setMenuOpen(true);
  };
  const handleClose = () => {
    setMenuOpen(false);
  };

  // const handleHeader = (visible: boolean) => setHeaderVisible(visible);

  return (
    // <div className="app">
    <div>
      {isMobile && <Banner />}
      {isMobile && <MobileHeader onMenuClick={handleOpen} />}

      {!isMobile && <Banner />}

      <SearchBar onSortChange={setSortOption} />

      <SearchFilters />

      <div className="layout">
        {/* Desktop version - left sidebar with categories picker: */}

        {!isMobile && <CategoriesDesktop />}

        <main className="layout-main">
          <Outlet context={{ sortOption }} />
        </main>
      </div>

      <Footer />

      {/* Mobile version: */}
      {isMobile && menuOpen && <CategoriesMobile onClose={handleClose} />}
    </div>
  );
}
