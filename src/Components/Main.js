import React from "react";
import { Link, Outlet } from "react-router-dom";
import Login from "./Login";
import Resister from "./Resister";

const Main = () => {
  return (
    <div>
      <nav className="h2">
        <div className="mx-auto text-center">
          <Link className=" mx-4 text-decoration-none" to="/register">
            Register
          </Link>
          <Link className="text-decoration-none " to="/login">
            Login
          </Link>
        </div>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
