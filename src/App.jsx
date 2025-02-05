import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import { AuthProvider } from "./context/AuthContext";
import { DogsProvider } from "./context/DogsContext";
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DogsProvider>
          <Routes>
            <Route index element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </DogsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
