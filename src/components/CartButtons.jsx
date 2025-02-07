import React from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { useCartContext } from '../context/cart_context';
import { APP_THEME } from '../utils/constants';

const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { totalItems, totalAmount } = useCartContext();

  return (
    <Wrapper>
      <AuthButton to="/auth" onClick={closeSidebar}>
        <FaUserCircle />
        <span className="auth-text">Account</span>
      </AuthButton>

      <CartButton to="/cart" onClick={closeSidebar}>
        <div className="cart-content">
          <span className="cart-text">Cart</span>
          <div className="cart-indicator">
            <FaShoppingCart className="cart-icon" />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>
          {totalAmount > 0 && (
            <span className="cart-total">${totalAmount.toFixed(2)}</span>
          )}
        </div>
      </CartButton>
    </Wrapper>
  );
};

const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${APP_THEME.colors.dark};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: ${APP_THEME.transitions.default};

  &:hover {
    background: ${APP_THEME.colors.neutral};
    color: ${APP_THEME.colors.primary};
  }

  svg {
    font-size: 1.5rem;
  }

  .auth-text {
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const CartButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  background: ${APP_THEME.colors.primary};
  color: ${APP_THEME.colors.neutral};
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  transition: ${APP_THEME.transitions.default};

  &:hover {
    background: ${APP_THEME.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .cart-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .cart-text {
    font-family: ${APP_THEME.fonts.secondary};
    font-weight: 600;
    @media (max-width: 480px) {
      display: none;
    }
  }

  .cart-indicator {
    position: relative;
    display: flex;
    align-items: center;
  }

  .cart-icon {
    font-size: 1.25rem;
  }

  .cart-badge {
    position: absolute;
    top: -12px;
    right: -12px;
    background: ${APP_THEME.colors.accent};
    color: ${APP_THEME.colors.neutral};
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 700;
    animation: ${bounce} 0.3s ease-in-out;
  }

  .cart-total {
    background: rgba(255,255,255,0.9);
    color: ${APP_THEME.colors.dark};
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    margin-left: 0.5rem;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export default CartButtons;