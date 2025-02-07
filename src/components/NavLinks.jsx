import React from 'react';
import { Link } from 'react-router-dom';
//import { links } from '../../utils/constants';
import { NAV_LINKS as links } from '../../utils/constants'; 
import { useProductsContext } from '../../context/products_context';

const NavLinks = ({
  className = 'nav-links',
  isSidebar = false,
  checkoutText = 'checkout',
  customCloseSidebar,
}) => {
  const { closeSidebar } = useProductsContext();
  // Use a custom close handler if provided, otherwise use the context's closeSidebar
  const handleClose = customCloseSidebar || closeSidebar;

  return (
    <ul className={className}>
      {links.map(({ id, text, url }) => (
        <li key={id} onClick={isSidebar ? handleClose : undefined}>
          <Link to={url}>{text}</Link>
        </li>
      ))}
      {isSidebar && (
        <li>
          <Link to="/checkout" onClick={handleClose}>
            {checkoutText}
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;