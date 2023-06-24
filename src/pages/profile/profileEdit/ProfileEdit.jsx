/* eslint-disable import/namespace */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import userDataAtom from "../../../recoil/userDataAtom";
import { NO_PROFILE_IMAGE } from "../../../utils/config";
import ProfileImageField from "../profileUpload/ProfileImageField";

import ProfileEditForm from "./ProfileEditForm";

export default function ProfileUpload() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [profileImage, setProfileImage] = useState(NO_PROFILE_IMAGE);

  // * userData가 변경되면 로컬스토리지 데이터 갱신.
  useEffect(() => {
    if (
      userData &&
      JSON.stringify(userData) !== localStorage.getItem("userData")
    ) {
      localStorage.setItem("userData", JSON.stringify(userData));
      console.table(userData);
    }
  }, [userData]);

  return (
    <>
      <ProfileImageField
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        userData={userData}
      />
      <ProfileEditForm
        profileImage={profileImage}
        userData={userData}
        setUserData={setUserData}
        pathname={pathname}
        navigate={navigate}
        setProfileImage={setProfileImage}
      />
    </>
  );
}
