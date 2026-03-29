import { APARTMENTS } from "../../../backend/src/utils/apartments";

export const getUniqueLocations = () => {
  const locations = APARTMENTS.map((item) => item.location);

  const uniqueSorted = [...new Set(locations)].sort((a, b) =>
    // new Set - is removing duplicates, then sorting alphabetically:
    a.localeCompare(b, "hr"),
  );

  console.log(uniqueSorted);

  return uniqueSorted;
};

export default getUniqueLocations;
