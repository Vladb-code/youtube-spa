import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
      {/* <BrowserRouter basename="/youtube-spa">
        <App />
      </BrowserRouter> */}
    </Provider>
  </React.StrictMode>,
);
