import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import globalStore from "./states/globalStore.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={globalStore}>
          <App />
    </Provider>
);
