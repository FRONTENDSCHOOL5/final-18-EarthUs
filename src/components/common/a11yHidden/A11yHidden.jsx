import React from "react";

import ScreenOut from "./a11yHidden.style";

export default function A11yHidden({ children }) {
  return <ScreenOut>{children}</ScreenOut>;
}

// ✅ Usage
// <A11yHidden>Hidden Message</A11yHidden>
