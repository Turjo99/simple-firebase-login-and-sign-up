import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Resister from "./Components/Resister";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Components/Main";
import Login from "./Components/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,

      children: [
        {
          path: "/",
          element: <Resister></Resister>,
        },
        {
          path: "/register",
          element: <Resister></Resister>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
