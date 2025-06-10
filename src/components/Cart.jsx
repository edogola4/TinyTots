import React, { useMemo, useCallback, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart, clearCart } from "../redux/action";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaShoppingCart, FaHeart, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Cart = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve cart items and user details from Redux store
  const cartItems = useSelector((state) => state.handleCart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Memoized calculations for better performance
  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const shipping = subtotal > 1000 ? 0 : 50; // Free shipping over KSH 1000
    const tax = subtotal * 0.16; // 16% VAT (Kenya standard)
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      totalItems,
      shipping,
      tax,
      total
    };
  }, [cartItems]);

  // Optimized handlers with useCallback to prevent unnecessary re-renders
  const addItem = useCallback((product) => {
    dispatch(addCart(product));
    toast.success(`Added ${product.title} to cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  }, [dispatch]);

  const removeItem = useCallback((product) => {
    dispatch(delCart(product.id));
    if (product.qty === 1) {
      toast.info(`Removed ${product.title} from cart`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [dispatch]);

  const handleRemoveConfirm = useCallback((product) => {
    setItemToRemove(product);
    setIsConfirmModalOpen(true);
  }, []);

  const confirmRemoveItem = useCallback(() => {
    if (itemToRemove) {
      // Remove all quantities of this item
      for (let i = 0; i < itemToRemove.qty; i++) {
        dispatch(delCart(itemToRemove.id));
      }
      toast.success(`Removed ${itemToRemove.title} from cart`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setIsConfirmModalOpen(false);
    setItemToRemove(null);
  }, [itemToRemove, dispatch]);

  const clearEntireCart = useCallback(() => {
    dispatch(clearCart());
    toast.info("Cart cleared", {
      position: "top-right",
      autoClose: 2000,
    });
  }, [dispatch]);

  // Enhanced empty cart component
  const EmptyCart = () => {
    return (
      <EmptyCartContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <EmptyCartCard>
          <FaShoppingCart size={80} color="#d35400" />
          <EmptyTitle>Your cart is empty!</EmptyTitle>
          <EmptyMessage>
            {user?.name 
              ? `Hi ${user.name}! Ready to find something amazing?` 
              : "Discover our eco-friendly collection and add some items to get started."
            }
          </EmptyMessage>
          <ButtonGroup>
            <StyledLink to="/products">Browse Products</StyledLink>
            <StyledLink to="/categories" variant="outline">View Categories</StyledLink>
          </ButtonGroup>
        </EmptyCartCard>
      </EmptyCartContainer>
    );
  };

  // Enhanced cart display component
  const ShowCart = () => {
    return (
      <CartSection>
        <CartContainer>
          {/* Enhanced user greeting with cart summary */}
          <CartHeader>
            {user?.name && (
              <UserGreeting>
                <FaHeart color="#ff6b6b" size={16} />
                Welcome back, {user.name}!
              </UserGreeting>
            )}
            <CartActions>
              <SaveForLaterButton>Save for Later</SaveForLaterButton>
              <ClearCartButton onClick={clearEntireCart}>
                Clear Cart
              </ClearCartButton>
            </CartActions>
          </CartHeader>

          <CartContent>
            <ItemsContainer>
              <ItemsHeader>
                <h3>Cart Items ({cartSummary.totalItems})</h3>
                {cartSummary.subtotal > 500 && (
                  <FreeShippingBadge>
                    {cartSummary.subtotal > 1000 
                      ? "🎉 Free shipping applied!" 
                      : `Add KSH ${(1000 - cartSummary.subtotal).toFixed(0)} more for free shipping`
                    }
                  </FreeShippingBadge>
                )}
              </ItemsHeader>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ItemImageContainer>
                      <ItemImage 
                        src={item.image} 
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <ItemBadge>{item.qty}</ItemBadge>
                    </ItemImageContainer>
                    
                    <ItemDetails>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemDescription>
                        {item.description?.substring(0, 100)}...
                      </ItemDescription>
                      
                      <ItemActions>
                        <ItemQuantity>
                          <ActionButton 
                            onClick={() => removeItem(item)}
                            disabled={isLoading}
                            aria-label="Decrease quantity"
                          >
                            –
                          </ActionButton>
                          <QuantityText>{item.qty}</QuantityText>
                          <ActionButton 
                            onClick={() => addItem(item)}
                            disabled={isLoading}
                            aria-label="Increase quantity"
                          >
                            +
                          </ActionButton>
                        </ItemQuantity>
                        
                        <PriceSection>
                          <ItemPrice>KSH {(item.price * item.qty).toFixed(2)}</ItemPrice>
                          <UnitPrice>KSH {item.price} each</UnitPrice>
                        </PriceSection>
                        
                        <RemoveButton 
                          onClick={() => handleRemoveConfirm(item)}
                          aria-label="Remove item from cart"
                        >
                          <FaTrash />
                        </RemoveButton>
                      </ItemActions>
                    </ItemDetails>
                  </CartItem>
                ))}
              </AnimatePresence>
            </ItemsContainer>

            {/* Enhanced Order Summary */}
            <OrderSummary>
              <SummaryCard>
                <SummaryTitle>Order Summary</SummaryTitle>
                
                <SummaryItem>
                  <span>Subtotal ({cartSummary.totalItems} items)</span>
                  <span>KSH {cartSummary.subtotal.toFixed(2)}</span>
                </SummaryItem>
                
                <SummaryItem>
                  <span>Shipping</span>
                  <span>
                    {cartSummary.shipping === 0 ? (
                      <FreeShippingText>FREE</FreeShippingText>
                    ) : (
                      `KSH ${cartSummary.shipping.toFixed(2)}`
                    )}
                  </span>
                </SummaryItem>
                
                <SummaryItem>
                  <span>VAT (16%)</span>
                  <span>KSH {cartSummary.tax.toFixed(2)}</span>
                </SummaryItem>
                
                <SummaryTotal>
                  <span>Total Amount</span>
                  <span>KSH {cartSummary.total.toFixed(2)}</span>
                </SummaryTotal>
                
                <PromoSection>
                  <PromoInput placeholder="Enter promo code" />
                  <PromoButton>Apply</PromoButton>
                </PromoSection>
                
                <CheckoutButton to="/checkout">
                  Proceed to Checkout
                </CheckoutButton>
                
                <SecurityBadge>
                  🔒 Secure checkout with 256-bit encryption
                </SecurityBadge>
              </SummaryCard>
              
              <PaymentMethods>
                <h4>We Accept</h4>
                <PaymentIcons>
                  <PaymentIcon>💳</PaymentIcon>
                  <PaymentIcon>📱</PaymentIcon>
                  <PaymentIcon>💰</PaymentIcon>
                </PaymentIcons>
              </PaymentMethods>
            </OrderSummary>
          </CartContent>
        </CartContainer>
      </CartSection>
    );
  };

  // Confirmation Modal Component
  const ConfirmModal = () => (
    <AnimatePresence>
      {isConfirmModalOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsConfirmModalOpen(false)}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <h3>Remove Item</h3>
              <CloseButton onClick={() => setIsConfirmModalOpen(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to remove "{itemToRemove?.title}" from your cart?</p>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={() => setIsConfirmModalOpen(false)}>
                Cancel
              </CancelButton>
              <ConfirmButton onClick={confirmRemoveItem}>
                Remove
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Navbar />
      <CartWrapper>
        <CartTitle>Shopping Cart</CartTitle>
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
        <ConfirmModal />
      </CartWrapper>
      <Footer />
    </>
  );
};

export default Cart;

/* Enhanced Styled Components */

const CartWrapper = styled.div`
  padding: 2rem 1rem;
  max-width: 1440px;
  margin: 0 auto;
  background: linear-gradient(135deg, #fff6f0 0%, #ffeaa7 100%);
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const CartTitle = styled.h1`
  text-align: center;
  color: #d35400;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const EmptyCartContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const EmptyCartCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  padding: 3rem;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const EmptyTitle = styled.h2`
  font-size: 2rem;
  color: #d35400;
  margin: 1.5rem 0 1rem;
  font-weight: 600;
`;

const EmptyMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.variant === 'outline' 
    ? 'transparent' 
    : 'linear-gradient(45deg, #ff6b6b, #f39c12)'};
  color: ${props => props.variant === 'outline' ? '#d35400' : '#fff'};
  border: ${props => props.variant === 'outline' ? '2px solid #d35400' : 'none'};
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    background: ${props => props.variant === 'outline' 
      ? '#d35400' 
      : 'linear-gradient(45deg, #f39c12, #ff6b6b)'};
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CartSection = styled.section`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 1rem;
`;

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #d35400;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CartActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const SaveForLaterButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 20px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    border-color: #ccc;
  }
`;

const ClearCartButton = styled.button`
  padding: 0.5rem 1rem;
  background: #ff4757;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff3742;
    transform: translateY(-1px);
  }
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ItemsContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
`;

const ItemsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  h3 {
    color: #333;
    font-size: 1.3rem;
    margin: 0;
  }
`;

const FreeShippingBadge = styled.div`
  background: linear-gradient(45deg, #00b894, #00cec9);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const CartItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const ItemImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ItemBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemTitle = styled.h4`
  font-size: 1.1rem;
  margin: 0;
  color: #333;
  font-weight: 600;
  line-height: 1.3;
`;

const ItemDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: linear-gradient(45deg, #f39c12, #ff6b6b);
  border: none;
  color: #fff;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 35px;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const QuantityText = styled.span`
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const PriceSection = styled.div`
  text-align: right;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  color: #d35400;
  font-weight: bold;
`;

const UnitPrice = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ff4757;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 8px;
  
  &:hover {
    background: rgba(255, 71, 87, 0.1);
    transform: scale(1.1);
  }
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SummaryCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SummaryTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #d35400;
  font-weight: 600;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #555;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FreeShippingText = styled.span`
  color: #00b894;
  font-weight: bold;
`;

const SummaryTotal = styled(SummaryItem)`
  font-weight: bold;
  font-size: 1.3rem;
  border-top: 2px solid #eee;
  padding-top: 1rem;
  margin-top: 1.5rem;
  color: #d35400;
`;

const PromoSection = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const PromoInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
  }
`;

const PromoButton = styled.button`
  padding: 0.8rem 1.2rem;
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e67e22;
  }
`;

const CheckoutButton = styled(StyledLink)`
  display: block;
  text-align: center;
  margin: 1.5rem 0;
  padding: 1rem;
  font-size: 1.1rem;
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const SecurityBadge = styled.div`
  text-align: center;
  font-size: 0.85rem;
  color: #666;
  margin-top: 1rem;
`;

const PaymentMethods = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  
  h4 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 1rem;
  }
`;

const PaymentIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const PaymentIcon = styled.div`
  font-size: 1.5rem;
  padding: 0.5rem;
  background: rgba(211, 84, 0, 0.1);
  border-radius: 8px;
`;

// Modal Styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  
  p {
    margin: 0;
    color: #666;
    line-height: 1.5;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const ConfirmButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff3742;
  }
`;