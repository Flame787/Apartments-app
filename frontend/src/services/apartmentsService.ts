const BASE_URL = "http://localhost:5000/api/apartments";

// export async function getAllApartments() {
//   const res = await fetch(`${BASE_URL}/all`);
//   return res.json();
// }

// export async function getAllApartments(page: number = 0, pageSize: number = 10) {
//   const res = await fetch(
//     `${BASE_URL}/all?page=${page}&pageSize=${pageSize}`
//   );
//   return res.json();
// }

export async function getAllApartments(page: number = 0, pageSize: number = 10) {
  const safePage = Number.isFinite(page) ? page : 0;
  const safePageSize = Number.isFinite(pageSize) ? pageSize : 10;

  const res = await fetch(
    `${BASE_URL}/all?page=${safePage}&pageSize=${safePageSize}`
  );
  return res.json();
}


export async function getApartmentsByCategory(category: string) {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  return res.json();
}

export async function getApartmentById(id: number) {
  const res = await fetch(`${BASE_URL}/id/${id}`);
  return res.json();
}

export async function searchApartments(query: string) {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  return res.json();
}

export async function getTopRatedApartments(page: number, pageSize: number) {
  const res = await fetch(
    `${BASE_URL}/top-rated?page=${page}&pageSize=${pageSize}`,
  );
  return res.json();
}

export async function getFilteredApartments(filters: any) {
  const params = new URLSearchParams();

  if (filters.destination) params.append("destination", filters.destination);
  if (filters.persons) params.append("persons", filters.persons);
  if (filters.priceRange) {
    params.append("minPrice", filters.priceRange[0]);
    params.append("maxPrice", filters.priceRange[1]);
  }
  if (filters.accommodation) params.append("category", filters.accommodation);

  if (filters.toggles) {
    const amenities = Object.keys(filters.toggles)
      .filter((k) => filters.toggles[k])
      .join(",");
    if (amenities) params.append("amenities", amenities);
  }

  // pagination (optional) - not needed on frontend
  // params.append("page", "0");
  // params.append("pageSize", "1000");

  const res = await fetch(`${BASE_URL}/filter?${params.toString()}`);
  return res.json();
}
