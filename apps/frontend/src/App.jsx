import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import { AuthProvider } from "./contexts/Authcontext";
import SinglePost from "./components/SinglePost/SinglePost";
import Main from "./pages/Profile/Main";
import Feed from "./components/Feed/Feed";
import Search from "./pages/Search/Search";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-full bg-black min-h-screen">
          <Routes>
            {/* Make Home a parent route with nested routes */}
            <Route path="/" element={<Home />}>
              <Route index element={<Feed />} />
              <Route path="profile/:username" element={<Main />} />
              <Route path="post/:postId" element={<SinglePost />} />
              <Route path="search" element={<Search />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
