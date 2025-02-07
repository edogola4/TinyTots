import React, { useState } from 'react';
import styled from 'styled-components';
import CartButtons from '../CartButtons';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import NavLinks from './NavLinks';
import { APP_THEME, NAV_LINKS } from '../../utils/constants';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Logo />
          <button 
            className='nav-toggle'
            aria-label='Navigation Toggle'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
        
        <NavLinks 
          className={`nav-links ${isMobileMenuOpen ? 'show-links' : ''}`} 
          links={NAV_LINKS}
        />
        
        <div className='cart-btn-wrapper'>
          <CartButtons />
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  background: ${APP_THEME.colors.neutral};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  /* Adds a subtle blur effect for a modern look */
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: ${APP_THEME.spacing.maxWidth};
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .nav-toggle {
    background: transparent;
    border: none;
    color: ${APP_THEME.colors.primary};
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }

    svg {
      font-size: 2rem;
    }
  }

  .nav-links {
    display: none;
    transition: all 0.3s ease;
    flex-direction: column;
    text-align: center;

    &.show-links {
      display: flex;
      position: absolute;
      top: 5rem;
      left: 0;
      right: 0;
      background: ${APP_THEME.colors.neutral};
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border-top: 1px solid rgba(0,0,0,0.1);
    }
  }

  .cart-btn-wrapper {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }

    .nav-links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 2rem;
      margin-left: 2rem;

      li {
        margin: 0;
      }

      a {
        color: ${APP_THEME.colors.dark};
        font-family: ${APP_THEME.fonts.secondary};
        font-weight: 500;
        padding: 0.5rem;
        position: relative;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: ${APP_THEME.colors.primary};
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: ${APP_THEME.colors.primary};
          transition: width 0.3s ease;
        }

        &:hover::after {
          width: 100%;
        }
      }
    }

    .cart-btn-wrapper {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      margin-left: 2rem;
    }
  }

  @media (max-width: 991px) {
    .nav-center {
      grid-template-columns: auto 1fr;
    }

    .cart-btn-wrapper {
      display: none;
    }
  }
`;

export default Navbar;