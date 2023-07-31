import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// const container = document.getElementById("root");
// const root = ReactDOM.createRoot(container);
const peristor = persistStore(store);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate persistor={peristor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading perist state...</div>}
        persistor={peristor}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
