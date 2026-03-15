export default function SearchButton({onSearch}: { onSearch: () => void }) {
  return (
    <button className="search-field__input-button" onClick={onSearch}>
      SEARCH
    </button>
  ); 
}
