import { Router } from "express";
import {
  fetchAllApartments,
  fetchApartmentsByCategory,
  fetchApartmentById,
  searchApartments,
} from "../services/apiService.ts";

// import dotenv from "dotenv";

// dotenv.config();

const router = Router();

// GET all apartments
// router.get("/all", (req, res) => {
//   try {
//     const data = fetchAllApartments();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch apartments" });
//   }
// });

// GET all apartments (paginated)
router.get("/all", (req, res) => {
  try {
    const page = Number(req.query.page) || 0; // 0-based page index
    const pageSize = Number(req.query.pageSize) || 10;

    const all = fetchAllApartments(); // full list from cache

    // sorting on backend by ID:
    const sorted = [...all].sort((a, b) => a.id - b.id);

    const start = page * pageSize;
    const end = start + pageSize;

    const items = sorted.slice(start, end);

    // res.json is used to send a JSON response back to the client. Here, it sends an object:
    res.json({
      items,
      total: sorted.length,
      page,
      pageSize,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
});

// GET apartments by category
router.get("/category/:category", (req, res) => {
  try {
    const { category } = req.params;
    const data = fetchApartmentsByCategory(category);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category apartments" });
  }
});

// GET apartment by ID
router.get("/id/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = fetchApartmentById(id);

    if (!data) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch apartment" });
  }
});

// SEARCH apartments
router.get("/search", (req, res) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.json([]);
    }

    const data = searchApartments(q);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to search apartments" });
  }
});

// GET TOP-RATED apartments (paginated)
router.get("/top-rated", (req, res) => {
  try {
    const page = Number(req.query.page) || 0; // page number (0-based - 0 = first page, 1 = second page, etc.)
    const pageSize = Number(req.query.pageSize) || 10; // showing 10 items per page

    const all = fetchAllApartments();

    // Sort by rating DESC, then reviews_count DESC
    const sorted = [...all].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating; // primary sort by rating
      return b.reviews_count - a.reviews_count; // secondary sort by reviews_count (if ratings are equal)
    });

    const start = page * pageSize; // calculate starting index for pagination
    const end = start + pageSize; // slice the sorted array to get only the items for the current page

    const items = sorted.slice(start, end); // get the items for the current page

    res.json({
      // return the paginated results, along with total count for client-side pagination
      items,
      total: sorted.length,
      page,
      pageSize,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top-rated apartments" });
  }
});

// additional filtering (from SearchFilters) moved on backend:

router.get("/filter", (req, res) => {
  try {
    const {
      destination,
      minPrice,
      maxPrice,
      persons,
      amenities,
      category,
      page = 0,
      pageSize = 10,
    } = req.query;

    let results = fetchAllApartments();

    // GLOBAL SEARCH (searchTerm)
    if (req.query.search && typeof req.query.search === "string") {
      const q = req.query.search.toLowerCase();

      results = results.filter((apt) => {
        const name = apt.name?.toLowerCase() || "";
        const location = apt.location?.toLowerCase() || "";
        const category = apt.category?.toLowerCase() || "";
        // const description = apt.description?.toLowerCase() || "";
        // const tags = apt.tags?.map((t) => t.toLowerCase()) || [];

        return (
          name.includes(q) || location.includes(q) || category.includes(q)
          // || description.includes(q) ||
          // tags.some((t) => t.includes(q))
        );
      });
    }

    // destination
    if (destination && typeof destination === "string") {
      const dest = destination.toLowerCase();
      results = results.filter((apt) =>
        apt.location.toLowerCase().includes(dest),
      );
    }

    // price range
    if (minPrice) {
      results = results.filter(
        (apt) => apt.price_per_night >= Number(minPrice),
      );
    }
    if (maxPrice) {
      results = results.filter(
        (apt) => apt.price_per_night <= Number(maxPrice),
      );
    }

    // nr. of persons
    if (persons) {
      results = results.filter((apt) => apt.max_guests >= Number(persons));
    }

    // category
    if (category && typeof category === "string") {
      results = results.filter((apt) => apt.category === category);
    }

    // amenities (tags)
    if (amenities && typeof amenities === "string") {
      const required = amenities.split(",").map((a) => a.trim().toLowerCase());
      results = results.filter((apt) =>
        required.every(
          (
            am, // every - determins if all the members of an array satisfy the specified condition
          ) => apt.tags.map((t) => t.toLowerCase()).includes(am),
        ),
      );
    }

    // pagination
    const start = Number(page) * Number(pageSize);
    const end = start + Number(pageSize);

    const paginated = results.slice(start, end);

    res.json({
      items: paginated,
      total: results.length,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to filter apartments" });
  }
});

export default router;
