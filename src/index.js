import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./store/AppProvider";
import { AuthProvider } from "./store/AuthProvider";
import App from "./App";
import "./index.scss";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
