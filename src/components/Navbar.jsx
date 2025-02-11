import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { FiShoppingCart, FiLogIn, FiUserPlus, FiMenu, FiX } from 'react-icons/fi';

const NavBar = styled.nav`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Brand = styled(NavLink)`
  font-family: 'Comfortaa', cursive;
  font-weight: 700;
  font-size: 1.8rem;
  color: #2a2a2a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  span {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover {
    transform: scale(1.02);
    opacity: 0.9;
  }
`;

const NavItem = styled(NavLink)`
  color: #4a4a4a;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover {
    color: #2a2a2a;
    &::before {
      width: 80%;
    }
  }

  &.active {
    color: #ff6b6b;
    &::before {
      width: 100%;
    }
  }
`;

const CartCounter = styled(motion.span)`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 0.8rem;
  margin-left: 5px;
  font-weight: 600;
`;

const NavButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(255, 107, 107, 0.3);
    transform: translateY(-2px);
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  right: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const Navbar = () => {
  const cartItems = useSelector(state => state.handleCart);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Shop" },
    { to: "/about", text: "Story" },
    { to: "/contact", text: "Contact" }
  ];

  return (
    <NavBar className="navbar navbar-expand-lg">
      <div className="container">
        <Brand className="navbar-brand" to="/">
          <span>TinyTots</span>🧸
        </Brand>

        <motion.button
          className="navbar-toggler"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto gap-2">
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

          <div className="d-flex align-items-center gap-3">
            <NavButton
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLogIn size={18} />
              Login
            </NavButton>

            <NavButton
              onClick={() => navigate('/cart')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShoppingCart size={18} />
              Cart
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <CartCounter
                    key="cart-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {cartItems.length}
                  </CartCounter>
                )}
              </AnimatePresence>
            </NavButton>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="d-flex flex-column gap-3">
                {navLinks.map((link) => (
                  <NavItem 
                    key={link.text}
                    to={link.to}
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </NavItem>
                ))}
              </div>
            </MobileMenu>
          )}
        </AnimatePresence>
      </div>
    </NavBar>
  );
};

export default Navbar;