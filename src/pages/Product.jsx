import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/action';
import { Footer, Navbar } from '../components';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/Items.json');
        const data = await response.json();
        const productId = parseInt(id, 10);
        const singleProduct = data.find((item) => item.id === productId);
        setProduct(singleProduct);
        setLoading(false);

        if (singleProduct && singleProduct.category) {
          setLoadingSimilar(true);
          const filteredSimilarProducts = data.filter(
            (item) =>
              item.category === singleProduct.category && item.id !== singleProduct.id
          );
          setSimilarProducts(filteredSimilarProducts);
          setLoadingSimilar(false);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
        setLoadingSimilar(false);
      }
    };
    fetchProductData();
  }, [id]);

  // Skeleton loading component for the main product
  const LoadingComponent = () => (
    <ProductContainer>
      <ImageWrapper>
        <Skeleton height={400} width={400} />
      </ImageWrapper>
      <InfoWrapper>
        <Skeleton height={30} width={250} style={{ marginBottom: '1rem' }} />
        <Skeleton height={90} style={{ marginBottom: '1rem' }} />
        <Skeleton height={40} width={70} style={{ marginBottom: '1rem' }} />
        <Skeleton height={50} width={110} style={{ marginBottom: '1rem' }} />
        <Skeleton height={120} style={{ marginBottom: '1rem' }} />
        <Skeleton height={40} width={110} inline={true} />
        <Skeleton height={40} width={110} style={{ marginLeft: '1rem' }} />
      </InfoWrapper>
    </ProductContainer>
  );

  // Main product display
  const ShowProduct = () => {
    if (!product) {
      return <FallbackMessage>Product not found.</FallbackMessage>;
    }
    return (
      <ProductContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        role="article"
        aria-labelledby="product-title"
      >
        {user && user.name && (
          <WelcomeMessage>Welcome back, {user.name}!</WelcomeMessage>
        )}
        <ImageWrapper>
          <ProductImage
            as={motion.img}
            src={product.image}
            alt={`Eco-friendly ${product.title || product.name}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </ImageWrapper>
        <InfoWrapper>
          <CategoryText>{product.category?.toUpperCase() || 'CATEGORY'}</CategoryText>
          <Title id="product-title">{product.title || product.name}</Title>
          <RatingText>
            {product.rating && product.rating.rate} <i className="fa fa-star" aria-hidden="true" />
          </RatingText>
          <PriceText>KSH{product.price}</PriceText>
          <Description>{product.description}</Description>
          <ButtonGroup>
            <ActionButton
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addProduct(product)}
              aria-label={`Add ${product.title || product.name} to cart`}
            >
              Add to Cart
            </ActionButton>
            <StyledLink to="/cart" aria-label="Go to shopping cart">
              Go to Cart
            </StyledLink>
          </ButtonGroup>
        </InfoWrapper>
      </ProductContainer>
    );
  };

  // Skeleton loading for similar products
  const LoadingSimilar = () => (
    <SimilarContainer>
      <Skeleton height={400} width={250} count={4} style={{ margin: '0 10px' }} />
    </SimilarContainer>
  );

  // Display similar products in a marquee
  const ShowSimilarProduct = () => (
    <SimilarWrapper>
      <SimilarTitle>You may also like</SimilarTitle>
      <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
        {similarProducts.map((item) => (
          <SimilarCard
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SimilarImage src={item.image} alt={`Eco-friendly ${item.title || item.name}`} />
            <SimilarInfo>
              <SimilarName>{(item.title || item.name).substring(0, 15)}...</SimilarName>
              <SimilarActions>
                <StyledLinkSmall to={`/product/${item.id}`}>
                  Buy Now
                </StyledLinkSmall>
                <ActionButtonSmall
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addProduct(item)}
                  aria-label={`Add ${item.title || item.name} to cart`}
                >
                  Add to Cart
                </ActionButtonSmall>
              </SimilarActions>
            </SimilarInfo>
          </SimilarCard>
        ))}
      </Marquee>
    </SimilarWrapper>
  );

  return (
    <>
      <Navbar />
      <MainContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        role="main"
        aria-labelledby="product-title"
      >
        {loading ? <LoadingComponent /> : <ShowProduct />}
        <SectionWrapper>
          {loadingSimilar ? <LoadingSimilar /> : <ShowSimilarProduct />}
        </SectionWrapper>
      </MainContainer>
      <Footer />
    </>
  );
};

/* Styled Components */
const MainContainer = styled(motion.div)`
  background: linear-gradient(135deg, #d4e4d9, #f0f7f4);
  min-height: 80vh;
  padding: 4rem 1rem;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

const ProductContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  padding: 2rem;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 128, 0, 0.1);
  backdrop-filter: blur(8px);
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 16px;
`;

const InfoWrapper = styled.div`
  flex: 1;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const WelcomeMessage = styled.h2`
  width: 100%;
  text-align: center;
  color: #2d6a4f;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 1rem;
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const FallbackMessage = styled.h2`
  width: 100%;
  text-align: center;
  color: #e74c3c;
  font-family: 'Montserrat', sans-serif;
  margin: 2rem 0;
`;

const CategoryText = styled.h4`
  color: #52796f;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2d6a4f;
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const RatingText = styled.p`
  font-size: 1.1rem;
  color: #95d5b2;
  margin-bottom: 1rem;
`;

const PriceText = styled.h3`
  font-size: 1.8rem;
  color: #1b4332;
  margin-bottom: 1rem;
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #52796f;
  line-height: 1.6;
  margin-bottom: 2rem;
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #2d6a4f;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  &:focus {
    outline: 2px solid #52796f;
    outline-offset: 2px;
  }
`;

const StyledLink = styled(Link)`
  padding: 0.8rem 1.5rem;
  background: #52796f;
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  &:hover {
    background: #2d6a4f;
  }
  &:focus {
    outline: 2px solid #2d6a4f;
    outline-offset: 2px;
  }
`;

const SectionWrapper = styled.div`
  margin: 3rem auto;
  padding: 2rem;
  max-width: 1200px;
`;

const SimilarWrapper = styled.div`
  margin: 2rem 0;
`;

const SimilarTitle = styled.h2`
  text-align: center;
  color: #2d6a4f;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 2rem;
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SimilarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SimilarCard = styled(motion.div)`
  background: #f0f7f4;
  border-radius: 16px;
  overflow: hidden;
  width: 250px;
  box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);
  margin: 0 10px;
`;

const SimilarImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const SimilarInfo = styled.div`
  padding: 1rem;
  text-align: center;
`;

const SimilarName = styled.h5`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #2d6a4f;
  font-family: 'Montserrat', sans-serif;
`;

const SimilarActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledLinkSmall = styled(Link)`
  padding: 0.5rem 1rem;
  background: #52796f;
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 0.9rem;
  font-family: 'Montserrat', sans-serif;
  &:hover {
    background: #2d6a4f;
  }
  &:focus {
    outline: 2px solid #2d6a4f;
    outline-offset: 2px;
  }
`;

const ActionButtonSmall = styled.button`
  padding: 0.5rem 1rem;
  background: #2d6a4f;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  font-family: 'Montserrat', sans-serif;
  &:focus {
    outline: 2px solid #52796f;
    outline-offset: 2px;
  }
`;

export default Product;