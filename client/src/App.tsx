import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import RootLayout from "./pages/RootLayout";
import WritePage from "./pages/admin/Write";
import LoginPage from "./pages/Login";
import TopicPage from "./pages/admin/topic/Topics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      { path: "/admin/post", element: <WritePage /> },
      {
        path: "/admin/topic",
        element: <TopicPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
