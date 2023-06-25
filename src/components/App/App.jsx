import { Routes, Route } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import HomePage from "../../pages/HomePage/HomePage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppHeader />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;