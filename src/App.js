import * as React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import A11yHidden from "./components/common/a11yHidden/A11yHidden";
import Modal from "./components/common/modal/Modal";
import QrCode from "./components/common/qrCode/QrCode";
import Router from "./routes/Router";
import GlobalFont from "./styles/GlobalFont";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalFont />
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen />

      <h1>
        <A11yHidden>Earth Us</A11yHidden>
      </h1>
      <Modal />
      <Router />
      <QrCode />
    </>
  );
}
export default App;
