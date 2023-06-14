import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { Header, HeaderProfile } from "../components/common/header/Header";
import TabBar from "../components/common/tabBar/TabBar";
import ProductUpload from "../pages/product/productUpload/ProductUpload";
import SignIn from "../pages/SignIn";

export default function Router() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" />
      <Route path="/onboarding" />
      <Route path="/" element={<Header />}>
        <Route element={<TabBar />}>
          <Route path="/home" />
          <Route path="/search" />
          <Route path="/newsletter" />
          <Route path="/follow/*" element={<Outlet />}>
            <Route path="following" />
            <Route path="follower" />
          </Route>
        </Route>
        <Route path="/post/*" element={<Outlet />}>
          <Route path="upload" />
        </Route>
        <Route path="product/upload" element={<ProductUpload />} />
        <Route path="/chat/*" element={<Outlet />}>
          <Route element={<TabBar />}>
            <Route path="list" />
          </Route>
          <Route path="room" />
        </Route>
      </Route>
      <Route path="/profile/*">
        <Route path=":account" element={<HeaderProfile />} />
        <Route path=":account/profile-upload" element={<Header />} />
      </Route>
    </Routes>
  );
}
