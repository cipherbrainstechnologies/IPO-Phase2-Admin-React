import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "./assets/css/style.bundle.css";
import "./assets/plugins/global/plugins.bundle.css";
import ReactModal from "react-modal";

const root = ReactDOM.createRoot(document.getElementById("root"));

ReactModal.setAppElement("#root");

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
