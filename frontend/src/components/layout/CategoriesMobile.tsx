import type { CategoriesMobileProps } from "../../types/categories";
import CategoriesList from "../ui/CategoriesList";
import SearchBar from "../ui/SearchBar";
import CloseButton from "../ui/CloseButton";
import ApartmentsMainTitle from "../ui/ApartmentsMainTitle";

// MOBILE VERSION - MODAL:

export default function CategoriesMobile({ onClose }: CategoriesMobileProps) {

  const handleSearch = (term: string) => {
    if (!term.trim()) return;

    onClose?.();

    window.dispatchEvent(new CustomEvent("trigger-search", { detail: term }));

  };

  return (
    <div className="categories-modal">
      <CloseButton onClose={onClose} />

      <div className="categories-modal__content">
        <div className="categories-modal__top-div">
          <ApartmentsMainTitle variant="categories" />

          <SearchBar className="searchbar-modal__categories" onSearch={handleSearch}/>
        </div>

        <CategoriesList />
      </div>
    </div>
  );
}
