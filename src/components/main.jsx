import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Added import
import Loading from "./Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const navigate = useNavigate(); // Added useNavigate

  // Features data
  const features = [
    { icon: "🌱", text: "100% Organic Cotton", color: "#22c55e" },
    { icon: "♻️", text: "Eco-Friendly Materials", color: "#0ea5e9" },
    { icon: "👶", text: "Hypoallergenic & Safe", color: "#f59e0b" },
    { icon: "🌍", text: "Sustainable Production", color: "#10b981" },
    { icon: "👪", text: "Family Approved", color: "#8b5cf6" },
    { icon: "✨", text: "Premium Quality", color: "#ec4899" }
  ];

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Feature rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: "Good Morning", emoji: "🌅", color: "#fbbf24" };
    if (hour < 17) return { text: "Good Afternoon", emoji: "☀️", color: "#f59e0b" };
    if (hour < 21) return { text: "Good Evening", emoji: "🌆", color: "#f97316" };
    return { text: "Good Night", emoji: "🌙", color: "#6366f1" };
  };

  const greeting = getGreeting();
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Navigation handler
  const handleNavigateToProducts = () => {
    navigate('/products');
  };

  // Use the imported Loading component
  if (loading) {
    return <Loading />;
  }

  return (
    <HeroContainer ref={heroRef}>
      {/* Background Elements */}
      <BackgroundWrapper>
        {[...Array(20)].map((_, i) => (
          <FloatingElement
            key={i}
            as={motion.div}
            color={features[i % features.length].color}
            size={Math.random() * 100 + 50}
            left={Math.random() * 100}
            top={Math.random() * 100}
            animate={{
              x: (mousePosition.x - 0.5) * 50,
              y: (mousePosition.y - 0.5) * 50,
              rotate: 360,
            }}
            transition={{
              x: { duration: 2, ease: "easeOut" },
              y: { duration: 2, ease: "easeOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </BackgroundWrapper>

      {/* Main Content */}
      <ContentGrid>
        {/* Left Content */}
        <LeftContent
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Greeting & Time */}
          <GreetingWrapper
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GreetingCard color={greeting.color}>
              <span style={{ fontSize: '1.5rem' }}>{greeting.emoji}</span>
              <span>{greeting.text}</span>
            </GreetingCard>
            <TimeCard>
              <span>{formattedTime}</span>
            </TimeCard>
          </GreetingWrapper>

          {/* Main Heading */}
          <MainHeading
            as={motion.h1}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <HeadingLine color="#374151">Sustainable</HeadingLine>
            <HeadingLine gradient={true}>Fashion</HeadingLine>
            <HeadingLine color="#4b5563">for Little Ones</HeadingLine>
          </MainHeading>

          {/* Rotating Features */}
          <FeatureContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <FeatureCard
                key={activeFeature}
                as={motion.div}
                color={features[activeFeature].color}
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <span style={{ fontSize: '1.5rem' }}>{features[activeFeature].icon}</span>
                <span>{features[activeFeature].text}</span>
              </FeatureCard>
            </AnimatePresence>
          </FeatureContainer>

          {/* Description */}
          <Description
            as={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Discover our premium collection of organic, eco-friendly clothing designed for 
            children and women who care about sustainability and style.
          </Description>

          {/* CTA Buttons */}
          <ButtonContainer
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <PrimaryButton
              as={motion.button}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNavigateToProducts} // Added onClick
            >
              Shop Kids Collection
            </PrimaryButton>
            <SecondaryButton
              as={motion.button}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNavigateToProducts} // Added onClick
            >
              Shop Women's Collection
            </SecondaryButton>
          </ButtonContainer>

          {/* Trust Indicators */}
          <TrustIndicators
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <TrustItem>
              <TrustNumber color="#10b981">1M+</TrustNumber>
              <TrustLabel>Happy Families</TrustLabel>
            </TrustItem>
            <TrustItem>
              <TrustNumber color="#3b82f6">100%</TrustNumber>
              <TrustLabel>Organic Cotton</TrustLabel>
            </TrustItem>
            <TrustItem>
              <TrustNumber color="#8b5cf6">5★</TrustNumber>
              <TrustLabel>Customer Rating</TrustLabel>
            </TrustItem>
          </TrustIndicators>
        </LeftContent>

        {/* Right Visual */}
        <RightContent
          as={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <VisualWrapper
            as={motion.div}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Main Circle */}
            <MainCircle
              as={motion.div}
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Inner Circle */}
            <InnerCircle
              as={motion.div}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center Content */}
            <CenterContent>
              <CenterIcon
                as={motion.div}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👶🌱
              </CenterIcon>
              <CenterText1>Eco-Friendly</CenterText1>
              <CenterText2>Fashion</CenterText2>
            </CenterContent>

            {/* Floating Feature Icons */}
            {features.slice(0, 4).map((feature, index) => (
              <FloatingIcon
                key={index}
                as={motion.div}
                index={index}
                animate={{
                  y: [0, Math.sin(index) * 15, 0],
                  rotate: 360,
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 10 + index * 2, repeat: Infinity, ease: "linear" }
                }}
                whileHover={{ scale: 1.2 }}
              >
                {feature.icon}
              </FloatingIcon>
            ))}
          </VisualWrapper>
        </RightContent>
      </ContentGrid>

      {/* Scroll Indicator */}
      <ScrollIndicator
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <ScrollWheel
          as={motion.div}
          animate={{ borderColor: ["#9ca3af", "#10b981", "#3b82f6", "#9ca3af"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ScrollDot
            as={motion.div}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </ScrollWheel>
        <ScrollText>Click to explore</ScrollText>
      </ScrollIndicator>
    </HeroContainer>
  );
};

// Styled Components

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom right, #ecfdf5, #ffffff, #eff6ff);
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: linear-gradient(45deg, ${props => props.color}, ${props => props.color}88);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  ${css`animation: ${float} ${props => 10 + Math.random() * 10}s ease-in-out infinite;`}
`;

const ContentGrid = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 1.5rem;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 0 3rem;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  max-width: 32rem;
  
  @media (min-width: 1024px) {
    padding-right: 3rem;
  }
`;

const GreetingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const GreetingCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  color: #374151;
  border: 2px solid ${props => props.color}33;
`;

const TimeCard = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Monaco', 'Menlo', monospace;
  color: #374151;
`;

const MainHeading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 4.5rem;
  }
`;

const HeadingLine = styled.span`
  display: block;
  color: ${props => props.color || 'inherit'};
  ${props => props.gradient && css`
    background: linear-gradient(45deg, #059669, #0891b2, #2563eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: ${gradientAnimation} 3s ease infinite;
  `}
`;

const FeatureContainer = styled.div`
  margin-bottom: 2rem;
  height: 4rem;
  display: flex;
  align-items: center;
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6));
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.color};
  border: 2px solid ${props => props.color}22;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 28rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #059669, #0891b2);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(5, 150, 105, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 25px 50px rgba(5, 150, 105, 0.4);
  }
