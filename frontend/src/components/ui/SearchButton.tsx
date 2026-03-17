export default function SearchButton({onSearch, className}: { onSearch: () => void; className?: string }) {
  return (
    <button className={`search-field__input-button ${className}`} onClick={onSearch}>
      SEARCH
    </button>
  ); 
}
