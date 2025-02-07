import React from "react";
import ReactDOM from "react-dom/client";
// Import third-party CSS libraries (no need to specify "../node_modules")
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

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
} from "./pages";

// Import custom components
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

// Create the root element for your React app
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* ScrollToTop resets scroll position on route changes */}
    <ScrollToTop>
      {/* Provider makes the Redux store available throughout your app */}
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Fallback routes for unknown paths */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </ScrollToTop>
    {/* Toaster component for notifications; position can be adjusted */}
    <Toaster position="top-right" />
  </BrowserRouter>
);
