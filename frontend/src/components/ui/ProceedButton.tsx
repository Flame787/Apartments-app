const iconSource = `/icons/Arrow4.svg`;

export default function ProceedButton() {
  return (
    <button className="search-field__input-button proceed-button">
      CONTINUE
      <img
        className="toprated-apartments-widget-header-icon"
        src={iconSource}
        style={{ marginLeft: "16px", height: "16px", width: "auto", alignSelf: "center" }}
        alt="Right arrow"
      />
    </button>
  );
}
