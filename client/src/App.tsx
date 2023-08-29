import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RootLayout from "./layouts/RootLayout";
import FeedPage from "./pages/FeedPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./layouts/AdminLayout";
import FollowUsersPage from "./pages/FollowUsersPage";
import UpcomingReleasesPage from "./pages/UpcomingReleasesPage";
import GamingTriviaPage from "./pages/GamingTriviaPage";
import LoginActivityPage from "./pages/LoginActivityPage";
import DeleteUserPage from "./pages/DeleteUserPage";
import EnableDisableFeaturesPage from "./pages/EnableDisableFeaturesPage";

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
            <Route
              path="upcoming-releases"
              element={<UpcomingReleasesPage />}
            />
            <Route path="gaming-trivia" element={<GamingTriviaPage />} />
            <Route path="admin" element={<AdminPage />}>
              <Route path="login-activity" element={<LoginActivityPage />} />
              <Route
                path="enable-disable-features"
                element={<EnableDisableFeaturesPage />}
              />
              <Route path="delete-user" element={<DeleteUserPage />} />
            </Route>
          </Route>
          <Route path="*" element={<p>Error 404: Page not found</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
