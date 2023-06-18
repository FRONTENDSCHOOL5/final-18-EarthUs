/* eslint-disable no-undef */
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "../components/common/header/Header";
import TabBar from "../components/common/tabBar/TabBar";
import ChatRoom from "../pages/chat/chatRoom/ChatRoom";
import Follow from "../pages/follow/Follow";
import Home from "../pages/home/Home";
import PostDetail from "../pages/post/postDetail/PostDetail";
import ProductDetail from "../pages/product/productDetail/ProductDetail";
import ProductUpload from "../pages/product/productUpload/ProductUpload";
import ProfileDetail from "../pages/profile/profileDetail/ProfileDetail";
import ProfileUpload from "../pages/profile/profileUpload/ProfileUpload";
import SignIn from "../pages/SignIn";

export default function Router() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" />
      <Route path="/onboarding" />

      <Route path="/" element={<Header />}>
        {/* HOME */}
        <Route element={<TabBar />}>
          <Route path="" element={<Home />} />
          <Route path="search" />
          <Route path="newsletter" />
        </Route>

        {/* CHAT */}
        <Route path="chat/*" element={<Outlet />}>
          <Route element={<TabBar />}>
            <Route path="" />
          </Route>
          <Route path="room" element={<ChatRoom />} />
        </Route>

        {/* POST */}
        <Route path="post/*" element={<Outlet />}>
          <Route path=":postId" element={<PostDetail />} />
          <Route path="upload" />
          <Route path="edit" />
        </Route>

        {/* PROFILE */}
        <Route path="profile/*" element={<Outlet />}>
          <Route path="" element={<SignIn />} />
          <Route path=":account/*" element={<Outlet />}>
            <Route element={<TabBar />}>
              <Route path="" element={<ProfileDetail />} />
              <Route path=":view" element={<ProfileDetail />} />
              <Route path="following" element={<Follow />} />
              <Route path="follower" element={<Follow />} />
            </Route>
            <Route path="upload" element={<ProfileUpload />} />
            <Route path="edit" element={<ProfileUpload />} />
          </Route>
        </Route>

        {/* PRODUCT */}
        <Route path="product/*" element={<Outlet />}>
          <Route path=":account" element={<ProductDetail />} />
          <Route path="upload" element={<ProductUpload />} />
          <Route path=":productId/edit" element={<ProductUpload />} />
        </Route>
      </Route>
    </Routes>
  );
}
