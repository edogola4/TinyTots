
import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Checkout = () => {
  // Retrieve cart items and user details from Redux.
  const cart = useSelector((state) => state.handleCart);
  const user = useSelector((state) => state.user); // assuming user info exists in state.user

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

  // Handler for billing form input changes.
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

  // Personalized greeting based on user details.
  const greeting = user && user.name
    ? `Hello, ${user.name}!`
    : "Welcome, valued customer!";

  // Component to display when the cart is empty.
  const EmptyCart = () => {
    return (
      <EmptyCartContainer>
        <EmptyMessage>No items in your cart</EmptyMessage>
        <StyledLink to="/">Continue Shopping</StyledLink>
      </EmptyCartContainer>
    );
  };

  // Component to show the checkout summary and billing form.
  const ShowCheckout = () => {
    return (
      <CheckoutContainer>
        <SummaryColumn>
          <SummaryCard>
            <SectionTitle>Order Summary</SectionTitle>
            <SummaryList>
              <SummaryItem>
                <span>Products ({totalItems})</span>
                <span>KSH {Math.round(subtotal)}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Shipping</span>
                <span>KSH {shipping}</span>
              </SummaryItem>
              <SummaryTotal>
                <span>Total Amount</span>
                <span>KSH {Math.round(subtotal + shipping)}</span>
              </SummaryTotal>
            </SummaryList>
          </SummaryCard>
        </SummaryColumn>
        <FormColumn>
          <BillingCard>
            <SectionTitle>Billing Address</SectionTitle>
            <GreetingText>{greeting} Please confirm your billing details.</GreetingText>
            <Form noValidate>
              <InputRow>
                <FormField>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    value={billingInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
                <FormField>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    value={billingInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </InputRow>
              <FormField>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={billingInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="1234 Main St"
                  value={billingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="address2">Address 2 (Optional)</Label>
                <Input
                  type="text"
                  id="address2"
                  name="address2"
                  placeholder="Apartment or suite"
                  value={billingInfo.address2}
                  onChange={handleInputChange}
                />
              </FormField>
              <InputRow>
                <FormField>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    id="country"
                    name="country"
                    value={billingInfo.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="India">Kenya</option>
                  </Select>
                </FormField>
                <FormField>
                  <Label htmlFor="state">County</Label>
                  <Select
                    id="state"
                    name="state"
                    value={billingInfo.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="Punjab">Nairobi</option>
                  </Select>
                </FormField>
                <FormField>
                  <Label htmlFor="zip">Zip</Label>
                  <Input
                    type="text"
                    id="zip"
                    name="zip"
                    placeholder="Zip code"
                    value={billingInfo.zip}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </InputRow>
              <SectionTitle>Payment</SectionTitle>
              <InputRow>
                <FormField>
                  <Label htmlFor="ccName">Name on Card</Label>
                  <Input
                    type="text"
                    id="ccName"
                    name="ccName"
                    placeholder="Cardholder's name"
                    value={billingInfo.ccName}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
                <FormField>
                  <Label htmlFor="ccNumber">Card Number</Label>
                  <Input
                    type="text"
                    id="ccNumber"
                    name="ccNumber"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={billingInfo.ccNumber}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </InputRow>
              <InputRow>
                <FormField>
                  <Label htmlFor="ccExpiration">Expiration</Label>
                  <Input
                    type="text"
                    id="ccExpiration"
                    name="ccExpiration"
                    placeholder="MM/YY"
                    value={billingInfo.ccExpiration}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
                <FormField>
                  <Label htmlFor="ccCVV">CVV</Label>
                  <Input
                    type="text"
                    id="ccCVV"
                    name="ccCVV"
                    placeholder="CVV"
                    value={billingInfo.ccCVV}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </InputRow>
              <SubmitButton type="submit" disabled>
                Continue to checkout
              </SubmitButton>
            </Form>
          </BillingCard>
        </FormColumn>
      </CheckoutContainer>
    );
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <PageTitle>Checkout</PageTitle>
        {cart.length ? <ShowCheckout /> : <EmptyCart />}
      </PageWrapper>
      <Footer />
    </>
  );
};

export default Checkout;

/* Styled Components */

const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  background: #fff6f0;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #d35400;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 1.5rem;
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const EmptyMessage = styled.h4`
  font-size: 1.8rem;
  color: #d35400;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  padding: 0.8rem 1.2rem;
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
  &:hover {
    background: linear-gradient(45deg, #f39c12, #ff6b6b);
  }
`;

const CheckoutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
`;

const SummaryColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

const FormColumn = styled.div`
  flex: 2;
  min-width: 300px;
`;

const SummaryCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h4`
  font-size: 1.6rem;
  color: #d35400;
  margin-bottom: 1rem;
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SummaryItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #555;
`;

const SummaryTotal = styled(SummaryItem)`
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 1px solid #eee;
  padding-top: 0.8rem;
  margin-top: 1rem;
  color: #d35400;
`;

const BillingCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const GreetingText = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FormField = styled.div`
  flex: 1;
  min-width: 150px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #d35400;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #d35400;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
  border: none;
  color: #fff;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease, background 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;
