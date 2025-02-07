// src/utils/constants.jsx
import { GiClothes, GiPresent } from 'react-icons/gi';
import { MdOutlineLocalShipping, MdEco } from 'react-icons/md';
import { FaBaby, FaRegHeart, FaInstagram, FaTiktok, FaFacebook, FaTwitter } from 'react-icons/fa';
import { RiCustomerService2Line } from 'react-icons/ri';

// Branding & Core Information
export const BRAND_NAME = 'TinyTots Boutique';
export const BRAND_TAGLINE = 'Big Style for Little Ones';

export const CONTACT_INFO = {
  email: 'hello@tinytotsboutique.com',
  phone: '+254 (555) 123-4567',
  address: '123 Playful Lane, Kids City, KC 12345'
};

// Navigation & Site Structure
export const NAV_LINKS = [
  {
    id: 1,
    text: 'Discover',
    url: '/',
    icon: <GiPresent className="nav-icon" />,
  },
  {
    id: 2,
    text: 'Collections',
    url: '/collections',
    icon: <GiClothes className="nav-icon" />,
  },
  {
    id: 3,
    text: 'New Arrivals',
    url: '/new',
    icon: <FaBaby className="nav-icon" />,
  },
  {
    id: 4,
    text: 'Sustainability',
    url: '/eco',
    icon: <MdEco className="nav-icon" />,
  },
];

// Value Propositions
export const OUR_PROMISE = [
  {
    id: 1,
    icon: <MdOutlineLocalShipping />,
    title: 'Swift Shipping',
    text: 'Free next-day delivery on orders over $50',
  },
  {
    id: 2,
    icon: <RiCustomerService2Line />,
    title: 'Expert Stylists',
    text: '24/7 chat support from parenting experts',
  },
  {
    id: 3,
    icon: <MdEco />,
    title: 'Eco-Friendly',
    text: '100% organic cotton & sustainable packaging',
  },
  {
    id: 4,
    icon: <FaRegHeart />,
    title: 'Giving Back',
    text: 'We donate 5% of profits to children\'s charities',
  },
];

// Social Media Configuration
export const SOCIAL_LINKS = [
  {
    id: 1,
    name: 'facebook',
    url: '#',
    icon: <FaFacebook />,
    handle: '@tinytotsboutique'
  },
  {
    id: 2,
    name: 'instagram',
    url: 'https://instagram.com/tinytotsboutique',
    icon: <FaInstagram />,
    handle: '@tinytotsboutique'
  },
  {
    id: 3,
    name: 'tiktok',
    url: 'https://tiktok.com/@tinytotsboutique',
    icon: <FaTiktok />,
    handle: '@tinytotsboutique'
  },
  {
    id: 4,
    name: 'twitter',
    url: '#',
    icon: <FaTwitter />,
    handle: '@tinytotsboutique'
  }
];

// Product & API Configuration
export const SANITY_CONFIG = {
  ENDPOINT: 'https://bqk6gkzk.api.sanity.io/v1/graphql/production/default',
  QUERY: `#graphql
    query GetProducts {
      allProduct {
        _id
        name
        slug { current }
        material
        price
        stock
        ecoBadge
        sizeRange
        featured
        collections
        images {
          asset {
            url
            metadata { dimensions }
          }
        }
        details {
          careInstructions
          safetyCertifications
          sustainabilityFeatures
        }
      }
    }
  `,
  FRAGMENTS: `#graphql
    fragment productDetails on Product {
      _id
      name
      price
      material
      ecoBadge
    }
  `,
};

// Promotions & Marketing
export const LIMITED_OFFERS = [
  {
    code: 'TINYTOTS20',
    discount: 20,
    message: '20% off first order',
    expires: '2024-12-31',
  },
  {
    code: 'BUNDLE15',
    discount: 15,
    message: '15% off bundle purchases',
    expires: '2024-11-30',
  },
];

// Product Categories
export const FEATURED_CATEGORIES = [
  {
    name: 'Organic Basics',
    slug: 'organic-basics',
    color: '#B8E1D1',
    icon: <MdEco />,
  },
  {
    name: 'Party Outfits',
    slug: 'party-outfits',
    color: '#F9D4D4',
    icon: <GiPresent />,
  },
  {
    name: 'Adventure-Ready',
    slug: 'outdoor-gear',
    color: '#D4E3F9',
    icon: <MdOutlineLocalShipping />,
  },
];

// Design System
export const APP_THEME = {
  colors: {
    primary: '#FFA8C2',
    secondary: '#A2D9D1',
    accent: '#FFD700',
    neutral: '#F5F5F5',
    dark: '#2B2B2B',
  },
  fonts: {
    primary: '"Comic Neue", cursive',
    secondary: '"Nunito Sans", sans-serif',
  },
  transitions: {
    default: 'all 0.3s ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  },
  spacing: {
    section: '4rem',
    element: '1.5rem',
  }
};

// Helper Exports
export const API_ENDPOINT = SANITY_CONFIG.ENDPOINT;
export const QUERY = SANITY_CONFIG.QUERY;