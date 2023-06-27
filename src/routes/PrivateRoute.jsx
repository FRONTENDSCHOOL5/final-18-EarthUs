import React from "react";
import { Outlet } from "react-router-dom";

import Error404 from "../pages/error404/Error404";

export default function PrivateRoute() {
  const token = localStorage.getItem("privateData");

  return token ? <Outlet /> : <Error404 />;
}
