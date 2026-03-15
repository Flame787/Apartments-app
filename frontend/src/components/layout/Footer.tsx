import ApartmentsMainTitle from "../ui/ApartmentsMainTitle";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-message">
        Find your perfect stay, wherever you go.
      </div>

      <ApartmentsMainTitle />

      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </div>
  );
}
