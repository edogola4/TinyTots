import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  // Retrieve cart items and (optionally) user details from Redux.
  const cart = useSelector((state) => state.handleCart);
  const user = useSelector((state) => state.user); // assuming user info exists in state.user
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  // Local state for the billing address form.
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCVV: ""
  });

  // Handlers for billing form input changes.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate order details.
  let subtotal = 0;
  let shipping = 30.0;
  let totalItems = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    totalItems += item.qty;
  });

  // Personalised greeting based on user details.
  const greeting = user && user.name ? `Hello, ${user.name}!` : "Welcome, valued customer!";

  // Component to display when the cart is empty.
  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No items in your cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Component to show the checkout summary and billing form.
  const ShowCheckout = () => {
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            {/* Order Summary Section */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems}) <span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div><strong>Total Amount</strong></div>
                      <span><strong>${Math.round(subtotal + shipping)}</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Billing Address Form */}
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing Address</h4>
                </div>
                <div className="card-body">
                  <p className="mb-3">{greeting} Please confirm your billing details.</p>
                  <form className="needs-validation" noValidate>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          placeholder=""
                          value={billingInfo.firstName}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>
                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          placeholder=""
                          value={billingInfo.lastName}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>
                      <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="you@example.com"
                          value={billingInfo.email}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address.
                        </div>
                      </div>
                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="1234 Main St"
                          value={billingInfo.address}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="address2" className="form-label">
                          Address 2 <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          name="address2"
                          placeholder="Apartment or suite"
                          value={billingInfo.address2}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-5 my-1">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <select
                          className="form-select"
                          id="country"
                          name="country"
                          value={billingInfo.country}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Choose...</option>
                          <option value="India">India</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>
                      <div className="col-md-4 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <select
                          className="form-select"
                          id="state"
                          name="state"
                          value={billingInfo.state}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Choose...</option>
                          <option value="Punjab">Punjab</option>
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>
                      <div className="col-md-3 my-1">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          name="zip"
                          placeholder=""
                          value={billingInfo.zip}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h4 className="mb-3">Payment</h4>
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="cc-name" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-name"
                          name="ccName"
                          placeholder=""
                          value={billingInfo.ccName}
                          onChange={handleInputChange}
                          required
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                        <div className="invalid-feedback">
                          Name on card is required.
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="cc-number" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                          name="ccNumber"
                          placeholder=""
                          value={billingInfo.ccNumber}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Credit card number is required.
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="cc-expiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          name="ccExpiration"
                          placeholder=""
                          value={billingInfo.ccExpiration}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Expiration date required.
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="cc-cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-cvv"
                          name="ccCVV"
                          placeholder=""
                          value={billingInfo.ccCVV}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Security code required.
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <button className="w-100 btn btn-primary" type="submit" disabled>
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {cart.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
