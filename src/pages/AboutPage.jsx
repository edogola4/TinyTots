import React from 'react';
import { Footer, Navbar } from "../components";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <HeroSection>
          <GradientTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Crafting Childhood Memories
          </GradientTitle>
          <LeadText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Where Quality Meets Playful Design
          </LeadText>
        </HeroSection>

        <ContentWrapper>
          <Section>
            <MotionH2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Our Philosophy
            </MotionH2>
            <ModernParagraph>
              At TinyTots Boutique, we believe childhood should be wrapped in comfort, 
              sparkled with joy, and filled with discovery. Our carefully curated collections 
              blend innovative design with unmatched quality to create pieces that grow 
              with your little ones.
            </ModernParagraph>
          </Section>

          <ProductGrid>
            {products.map((product, index) => (
              <ProductCard 
                key={index}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ImageOverlay>
                  <img
                    src={product.image}
                    alt={product.category}
                  />
                  <CategoryLabel>{product.category}</CategoryLabel>
                </ImageOverlay>
                <HoverContent>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                </HoverContent>
              </ProductCard>
            ))}
          </ProductGrid>

          <InnovationSection>
            <InnovationContent>
              <h2>2025 Visionaries</h2>
              <InnovationText>
                Pioneering sustainable children's fashion through innovative materials 
                and ethical manufacturing. Our smart fabrics adapt to growth spurts, 
                ensuring lasting comfort and reducing waste.
              </InnovationText>
              <StatsGrid>
                <StatItem>
                  <h3>100k+</h3>
                  <p>Happy Families</p>
                </StatItem>
                <StatItem>
                  <h3>54%</h3>
                  <p>Recycled Materials</p>
                </StatItem>
                <StatItem>
                  <h3>12</h3>
                  <p>Design Awards</p>
                </StatItem>
              </StatsGrid>
            </InnovationContent>
          </InnovationSection>
        </ContentWrapper>
      </Container>
      <Footer />
    </>
  );
};

// Styled components

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 8rem 0 4rem;
  background: linear-gradient(45deg, #f8f9fa 0%, #ffffff 100%);
`;

const GradientTitle = styled(motion.h1)`
  font-size: 4rem;
  background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const LeadText = styled(motion.p)`
  font-size: 1.5rem;
  color: #2B2B2B;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 300;
`;

const ContentWrapper = styled.div`
  padding: 4rem 0;
`;

const Section = styled.section`
  margin: 6rem 0;
  padding: 4rem 0;
  border-top: 1px solid rgba(0,0,0,0.1);
`;

const MotionH2 = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #4ecdc4;
    margin: 1rem auto;
  }
`;

const ModernParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a4a4a;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

// Define HoverContent before using it in ProductCard.
const HoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(78, 205, 196, 0.9);
  color: white;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const ProductCard = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    img {
      transform: scale(1.05);
    }
    
    ${HoverContent} {
      opacity: 1;
    }
  }
`;

const ImageOverlay = styled.div`
  position: relative;
  height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const CategoryLabel = styled.span`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  backdrop-filter: blur(4px);
`;

const InnovationSection = styled.div`
  background: #f8f9fa;
  border-radius: 24px;
  padding: 4rem;
  margin: 6rem 0;
`;

const InnovationContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
  }
`;

const InnovationText = styled(ModernParagraph)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  
  h3 {
    font-size: 2.5rem;
    color: #ff6b6b;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #4a4a4a;
    font-size: 0.9rem;
  }
`;

// Product data
const products = [
  {
    category: "Kids",
    image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
    title: "Adaptive Clothing",
    description: "Growth-friendly designs with temperature-regulating fabric"
  },
  {
    category: "Women",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
    title: "Mom & Me Collections",
    description: "Coordinated styles for special moments"
  },
  {
    category: "Jewelry",
    image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg",
    title: "Child-Safe Accessories",
    description: "Hypoallergenic materials with safety clasps"
  },
  {
    category: "Tech",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
    title: "Smart Nursery",
    description: "IoT-enabled devices for modern parenting"
  }
];

export default AboutPage;

