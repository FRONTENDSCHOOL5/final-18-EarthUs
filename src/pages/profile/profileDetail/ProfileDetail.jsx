import React from "react";

import A11yHidden from "../../../components/common/a11yHidden/A11yHidden";
import ProfileFeed from "../../../components/profileFeed/ProfileFeed";
import ProfileHeader from "../../../components/profileHeader/ProfileHeader";
import ProfileProduct from "../../../components/profileProduct/ProfileProduct";

export default function Profile() {
  return (
    <section>
      <h2>
        <A11yHidden>프로필</A11yHidden>
      </h2>
      <ProfileHeader />
      <ProfileProduct />
      <ProfileFeed />
    </section>
  );
}
