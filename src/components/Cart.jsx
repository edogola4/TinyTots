import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  // Retrieve cart items and (optionally) user details from Redux store.
  const cartItems = useSelector((state) => state.handleCart);
  const user = useSelector((state) => state.user); // assumes user info exists in state.user
  const dispatch = useDispatch();

  // Handlers to add and remove items from the cart.
  // NOTE: For removal, we now pass the product ID.
  const addItem = (product) => {
    dispatch(addCart(product));
  };
  const removeItem = (product) => {
    dispatch(delCart(product.id));
  };

  // Handler to completely remove an item regardless of its quantity.
  const removeEntireItem = (product) => {
    // You might have a separate action for this,
    // but if not, calling delCart repeatedly or in your reducer 
    // checking product id may suffice.
    dispatch(delCart(product.id));
  };

  // Component to display when the cart is empty with a friendly, personalised message.
  const EmptyCart = () => {
    return (
      <EmptyCartContainer>
        <EmptyCartCard>
          <EmptyTitle>Your cart is feeling lonely!</EmptyTitle>
          <EmptyMessage>Add some items to brighten up your day.</EmptyMessage>
          <StyledLink to="/">Continue Shopping</StyledLink>
        </EmptyCartCard>
      </EmptyCartContainer>
    );
  };

  // Component to display the cart contents along with an order summary.
  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });
    return (
      <CartSection>
        <CartContainer>
          {/* Personalised greeting if user information exists */}
          {user && user.name && (
            <UserGreeting>
              Hello, {user.name}! Here's your cart:
            </UserGreeting>
          )}
          <CartContent>
            <ItemsContainer>
              {cartItems.map((item) => (
                <CartItem key={item.id}>
                  <ItemImage src={item.image} alt={item.title} />
                  <ItemDetails>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemQuantity>
                      <ActionButton onClick={() => removeItem(item)}>
                        –
                      </ActionButton>
                      <QuantityText>{item.qty}</QuantityText>
                      <ActionButton onClick={() => addItem(item)}>
                        +
                      </ActionButton>
                      <RemoveButton onClick={() => removeEntireItem(item)}>
                        <FaTrash />
                      </RemoveButton>
                    </ItemQuantity>
                    <ItemPrice>
                      {item.qty} x KSH{item.price}
                    </ItemPrice>
                  </ItemDetails>
                </CartItem>
              ))}
            </ItemsContainer>
            {/* Order Summary Section */}
            <OrderSummary>
              <SummaryCard>
                <SummaryTitle>Order Summary</SummaryTitle>
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
                <CheckoutButton to="/checkout">
                  Go to Checkout
                </CheckoutButton>
              </SummaryCard>
            </OrderSummary>
          </CartContent>
        </CartContainer>
      </CartSection>
    );
  };

  return (
    <>
      <Navbar />
      <CartWrapper>
        <CartTitle>Cart</CartTitle>
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </CartWrapper>
      <Footer />
    </>
  );
};

export default Cart;

/* Styled Components */

const CartWrapper = styled.div`
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  background: #fff6f0;
  min-height: 100vh;
`;

const CartTitle = styled.h1`
  text-align: center;
  color: #d35400;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 1.5rem;
`;

const EmptyCartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const EmptyCartCard = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 2rem 3rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const EmptyTitle = styled.h4`
  font-size: 1.8rem;
  color: #d35400;
  margin-bottom: 1rem;
`;

const EmptyMessage = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
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
  }
`;

const CartSection = styled.section`
  background: #fff;
  padding: 2rem 0;
`;

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const UserGreeting = styled.h5`
  text-align: right;
  color: #555;
  margin-bottom: 1rem;
  font-style: italic;
`;

const CartContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ItemsContainer = styled.div`
  flex: 2;
`;

const OrderSummary = styled.div`
  flex: 1;
`;

const CartItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 100px;
  height: 75px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.h6`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ActionButton = styled.button`
  background: linear-gradient(45deg, #f39c12, #ff6b6b);
  border: none;
  color: #fff;
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const QuantityText = styled.span`
  font-size: 1rem;
  color: #555;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #d35400;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: #d35400;
  font-weight: bold;
`;

const SummaryCard = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SummaryTitle = styled.h5`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #d35400;
`;

const SummaryItem = styled.div`
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

const CheckoutButton = styled(StyledLink)`
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  padding: 0.8rem;
  font-size: 1.1rem;
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
`;

