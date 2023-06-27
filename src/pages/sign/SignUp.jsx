/* eslint-disable import/namespace */
/* eslint-disable no-console */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { NO_PROFILE_IMAGE } from "../../utils/config";
import ProfileUpload from "../profile/profileUpload/ProfileUpload";

export default function SignUp() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(NO_PROFILE_IMAGE);

  return (
    <ProfileUpload
      profileImage={profileImage}
      pathname={pathname}
      navigate={navigate}
      setProfileImage={setProfileImage}
    />
  );
}
