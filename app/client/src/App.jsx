import { useContext, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

//STYLES
import "./styles/index.scss";
import "./styles/main.scss";

//COMPONETS
import Layout from "./componets/Layout";

//PAGES
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { AuthContext } from "./context/authContext";

function App() {
  //const [isDarkMode, setDarkMode] = useState(false);
  //const [isLoggedIn, setLoggedIn] = useState(true);

  // const darkModeToggleFunc = () => {
  //   setDarkMode((prev) => {
  //     return !prev;
  //   });
  // };

  const { isLoggedIn } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login/" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          {/* <Layout isDarkMode={isDarkMode} darkModeToggle={darkModeToggleFunc} /> */}
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
