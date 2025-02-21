
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import styled from "styled-components";
import { motion } from "framer-motion";

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState({});
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
       // eslint-disable-next-line no-lone-blocks
       {/* const response = await fetch(`https://dummyjson.com/products${id}`); */}
       const response = await fetch("/Items.json")
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        
        if (data.category) {
          setLoadingSimilar(true);
        // eslint-disable-next-line no-lone-blocks
        {/*  const response2 = await fetch(
            `https://dummyjson.com/products/category/${data.category}`
          ); */}
          const response2 = await fetch("/Items.json")
          const data2 = await response2.json();
          const filteredProducts = data2.filter(item => item.id !== data.id);
          setSimilarProducts(filteredProducts);
          setLoadingSimilar(false);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
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
        <Skeleton height={30} width={250} style={{ marginBottom: "1rem" }} />
        <Skeleton height={90} style={{ marginBottom: "1rem" }} />
        <Skeleton height={40} width={70} style={{ marginBottom: "1rem" }} />
        <Skeleton height={50} width={110} style={{ marginBottom: "1rem" }} />
        <Skeleton height={120} style={{ marginBottom: "1rem" }} />
        <Skeleton height={40} width={110} inline={true} />
        <Skeleton height={40} width={110} style={{ marginLeft: "1rem" }} />
      </InfoWrapper>
    </ProductContainer>
  );

  // Main product display with personalized welcome message and modern styling
  /* const ShowProduct = () => (
    <ProductContainer>
      {user && user.name && (
        <WelcomeMessage>Welcome back, {user.name}!</WelcomeMessage>
      )}
      <ImageWrapper>
        <ProductImage src={product.image} alt={product.title} />
      </ImageWrapper>
      <InfoWrapper>
        <CategoryText>{product.category.toUpperCase()}</CategoryText>
        <Title>{product.title}</Title>
        <RatingText>
          {product.rating && product.rating.rate}{" "}
          <i className="fa fa-star" />
        </RatingText>
        <PriceText>${product.price}</PriceText>
        <Description>{product.description}</Description>
        <ButtonGroup>
          <ActionButton onClick={() => addProduct(product)}>
            Add to Cart
          </ActionButton>
          <StyledLink to="/cart">Go to Cart</StyledLink>
        </ButtonGroup>
      </InfoWrapper>
    </ProductContainer>
  );*/
  const ShowProduct = () => (
    <ProductContainer>
      {user && user.name && (
        <WelcomeMessage>Welcome back, {user.name}!</WelcomeMessage>
      )}
      <ImageWrapper>
        <ProductImage src={product.image} alt={product.title || "Product Image"} />
      </ImageWrapper>
      <InfoWrapper>
        <CategoryText>{product.category?.toUpperCase() || "CATEGORY"}</CategoryText>
        <Title>{product.title}</Title>
        <RatingText>
          {product.rating && product.rating.rate}{" "}
          <i className="fa fa-star" />
        </RatingText>
        <PriceText>${product.price}</PriceText>
        <Description>{product.description}</Description>
        <ButtonGroup>
          <ActionButton onClick={() => addProduct(product)}>
            Add to Cart
          </ActionButton>
          <StyledLink to="/cart">Go to Cart</StyledLink>
        </ButtonGroup>
      </InfoWrapper>
    </ProductContainer>
  );
  

  // Skeleton loading component for similar products
  const LoadingSimilar = () => (
    <SimilarContainer>
      <Skeleton height={400} width={250} count={4} style={{ margin: "0 10px" }} />
    </SimilarContainer>
  );

  // Display similar products in a horizontal marquee
  const ShowSimilarProduct = () => (
    <SimilarWrapper>
      <SimilarTitle>You may also like</SimilarTitle>
      <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
        {similarProducts.map((item) => (
          <SimilarCard key={item.id}>
            <SimilarImage src={item.image} alt={item.title} />
            <SimilarInfo>
              <SimilarName>{item.title.substring(0, 15)}...</SimilarName>
              <SimilarActions>
                <StyledLinkSmall to={`/product/${item.id}`}>
                  Buy Now
                </StyledLinkSmall>
                <ActionButtonSmall onClick={() => addProduct(item)}>
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
      {loading ? <LoadingComponent /> : <ShowProduct />}
      <SectionWrapper>
        {loadingSimilar ? <LoadingSimilar /> : <ShowSimilarProduct />}
      </SectionWrapper>
      <Footer />
    </>
  );
};

//export default Product;

/* Styled Components */

const ProductContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  padding: 2rem;
  max-width: 1200px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
`;

const ImageWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const WelcomeMessage = styled.h2`
  width: 100%;
  text-align: center;
  color: #d35400;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 1rem;
`;

const CategoryText = styled.h4`
  color: #999;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const RatingText = styled.p`
  font-size: 1.1rem;
  color: #f39c12;
  margin-bottom: 1rem;
`;

const PriceText = styled.h3`
  font-size: 1.8rem;
  color: #d35400;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledLink = styled(Link)`
  padding: 0.8rem 1.5rem;
  background: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: background 0.3s ease;
  &:hover {
    background: #555;
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
  color: #d35400;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 2rem;
`;

const SimilarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SimilarCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  color: #333;
`;

const SimilarActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledLinkSmall = styled(Link)`
  padding: 0.5rem 1rem;
  background: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background 0.3s ease;
  &:hover {
    background: #555;
  }
`;

const ActionButtonSmall = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export default Products;