`;

const SecondaryButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 25px 50px rgba(59, 130, 246, 0.4);
  }
`;

const TrustIndicators = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
`;

const TrustItem = styled.div`
  text-align: center;
`;

const TrustNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color};
`;

const TrustLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24rem;
  
  @media (min-width: 1024px) {
    height: 100vh;
    max-height: 100vh;
  }
`;

const VisualWrapper = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
  
  @media (min-width: 1024px) {
    width: 24rem;
    height: 24rem;
  }
`;

const MainCircle = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #a7f3d0, #bfdbfe, #c7d2fe);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
`;

const InnerCircle = styled.div`
  position: absolute;
  inset: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff, #f0fdf4);
  box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const CenterContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CenterIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const CenterText1 = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  background: linear-gradient(45deg, #059669, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CenterText2 = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FloatingIcon = styled.div`
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  
  ${props => {
    const angle = (props.index * Math.PI) / 2;
    const radius = 40;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    return css`
      left: ${x}%;
      top: ${y}%;
      transform: translate(-50%, -50%);
    `;
  }}
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const ScrollWheel = styled.div`
  width: 1.5rem;
  height: 2.5rem;
  border: 2px solid #9ca3af;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  margin: 0 auto 0.5rem;
`;

const ScrollDot = styled.div`
  width: 0.25rem;
  height: 0.75rem;
  background: linear-gradient(to bottom, #059669, #3b82f6);
  border-radius: 0.25rem;
  margin-top: 0.5rem;
`;

const ScrollText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

export default Home;