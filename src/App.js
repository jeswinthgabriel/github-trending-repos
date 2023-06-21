import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ReposPage from "./pages/ReposPage";
import RepoName from "./pages/RepoName";
import NotFound from "./pages/NotFound";
import HomeLayout from "./layout/HomeLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/repos" element={<ProtectedLayout />}>
        <Route index element={<ReposPage />} />
        <Route path=":slug1/:slug2" element={<RepoName />} />
      </Route>
    </Routes>
  );
}

export default App;
