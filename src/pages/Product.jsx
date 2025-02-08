/*import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // Assume user info is stored in redux; adjust the selector as needed.
  const user = useSelector((state) => state.user);

  // Using an object for a single product (instead of an array)
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
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        
        // Fetch similar products if category exists
        if (data.category) {
          setLoadingSimilar(true);
          const response2 = await fetch(
            `https://fakestoreapi.com/products/category/${data.category}`
          );
          const data2 = await response2.json();
          // Filter out the current product from similar products
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

  const LoadingComponent = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      {user && user.name && (
        <h2 className="mb-3">Welcome back, {user.name}!</h2>
      )}
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid personalized-product-image"
            src={product.image}
            alt={product.title}
            width="400px"
            height="400px"
          />
        </div>
        <div className="col-md-6 col-sm-12 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead">
            {product.rating && product.rating.rate} <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 my-4">${product.price}</h3>
          <p className="lead">{product.description}</p>
          <div className="btn-group">
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const LoadingSimilar = () => (
    <div className="my-4 py-4">
      <div className="d-flex justify-content-center">
        <Skeleton height={400} width={250} count={4} style={{ margin: "0 10px" }} />
      </div>
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      <h2 className="mb-3">You may also like</h2>
      <div className="d-flex">
        {similarProducts.map((item) => (
          <div key={item.id} className="card mx-4 text-center">
            <img
              className="card-img-top p-3 personalized-similar-img"
              src={item.image}
              alt={item.title}
              height={300}
              width={300}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
            </div>
            <div className="card-body">
              <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => addProduct(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      {loading ? <LoadingComponent /> : <ShowProduct />}
      <div className="container">
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loadingSimilar ? <LoadingSimilar /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
*/





import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import styled from "styled-components";
import { motion } from "framer-motion";

const Product = () => {
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
        const response = await fetch(`https://dummyjson.com/products${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        
        if (data.category) {
          setLoadingSimilar(true);
          const response2 = await fetch(
            `https://dummyjson.com/products/category/${data.category}`
          );
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
  const ShowProduct = () => (
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

export default Product;
