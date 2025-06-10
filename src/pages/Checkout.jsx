import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Checkout = () => {
  // Retrieve cart items and user details from Redux
  const cart = useSelector((state) => state.handleCart);
  const user = useSelector((state) => state.user);

  // Local state for the billing address form
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

  // State for form validation and submission
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setBillingInfo(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        country: user.country || "",
        state: user.state || "",
        zip: user.zip || ""
      }));
    }
  }, [user]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCardNumber = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return cleanNumber.length >= 13 && cleanNumber.length <= 19 && /^\d+$/.test(cleanNumber);
  };

  const validateExpiration = (expiration) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiration)) return false;
    
    const [month, year] = expiration.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return false;
    }
    
    return true;
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!billingInfo.firstName.trim()) newErrors.firstName = "First name is required";
    if (!billingInfo.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!billingInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(billingInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!billingInfo.address.trim()) newErrors.address = "Address is required";
    if (!billingInfo.country) newErrors.country = "Please select a country";
    if (!billingInfo.state) newErrors.state = "Please select a county";
    if (!billingInfo.zip.trim()) newErrors.zip = "Zip code is required";
    if (!billingInfo.ccName.trim()) newErrors.ccName = "Name on card is required";
    if (!billingInfo.ccNumber.trim()) {
      newErrors.ccNumber = "Card number is required";
    } else if (!validateCardNumber(billingInfo.ccNumber)) {
      newErrors.ccNumber = "Please enter a valid card number";
    }
    if (!billingInfo.ccExpiration.trim()) {
      newErrors.ccExpiration = "Expiration date is required";
    } else if (!validateExpiration(billingInfo.ccExpiration)) {
      newErrors.ccExpiration = "Please enter a valid expiration date (MM/YY)";
    }
    if (!billingInfo.ccCVV.trim()) {
      newErrors.ccCVV = "CVV is required";
    } else if (!validateCVV(billingInfo.ccCVV)) {
      newErrors.ccCVV = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler for billing form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'ccNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setBillingInfo(prev => ({ ...prev, [name]: formattedValue }));
    }
    // Format expiration date
    else if (name === 'ccExpiration') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      setBillingInfo(prev => ({ ...prev, [name]: formattedValue }));
    }
    // Format CVV (numbers only)
    else if (name === 'ccCVV') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 4);
      setBillingInfo(prev => ({ ...prev, [name]: formattedValue }));
    }
    else {
      setBillingInfo(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the order to your backend
      console.log('Order submitted:', {
        billingInfo,
        cart,
        total: subtotal + shipping
      });

      setShowOrderSuccess(true);
    } catch (error) {
      console.error('Order submission failed:', error);
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate order details
  let subtotal = 0;
  let shipping = 30.0;
  let totalItems = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    totalItems += item.qty;
  });

  // Apply free shipping for orders over KSH 1000
  if (subtotal > 1000) {
    shipping = 0;
  }

  // Personalized greeting based on user details
  const greeting = user && user.name
    ? `Hello, ${user.name}!`
    : "Welcome, valued customer!";

  // Success message component
  const OrderSuccess = () => (
    <SuccessContainer>
      <SuccessIcon>✓</SuccessIcon>
      <SuccessTitle>Order Placed Successfully!</SuccessTitle>
      <SuccessMessage>
        Thank you for your purchase. You will receive a confirmation email shortly.
      </SuccessMessage>
      <StyledLink to="/">Continue Shopping</StyledLink>
    </SuccessContainer>
  );

  // Component to display when the cart is empty
  const EmptyCart = () => (
    <EmptyCartContainer>
      <EmptyMessage>No items in your cart</EmptyMessage>
      <StyledLink to="/">Continue Shopping</StyledLink>
    </EmptyCartContainer>
  );

  // Component to show the checkout summary and billing form
  const ShowCheckout = () => (
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
              <span>{shipping === 0 ? 'FREE' : `KSH ${shipping}`}</span>
            </SummaryItem>
            {subtotal > 1000 && (
              <FreeShippingNote>
                🎉 You qualify for free shipping!
              </FreeShippingNote>
            )}
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
          <Form onSubmit={handleSubmit} noValidate>
            <InputRow>
              <FormField>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Your first name"
                  value={billingInfo.firstName}
                  onChange={handleInputChange}
                  hasError={!!errors.firstName}
                  required
                />
                {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
              </FormField>
              <FormField>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Your last name"
                  value={billingInfo.lastName}
                  onChange={handleInputChange}
                  hasError={!!errors.lastName}
                  required
                />
                {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
              </FormField>
            </InputRow>

            <FormField>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={billingInfo.email}
                onChange={handleInputChange}
                hasError={!!errors.email}
                required
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </FormField>

            <FormField>
              <Label htmlFor="address">Address *</Label>
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="1234 Main St"
                value={billingInfo.address}
                onChange={handleInputChange}
                hasError={!!errors.address}
                required
              />
              {errors.address && <ErrorText>{errors.address}</ErrorText>}
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
                <Label htmlFor="country">Country *</Label>
                <Select
                  id="country"
                  name="country"
                  value={billingInfo.country}
                  onChange={handleInputChange}
                  hasError={!!errors.country}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="Kenya">Kenya</option>
                </Select>
                {errors.country && <ErrorText>{errors.country}</ErrorText>}
              </FormField>
              <FormField>
                <Label htmlFor="state">County *</Label>
                <Select
                  id="state"
                  name="state"
                  value={billingInfo.state}
                  onChange={handleInputChange}
                  hasError={!!errors.state}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="Nairobi">Nairobi</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Kisumu">Kisumu</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Eldoret">Eldoret</option>
                </Select>
                {errors.state && <ErrorText>{errors.state}</ErrorText>}
              </FormField>
              <FormField>
                <Label htmlFor="zip">Zip Code *</Label>
                <Input
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="00100"
                  value={billingInfo.zip}
                  onChange={handleInputChange}
                  hasError={!!errors.zip}
                  required
                />
                {errors.zip && <ErrorText>{errors.zip}</ErrorText>}
              </FormField>
            </InputRow>

            <SectionTitle>Payment Information</SectionTitle>
            <InputRow>
              <FormField>
                <Label htmlFor="ccName">Name on Card *</Label>
                <Input
                  type="text"
                  id="ccName"
                  name="ccName"
                  placeholder="Cardholder's name"
                  value={billingInfo.ccName}
                  onChange={handleInputChange}
                  hasError={!!errors.ccName}
                  required
                />
                {errors.ccName && <ErrorText>{errors.ccName}</ErrorText>}
              </FormField>
              <FormField>
                <Label htmlFor="ccNumber">Card Number *</Label>
                <Input
                  type="text"
                  id="ccNumber"
                  name="ccNumber"
                  placeholder="1234 5678 9012 3456"
                  value={billingInfo.ccNumber}
                  onChange={handleInputChange}
                  hasError={!!errors.ccNumber}
                  maxLength="19"
                  required
                />
                {errors.ccNumber && <ErrorText>{errors.ccNumber}</ErrorText>}
              </FormField>
            </InputRow>

            <InputRow>
              <FormField>
                <Label htmlFor="ccExpiration">Expiration *</Label>
                <Input
                  type="text"
                  id="ccExpiration"
                  name="ccExpiration"
                  placeholder="MM/YY"
                  value={billingInfo.ccExpiration}
                  onChange={handleInputChange}
                  hasError={!!errors.ccExpiration}
                  maxLength="5"
                  required
                />
                {errors.ccExpiration && <ErrorText>{errors.ccExpiration}</ErrorText>}
              </FormField>
              <FormField>
                <Label htmlFor="ccCVV">CVV *</Label>
                <Input
                  type="text"
                  id="ccCVV"
                  name="ccCVV"
                  placeholder="123"
                  value={billingInfo.ccCVV}
                  onChange={handleInputChange}
                  hasError={!!errors.ccCVV}
                  maxLength="4"
                  required
                />
                {errors.ccCVV && <ErrorText>{errors.ccCVV}</ErrorText>}
              </FormField>
            </InputRow>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : `Complete Order - KSH ${Math.round(subtotal + shipping)}`}
            </SubmitButton>
          </Form>
        </BillingCard>
      </FormColumn>
    </CheckoutContainer>
  );

  return (
    <>
      <Navbar />
      <PageWrapper>
        <PageTitle>Checkout</PageTitle>
        {showOrderSuccess ? (
          <OrderSuccess />
        ) : cart.length ? (
          <ShowCheckout />
        ) : (
          <EmptyCart />
        )}
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

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: #27ae60;
  background: rgba(39, 174, 96, 0.1);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h2`
  color: #27ae60;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: #666;
  margin-bottom: 2rem;
  max-width: 400px;
`;

const StyledLink = styled(Link)`
  padding: 0.8rem 1.2rem;
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(45deg, #f39c12, #ff6b6b);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  position: sticky;
  top: 2rem;
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

const FreeShippingNote = styled.div`
  background: #e8f5e8;
  color: #27ae60;
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  margin: 1rem 0;
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
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.hasError ? '#e74c3c' : '#ccc'};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.hasError ? '#fdf2f2' : 'white'};
  
  &:focus {
    border-color: ${props => props.hasError ? '#e74c3c' : '#d35400'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(211, 84, 0, 0.1)'};
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid ${props => props.hasError ? '#e74c3c' : '#ccc'};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.hasError ? '#fdf2f2' : 'white'};
  
  &:focus {
    border-color: ${props => props.hasError ? '#e74c3c' : '#d35400'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(211, 84, 0, 0.1)'};
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.3rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.disabled ? '#bdc3c7' : 'linear-gradient(45deg, #ff6b6b, #f39c12)'};
  border: none;
  color: #fff;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;