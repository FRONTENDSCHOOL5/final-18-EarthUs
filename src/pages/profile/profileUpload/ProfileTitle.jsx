import React from "react";

import { ProfileTitleSection, H2, P } from "./ProfileUpload.style";

export default function ProfileTitle({ subject, description }) {
  return (
    <ProfileTitleSection className="title">
      <H2>{subject}</H2>
      <P>{description}</P>
    </ProfileTitleSection>
  );
}
