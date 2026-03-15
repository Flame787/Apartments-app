import express from "express";
// import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import apartmentsRoutes from "./routes/apartmentsRoutes.ts";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/apartments", apartmentsRoutes);
app.use("/images", express.static("public/images"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
