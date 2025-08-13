import React from "react";
import ReactDOM from "react-dom/client";
// Import third-party CSS libraries (no need to specify "../node_modules")
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import page components – update these as your project evolves!
import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Dashboard,
  ForgotPassword,
} from "./pages";

// Import custom components
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Create the root element for your React app
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* ScrollToTop resets scroll position on route changes */}
    <ScrollToTop>
      {/* Provider makes the Redux store available throughout your app */}
      <Provider store={store}>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </AuthProvider>
      </Provider>
    </ScrollToTop>
    {/* Toaster component for notifications; position can be adjusted */}
    <Toaster position="top-right" />
  </BrowserRouter>
);
