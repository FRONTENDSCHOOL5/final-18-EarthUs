import * as React from "react";

import Router from "./routes/Router";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <h1>🌎 Earth Us</h1>
      <Router />
    </>
  );
}
export default App;
