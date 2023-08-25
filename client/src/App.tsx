import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RootLayout from "./layouts/RootLayout";
import FeedPage from "./pages/FeedPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import FollowUsersPage from "./pages/FollowUsersPage";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<RootLayout />}>
            <Route index element={<FeedPage />} />
            <Route path="users/:username" element={<UserPage />} />
            <Route path="following" element={<FollowUsersPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="*" element={<p>Error 404: Page not found</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
