import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ServiceProvider } from "./contexts/ServiceContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./components/Toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <ServiceProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </ServiceProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
