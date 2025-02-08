
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./Loading";
import logoWhite from "../assets/logo_white.jpg";
//import Typed from "react-typed";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());


<ParallaxImage src={logoWhite} alt="Modern Fashion Collection" />

  // Update loading state
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get greeting based on the current hour from state
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Rise & Shine ✨";
    if (hour < 18) return "Afternoon Glow ☀️";
    return "Evening Elegance 🌙";
  };

  // Format the time to a human-readable string
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <AnimatePresence>
      {loading ? (
        <Loading />
      ) : (
        <HeroContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroImage>
            <ParallaxImage
              src="./assets/logo_white.jpg"
              alt="Modern Fashion Collection"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <GradientOverlay />
          </HeroImage>

          <ContentWrapper>
            <TextGroup
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <GreetingText>{getGreeting()}</GreetingText>
              <TimeText>{formattedTime}</TimeText> 
              <MainHeading>
                Curated Styles for <br />
                <Emphasis>Modern Littles</Emphasis>
              </MainHeading>
              <SubText>
                Discover sustainable, organic-cotton essentials designed for
                play and growth. Shop our ethically crafted collection.
              </SubText>
              <CtaButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </CtaButton>
            </TextGroup>
          </ContentWrapper>
        </HeroContainer>
      )}
    </AnimatePresence>
  );
};

// Styled Components

const HeroContainer = styled(motion.div)`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ParallaxImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(18, 18, 18, 0.6) 0%,
    rgba(18, 18, 18, 0.2) 100%
  );
  backdrop-filter: blur(2px);
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8%;
  color: #fff;
`;

const TextGroup = styled(motion.div)`
  max-width: 600px;
`;

const GreetingText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.3rem;
  letter-spacing: 0.1em;
`;

const TimeText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const MainHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Emphasis = styled.span`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  max-width: 500px;
`;

const CtaButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export default Home;


