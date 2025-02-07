import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useProductsContext } from '../../context/products_context';

const MenuIcon = ({
  onClick,              // Optional custom onClick handler; falls back to context's openSidebar
  customIcon: CustomIcon, // Optional custom icon component; defaults to FaBars
  buttonClass = 'nav-toggle', // Optional CSS class for the button
  iconSize = '1.5em',   // Optional icon size
  iconColor = 'inherit' // Optional icon color
}) => {
  const { openSidebar } = useProductsContext();
  const handleClick = onClick || openSidebar;
  const Icon = CustomIcon || FaBars;

  return (
    <button type="button" className={buttonClass} onClick={handleClick}>
      <Icon size={iconSize} color={iconColor} />
    </button>
  );
};

export default MenuIcon;