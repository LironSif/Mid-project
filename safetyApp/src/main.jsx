import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserDataProvider } from "./UserDataContext.jsx";
import { AuthProvider } from "./Auth/AutoContext.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <UserDataProvider>
      <App />
    </UserDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
