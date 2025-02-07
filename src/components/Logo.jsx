import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({
  logoSrc,
  altText = 'TinyTots Boutique',
  linkTo = '/',
  containerClass = '',
  imgClass = ''
}) => {
  return (
    <Link to={linkTo} className={containerClass}>
      <img 
        src={logoSrc || "/assets/logo_white.png"} 
        alt={altText} 
        className={imgClass} 
        style={{ height: '80px', width: 'auto' }} 
      />
    </Link>
  );
};

export default Logo;