import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { FiShoppingCart, FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiLogIn, FiUserPlus } from 'react-icons/fi';

const NavBar = styled.nav`
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Brand = styled(NavLink)`
  font-family: 'Pacifico', cursive;
  color: #2a2a2a !important;
  font-size: 1.8rem !important;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavItem = styled(NavLink)`
  color: #4a4a4a !important;
  font-weight: 500;
  position: relative;
  margin: 0 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #ff6b6b;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: #ff6b6b !important;
  }
`;

const CartCounter = styled(motion.span)`
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 0.8rem;
  margin-left: 5px;
`;

const NavButtons = styled.div`
  .btn {
    border-radius: 25px;
    padding: 8px 20px;
    margin-left: 15px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    }
  }
`;

const Navbar = () => {
  const cartItems = useSelector(state => state.handleCart);
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Products" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" }
  ];

  return (
    <NavBar className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Brand className="navbar-brand" to="/">
          TinyTots 🧸
        </Brand>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.text}>
                <NavItem 
                  to={link.to} 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  {link.text}
                </NavItem>
              </li>
            ))}
          </ul>

          <NavButtons className="d-flex align-items-center">
            <button 
              className="btn btn-outline-dark" 
              onClick={() => navigate('/login')}
            >
              <FiLogIn className="me-2" />
              Login
            </button>
            
            <button 
              className="btn btn-outline-dark" 
              onClick={() => navigate('/register')}
            >
              <FiUserPlus className="me-2" />
              Register
            </button>

            <button 
              className="btn btn-outline-dark position-relative"
              onClick={() => navigate('/cart')}
            >
              <FiShoppingCart />
              {cartItems.length > 0 && (
                <CartCounter
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItems.length}
                </CartCounter>
              )}
            </button>
          </NavButtons>
        </div>
      </div>
    </NavBar>
  );
};

export default Navbar;