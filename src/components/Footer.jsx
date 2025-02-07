import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-content">
        <h5>
          &copy; {new Date().getFullYear()}{' '}
          <span>TinyTots Boutique, Nairobi</span>
        </h5>
        <h5>All rights reserved</h5>
        <p>Designed with ❤️ by Bran Don</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background: linear-gradient(135deg, #91908d, #1a1a1a);
  padding: 2rem;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  h5,
  p {
    color: #fff;
    margin: 0;
  }

  h5 {
    font-size: 1rem;
    font-weight: 400;
  }

  h5 span {
    color: #ff9800; /* A warm accent color to highlight the brand name */
    font-weight: bold;
  }

  p {
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    .footer-content {
      flex-direction: row;
      justify-content: center;
    }
    h5,
    p {
      margin: 0 1rem;
    }
  }
`;

export default Footer;