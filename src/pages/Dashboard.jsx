import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from '../components';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user data and products from localStorage and Items.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load user
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser || { email: 'Guest' });

        // Fetch products
        const response = await fetch('/Items.json');
        const data = await response.json();
        // Filter for eco-friendly children's and women's clothing (adjust based on your categories)
        const filteredProducts = data.filter(
          (item) => item.category?.toLowerCase().includes('children') || 
                    item.category?.toLowerCase().includes('women')
        );
        setProducts(filteredProducts.slice(0, 4)); // Limit to 4 featured products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setUser({ email: 'Guest' });
        setProducts([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <PageContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        role="main"
        aria-labelledby="dashboard-title"
      >
        <ContentWrapper>
          <AnimatePresence>
            {loading ? (
              <Loading key="loading">Loading...</Loading>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Title id="dashboard-title">Welcome, {user?.email || 'Guest'}!</Title>
                <Subtitle>
                  Explore eco-friendly fashion at TinyTots – sustainable clothing for kids and women.
                </Subtitle>
                <Divider />
                <MissionText>
                  Our mission: Deliver stylish, eco-conscious clothing made from organic, recycled materials.
                </MissionText>
                <ProductPreview>
                  <SectionTitle>Featured Products</SectionTitle>
                  <ProductGrid>
                    {products.length === 0 ? (
                      <FallbackMessage>No featured products available.</FallbackMessage>
                    ) : (
                      products.map((product) => (
                        <ProductCard
                          key={product.id}
                          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' }}
                          transition={{ duration: 0.3 }}
                          role="article"
                          aria-label={`${product.title || product.name} in ${product.category} category, priced at KSH${product.price}`}
                        >
                          <Link to={`/product/${product.id}`}>
                            <ProductImage src={product.image} alt={product.title || product.name} />
                            <ProductName>{product.title || product.name}</ProductName>
                            <ProductCategory>{product.category}</ProductCategory>
                            <ProductPrice>KSH{product.price}</ProductPrice>
                          </Link>
                        </ProductCard>
                      ))
                    )}
                  </ProductGrid>
                  <CTAButton
                    as={Link}
                    to="/products"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Shop eco-friendly clothing now"
                  >
                    Shop Now
                  </CTAButton>
                </ProductPreview>
              </motion.div>
            )}
          </AnimatePresence>
        </ContentWrapper>
      </PageContainer>
      <Footer />
    </>
  );
};

// Styled Components
const PageContainer = styled(motion.div)`
  background: linear-gradient(135deg, #d4e4d9, #f0f7f4);
  min-height: 80vh;
  padding: 4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 20px;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 128, 0, 0.1);
  text-align: center;
  @media (max-width: 768px) {
    padding: 2rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d6a4f;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #52796f;
  margin-bottom: 2rem;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const MissionText = styled.p`
  font-size: 1rem;
  color: #354f52;
  margin: 1rem 0 2rem;
  line-height: 1.6;
  font-style: italic;
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #95d5b2;
  margin: 1.5rem 0 2rem;
`;

const Loading = styled.div`
  font-size: 1.2rem;
  color: #52796f;
  padding: 2rem;
`;

const ProductPreview = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d6a4f;
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background: #f0f7f4;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: #2d6a4f;
  margin: 0.5rem 0;
  font-family: 'Montserrat', sans-serif;
`;

const ProductCategory = styled.p`
  font-size: 0.9rem;
  color: #52796f;
  margin: 0.25rem 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #1b4332;
  font-weight: bold;
`;

const CTAButton = styled(motion.button)`
  background: #2d6a4f;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  &:focus {
    outline: 2px solid #52796f;
    outline-offset: 2px;
  }
  @media (max-width: 480px) {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
`;

const FallbackMessage = styled.p`
  font-size: 1.2rem;
  color: #e74c3c;
  padding: 1rem;
`;

export default Dashboard;