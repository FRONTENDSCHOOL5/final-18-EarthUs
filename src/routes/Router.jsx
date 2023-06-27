/* eslint-disable no-undef */
// import React from "react";
import React, { Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "../components/common/header/Header";
import TabBar from "../components/common/tabBar/TabBar";
import ChatList from "../pages/chat/chatList/ChatList";
import ChatRoom from "../pages/chat/chatRoom/ChatRoom";
import Error404 from "../pages/error404/Error404";
import Feed from "../pages/feed/Feed";
import Follow from "../pages/follow/Follow";
import Intro from "../pages/intro/Intro";
import Onboarding from "../pages/onboarding/Onboarding";
import PostDetail from "../pages/post/postDetail/PostDetail";
import PostUpload from "../pages/post/postUpload/PostUpload";
import ProductDetail from "../pages/product/productDetail/ProductDetail";
import ProductUpload from "../pages/product/productUpload/ProductUpload";
import ProfileDetail from "../pages/profile/profileDetail/ProfileDetail";
import ProfileEdit from "../pages/profile/profileEdit/ProfileEdit";
import Search from "../pages/search/Search";
import SignIn from "../pages/sign/SignIn";
import SignUp from "../pages/sign/SignUp";
import Splash from "../pages/splash/Splash";

import InitRoute from "./InitRoute";
import PrivateRoute from "./PrivateRoute";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />

      <Route element={<InitRoute />}>
        <Route path="/intro" element={<Intro />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Header />}>
          {/* HOME */}
          <Route path="home" element={<Feed />} />
          <Route element={<TabBar />}>
            {/* SEARCH */}
            <Route
              path="search"
              element={
                <Suspense fallback={null}>
                  <Search />
                </Suspense>
              }
            />
            {/* NEWSLETTER */}
            <Route path="newsletter" element={<Feed />} />
          </Route>

          {/* CHAT */}
          <Route path="chat/*" element={<Outlet />}>
            <Route element={<TabBar />}>
              <Route path="" element={<ChatList />} />
              <Route path="list" element={<ChatList />} />
            </Route>
            <Route path="room" element={<ChatRoom />} />
            <Route path="*" element={<Error404 />} />
          </Route>

          {/* POST */}
          <Route path="post/*" element={<Outlet />}>
            <Route path=":postId">
              <Route path="" element={<PostDetail />} />
              <Route path="edit" element={<PostUpload />} />
              <Route path="*" element={<Error404 />} />
            </Route>
            <Route path="upload" element={<PostUpload />} />
          </Route>

          {/* PROFILE */}
          <Route path="profile/*" element={<Outlet />}>
            <Route path=":account/*" element={<Outlet />}>
              <Route element={<TabBar />}>
                <Route path="" element={<ProfileDetail />} />
              </Route>
              <Route path="follower" element={<Follow />} />
              <Route path="following" element={<Follow />} />
              <Route path="edit" element={<ProfileEdit />} />
              <Route path="product" element={<ProductDetail />} />
              <Route path="*" element={<Error404 />} />
            </Route>
          </Route>

          {/* PRODUCT */}
          <Route path="product/*" element={<Outlet />}>
            <Route path="upload" element={<ProductUpload />} />
            <Route path=":productId/*" element={<Outlet />}>
              <Route path="edit" element={<ProductUpload />} />
              <Route path="*" element={<Error404 />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Error404 />} />
        <Route path="/error" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
