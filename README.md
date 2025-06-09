# TinyTots Boutique - Modern Children's Fashion Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer%20motion-%23000000.svg?style=for-the-badge&logo=framer&logoColor=white)

A modern e-commerce platform specializing in eco-friendly children's and women's clothing, featuring immersive animations, responsive design, and seamless navigation.

## Screenshots

| Home Page | Products Page | Navbar |
|-----------|---------------|--------|
| ![Home Page](public/screenshots/home-page.png) | ![Products Page](public/screenshots/products-page.png) | ![Navbar](public/screenshots/story.png) |

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



## Project Structure
tinytots-boutique/ ├── src/ │ ├── components/ │ │ ├── Home.jsx # Landing page with dynamic effects │ │ ├── Navbar.jsx # Responsive navbar with cart │ │ ├── Products.jsx # Product listing and filtering │ │ ├── Loading.js # Animated loading screen │ │ ├── Footer.js # Branded footer │ ├── redux/ │ │ ├── cartSlice.js # Cart management with Redux │ ├── styles/ │ │ ├── NavbarStyles.js # Navbar styled-components │ ├── App.jsx # Main app with routing │ ├── index.js # Entry point ├── public/ │ ├── index.html # HTML template ├── screenshots/ │ ├── home-page.png # Home page screenshot │ ├── products-page.png # Products page screenshot │ ├── navbar.png # Navbar screenshot ├── package.json # Dependencies and scripts ├── README.md # Project documentation


## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/edogola4/tinytots-boutique.git

2. **Navigate to the Project Directory:**
```bash
    cd tinytots-boutique
```
3. **Install Dependencies:**
```bash
npm install
```
4. **Start the development server:**
```bash
npm start
```
   


## Technologies:
**Core:** React 18, React Router 6

**Styling:** styled-components, CSS animations

**Animations:** Framer Motion, react-loading-skeleton

**State Management:** Redux Toolkit

**UI Elements:** react-hot-toast, react-icons

**Background Effects:** particles.js

**Chat Integration:** Tawk.to

## Configuration
s1.src = "https://embed.tawk.to/YOUR_WIDGET_ID";



## API Reference
This project uses the *Fake Store API* for demonstration purposes of this project. 

## Key Components
**Home.jsx:** Main landing page with dynamic effects

**Products.jsx:** Product listing with filtering capabilities

**Loading.js:** Animated loading component

**Footer.js:** Branded page footer

**Redux** actions for cart management


## Contributing
Contributions are welcome! Please follow these steps:

  - 1. Fork the project

- 2. Create your feature branch (git checkout -b feature/AmazingFeature)

- 3. Commit your changes (git commit -m 'Add some AmazingFeature')

- 4. Push to the branch (git push origin feature/AmazingFeature)

- 5. Open a Pull Request


## License
Distributed under the MIT License. See LICENSE for more information.

## Acknowledgements
- Fake Store API for product data

- React Community for ecosystem tools

- Popper.js for particle effects

- Tawk.to for live chat integration

- Myself for the design and coding