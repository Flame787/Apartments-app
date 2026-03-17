// export const IMAGE_BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://tvojadomena.com/images"
//     : "http://localhost:5000/images";

// works in Vite:
export const IMAGE_BASE_URL =
  import.meta.env.PROD
    ? "https://mydomain.com/images"
    : "http://localhost:5000/images";

