/*
import React from "react";
import styled, { keyframes } from "styled-components";

// Define the brand name locally
const BRAND_NAME = "TinyTots Boutique";

// Define color constants
const COLORS = {
  background: "#fff",
  primary: "#3498db",
  dark: "#2B2B2B",
  lightGrey: "#f3f3f3"
};

// Spinning animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Fade-in animation
const fadeInAndHold = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  100% { opacity: 1; }
`;

// Styled components with direct color values
const Spinner = styled.div`
  border: 8px solid ${COLORS.lightGrey};
  border-top: 8px solid ${COLORS.primary};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: ${COLORS.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.p`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
  font-family: "Nunito Sans", sans-serif;
  color: ${COLORS.dark};
  animation: ${fadeInAndHold} 30s ease-in-out forwards;
`;

const Loading = () => (
  <LoadingWrapper>
    <LoadingText>{BRAND_NAME}</LoadingText>
    <Spinner />
  </LoadingWrapper>
);

export default Loading;
*/
import React from "react";
import styled, { keyframes } from "styled-components";

const BRAND_NAME = "TinyTots Boutique";

const COLORS = {
  background: "#fff",
  primary: "#FF6B6B",       // Changed to a warmer color
  secondary: "#4ECDC4",     // Added complementary color
  dark: "#2B2B2B",
  lightGrey: "#f3f3f3",
  accent: "#FFE66D"         // Added accent color
};

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeInAndHold = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(0.95); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background: linear-gradient(15deg, ${COLORS.background} 0%, ${COLORS.lightGrey} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const BrandContainer = styled.div`
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingText = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 800;
  font-family: 'Comic Neue', cursive;
  color: ${COLORS.primary};
  text-shadow: 2px 2px 0 ${COLORS.accent};
  position: relative;
  animation: ${bounce} 1.5s ease-in-out infinite;
  
  &::before, &::after {
    content: "👶";
    margin: 0 0.5rem;
    animation: ${spin} 2s linear infinite;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.dark};
  font-family: 'Nunito Sans', sans-serif;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

const Spinner = styled.div`
  border: 6px solid ${COLORS.lightGrey};
  border-top: 6px solid ${COLORS.secondary};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: ${spin} 1s linear infinite;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${COLORS.accent};
    animation: ${spin} 1.5s linear infinite;
  }
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background: ${COLORS.lightGrey};
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, 
      ${COLORS.primary} 0%, 
      ${COLORS.secondary} 50%, 
      ${COLORS.accent} 100%);
    animation: ${shimmer} 2s linear infinite;
  }
`;

const Loading = () => (
  <LoadingWrapper>
    <BrandContainer>
      <LoadingText>
        {BRAND_NAME}
      </LoadingText>
      <Subtitle>Preparing Your Perfect Fit...</Subtitle>
    </BrandContainer>
    <Spinner />
    <ProgressBar />
  </LoadingWrapper>
);

export default Loading;