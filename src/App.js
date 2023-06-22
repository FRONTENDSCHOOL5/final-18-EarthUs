import * as React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import A11yHidden from "./components/common/a11yHidden/A11yHidden";
import Modal from "./components/common/modal/Modal";
import Router from "./routes/Router";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen />

      <h1>
        <A11yHidden>Earth Us</A11yHidden>
      </h1>
      <Modal />
      <Router />
    </>
  );
}
export default App;
