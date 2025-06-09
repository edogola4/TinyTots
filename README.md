# TinyTots Boutique - Modern Children's Fashion Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer%20motion-%23000000.svg?style=for-the-badge&logo=framer&logoColor=white)

A modern e-commerce platform specializing in eco-friendly children's and women's clothing, featuring immersive animations, responsive design, and seamless navigation.

## Features

- 🌟 **Dynamic Hero Section**: Interactive greeting and time display with parallax background effects using Framer Motion.
- 🎨 **Smooth Animations**: Elegant transitions and hover effects for buttons, cards, and visual elements with Framer Motion.
- ⏳ **Loading Screen**: Animated loading component with a 2.5-second delay for a polished user experience.
- 🕒 **Real-Time Greeting**: Personalized greetings based on the time of day (morning, afternoon, evening, night).
- 🛒 **Cart Management**: Redux-powered cart functionality with a dynamic cart counter in the navigation bar.
- 📱 **Responsive Design**: Fully responsive layout with mobile-friendly navigation and button layouts.
- 🌈 **Modern Aesthetics**: Gradient-based visual theme with styled-components for consistent styling.
- 💬 **Customer Support**: Integrated Tawk.to live chat for real-time user assistance.
- 📦 **Product Listings**: Filterable product listings powered by the Fake Store API (to be replaced with a custom API in production).
- 🧭 **Seamless Navigation**: CTA buttons and navbar links for easy access to the products section.

## Screenshots

| Home Page | Products Page | Navbar |
|-----------|---------------|--------|
| ![Home Page](screenshots/home-page.png) | ![Products Page](screenshots/products-page.png) | ![Navbar](screenshots/navbar.png) |

## Project Structure

tinytots-boutique/├── src/│   ├── components/│   │   ├── Home.jsx          # Main landing page with dynamic effects│   │   ├── Navbar.jsx        # Responsive navigation bar with cart integration│   │   ├── Products.jsx      # Product listing with filtering capabilities│   │   ├── Loading.js        # Animated loading component│   │   ├── Footer.js         # Branded page footer│   ├── redux/│   │   ├── cartSlice.js      # Redux slice for cart management│   ├── styles/│   │   ├── NavbarStyles.js   # Styled-components for Navbar│   ├── App.jsx               # Main app component with routing│   ├── index.js              # Entry point├── public/│   ├── index.html            # HTML template├── screenshots/│   ├── home-page.png         # Screenshot of the home page│   ├── products-page.png     # Screenshot of the products page│   ├── navbar.png            # Screenshot of the navigation bar├── package.json              # Project dependencies and scripts├── README.md                 # Project documentation

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/edogola4/tinytots-boutique.git


Navigate to the Project Directory:
cd tinytots-boutique


Install Dependencies:
npm install


Start the Development Server:
npm start

The application will be available at http://localhost:3000.


Usage

Home Page: Upon loading, the home page displays a loading animation for 2.5 seconds, followed by a dynamic hero section with a time-based greeting, rotating feature cards, and CTA buttons ("Shop Kids Collection" and "Shop Women's Collection") that navigate to the products section.
Navigation: Use the responsive navbar to access Home, Shop (Products), Story (About), and Contact pages. The cart icon displays the number of items in the cart.
Products: Browse and filter products fetched from the Fake Store API. Add items to the cart using Redux.
Cart: View and manage cart items via the cart page, with updates reflected in the navbar's cart counter.
Support: Use the Tawk.to live chat widget for customer support.

Technologies

Core: React 18, React Router 6
Styling: styled-components, CSS animations
Animations: Framer Motion, react-loading-skeleton
State Management: Redux Toolkit
UI Elements: react-hot-toast, react-icons
Chat Integration: Tawk.to
API: Fake Store API (for demo purposes)

Configuration

Tawk.to Chat Widget:

Replace the YOUR_WIDGET_ID in the Tawk.to script with your widget ID:s1.src = "https://embed.tawk.to/YOUR_WIDGET_ID/default";


Add this script to public/index.html or dynamically load it in a component.


Environment Variables:

Create a .env file in the root directory to store API endpoints or other sensitive data:REACT_APP_API_URL=https://fakestoreapi.com
REACT_APP_TAWKTO_ID=YOUR_WIDGET_ID


Access these variables in your code using process.env.REACT_APP_API_URL.


Fake Store API:

The project fetches product data from https://fakestoreapi.com. Update the API endpoint in your Products.jsx component if using a custom API.



API Reference
The project uses the Fake Store API for product data. Key endpoints:

GET /products: Fetch all products
GET /products/:id: Fetch a single product
GET /categories: Fetch product categories

Replace with a custom API in production for real product data.
Key Components

Home.jsx: Dynamic landing page with time-based greetings, rotating feature cards, and CTA buttons navigating to /products.
Navbar.jsx: Responsive navigation bar with links to Home, Shop, Story, and Contact, plus a cart counter using Redux.
Products.jsx: Product listing with filtering and sorting capabilities.
Loading.js: Animated loading screen displayed on initial load.
Footer.js: Branded footer with links and contact information.
Redux: Manages cart state with actions for adding/removing items.

Contributing
Contributions are welcome! Follow these steps:

Fork the project.
Create a feature branch:git checkout -b feature/AmazingFeature


Commit your changes:git commit -m 'Add some AmazingFeature'


Push to the branch:git push origin feature/AmazingFeature


Open a Pull Request.

Please ensure your code follows the project's coding style and includes tests where applicable.
License
Distributed under the MIT License. See LICENSE for more information.
Acknowledgements

Fake Store API for demo product data.
React and its community for ecosystem tools.
Framer Motion for animations.
styled-components for styling.
Tawk.to for live chat integration.
Redux Toolkit for state management.
Ed Ogola (@edogola4) for the design and development.


Built with ❤️ by Me (Ed Ogola)```
