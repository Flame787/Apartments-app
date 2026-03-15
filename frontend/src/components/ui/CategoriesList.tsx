import CategoryButton from "./CategoryButton";

const categories = [
  "Home",
  "Apartments",
  "Studio",
  "Houses",
  "Camping",
  "Glamping",
  "Hotels",
  "Favorites",
];

export default function CategoriesList() {
  return (
    <ul className="categories-list">
      {categories.map((categ) => (
        <li key={categ}>
          <CategoryButton category={categ} />
        </li>
      ))}
    </ul>
  );
}
