import React from "react";
import { Outlet } from "react-router-dom";

// import useApiQuery from "../hooks/useApiQuery";
import Error404 from "../pages/error404/Error404";

export default function InitRoute() {
  const token = localStorage.getItem("privateData");

  return token ? <Error404 /> : <Outlet />;
}
