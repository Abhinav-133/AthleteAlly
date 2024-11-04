// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// createRoot(document.getElementById("root")).render(
//   // <StrictMode>
//   //   <App />
//   // </StrictMode>,
//   // <App />
//   ReactDOM.render(
//     <UserProvider>
//       <App />
//     </UserProvider>,
//     document.getElementById('root')
  
// );
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./UserContext"; // Import UserProvider
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
