/* eslint-disable no-undef */
/* eslint-disable-next-line import/first */
import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

const Header = lazy(() => import("../components/common/header/Header"));
const TabBar = lazy(() => import("../components/common/tabBar/TabBar"));
const ChatList = lazy(() => import("../pages/chat/chatList/ChatList"));
const ChatRoom = lazy(() => import("../pages/chat/chatRoom/ChatRoom"));
const Error404 = lazy(() => import("../pages/error404/Error404"));
const Feed = lazy(() => import("../pages/feed/Feed"));
const Follow = lazy(() => import("../pages/follow/Follow"));
const Intro = lazy(() => import("../pages/intro/Intro"));
const Onboarding = lazy(() => import("../pages/onboarding/Onboarding"));
const PostDetail = lazy(() => import("../pages/post/postDetail/PostDetail"));
const PostUpload = lazy(() => import("../pages/post/postUpload/PostUpload"));
const ProductDetail = lazy(() => import("../pages/product/productDetail/ProductDetail"));
const ProductUpload = lazy(() => import("../pages/product/productUpload/ProductUpload"));
const ProfileDetail = lazy(() => import("../pages/profile/profileDetail/ProfileDetail"));
const ProfileEdit = lazy(() => import("../pages/profile/profileEdit/ProfileEdit"));
const Search = lazy(() => import("../pages/search/Search"));
const SignIn = lazy(() => import("../pages/sign/SignIn"));
const SignUp = lazy(() => import("../pages/sign/SignUp"));
const Splash = lazy(() => import("../pages/splash/Splash"));

const InitRoute = lazy(() => import("./InitRoute"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));

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
