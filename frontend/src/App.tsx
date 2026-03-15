import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import FavoritesPage from "./pages/FavoritesPage";
import LatestPage from "./pages/TopRatedPage";
import ArticlePage from "./pages/ApartmentPage";
import ErrorPage from "./pages/ErrorPage";
import "./styles/main.scss";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/top-rated" element={<LatestPage />} />
        <Route path="/apartment/:id" element={<ArticlePage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
