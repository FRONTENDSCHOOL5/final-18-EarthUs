import React from "react";
// import ReactDOM from 'react-dom'; //구버전
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";
import Loading from "./components/loading/Loading";

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

root.render(
  <React.Suspense fallback={<Loading />}>
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.Suspense>,
);
