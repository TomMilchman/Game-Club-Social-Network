import "./App.css";
import LoginPage from "./pages/loginPage";
import RootLayout from "./layouts/rootLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/feed";
import UserPage from "./pages/userPage";
import SignUpPage from "./pages/signUpPage";

function App() {
  // const isAuthenticated = () => {

  // }

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<RootLayout />}>
            <Route path="feed" element={<Feed />} />
            <Route path="users/:username" element={<UserPage />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
