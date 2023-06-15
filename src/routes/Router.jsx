import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "../components/common/header/Header";
import TabBar from "../components/common/tabBar/TabBar";
import Follow from "../pages/follow/Follow";
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
        </Route>
        <Route path="/post/*" element={<Outlet />}>
          <Route path="upload" />
        </Route>
        <Route path="/product/upload" />
        <Route path="/chat/*" element={<Outlet />}>
          <Route element={<TabBar />}>
            <Route path="list" />
          </Route>
          <Route path="room" />
        </Route>
        <Route path="/profile/*">
          <Route element={<TabBar />}>
            <Route path=":account" />
            <Route path=":account/following" element={<Follow />} />
            <Route path=":account/follower" element={<Follow />} />
          </Route>
          <Route path=":account/upload" />
        </Route>
      </Route>
    </Routes>
  );
}
