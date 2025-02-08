/*import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

const Products = () => {
  const [data, setData] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addProduct = useCallback((product) => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        if (isMounted) {
          setData(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isMounted) setLoading(false);
      }
    };
    getProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCat === "All") return data;
    return data.filter((item) => item.category === activeCat);
  }, [data, activeCat]);

  const handleFilter = useCallback((cat) => {
    setActiveCat(cat);
  }, []);

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        {["All", "men's clothing", "women's clothing", "jewelery", "electronics"].map((cat) => (
          <button
            key={cat}
            className={`btn btn-outline-dark btn-sm m-2 ${activeCat === cat ? "active" : ""}`}
            onClick={() => handleFilter(cat)}
          >
            {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <div className="card text-center h-100 modern-card">
              <img
                className="card-img-top p-3"
                src={product.image}
                alt={product.title || "Product image"}
                height={300}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {product.title.substring(0, 12)}...
                </h5>
                <p className="card-text">
                  {product.description.substring(0, 90)}...
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item lead">$ {product.price}</li>
              </ul>
              <div className="card-body modern-card-footer">
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-dark m-1"
                >
                  Buy Now <FaArrowRight />
                </Link>
                <button
                  className="btn btn-dark m-1"
                  onClick={() => addProduct(product)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <p className="lead text-center">
            Browse our curated collection of must-have items!
          </p>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
*/


import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import styled from "styled-components";

const Products = () => {
  const [data, setData] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Dynamic, playful greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, little star!";
    if (hour < 18) return "Good afternoon, little explorer!";
    return "Good evening, little dreamer!";
  };

  const addProduct = useCallback(
    (product) => {
      dispatch(addCart(product));
      toast.success("Added to cart");
    },
    [dispatch]
  );

  useEffect(() => {
    let isMounted = true;
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        if (isMounted) {
          setData(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isMounted) setLoading(false);
      }
    };
    getProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCat === "All") return data;
    return data.filter((item) => item.category === activeCat);
  }, [data, activeCat]);

  const handleFilter = useCallback((cat) => {
    setActiveCat(cat);
  }, []);

  // Loading skeleton with modern layout
  const LoadingSkeleton = () => (
    <SkeletonWrapper>
      <Skeleton height={50} width={300} style={{ margin: "0 auto 2rem" }} />
      <GridContainer>
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i}>
            <Skeleton height={250} />
            <Skeleton height={20} style={{ margin: "1rem 0" }} />
            <Skeleton height={15} count={2} />
          </SkeletonCard>
        ))}
      </GridContainer>
    </SkeletonWrapper>
  );

  // Main products display with animations and modern styling
  const ShowProducts = () => (
    <>
      <FilterContainer>
        {["All", "men's clothing", "women's clothing", "jewelery", "electronics"].map((cat) => (
          <FilterButton
            key={cat}
            className={activeCat === cat ? "active" : ""}
            onClick={() => handleFilter(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>
      <GridContainer>
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ImageContainer>
              <ProductImage 
                src={product.image}
                alt={product.title || "Product image"}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </ImageContainer>
            <CardContent>
              <ProductTitle>
                {product.title.substring(0, 12)}...
              </ProductTitle>
              <ProductDescription>
                {product.description.substring(0, 90)}...
              </ProductDescription>
            </CardContent>
            <PriceTag>$ {product.price}</PriceTag>
            <CardFooter>
              <StyledLink
                to={`/product/${product.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Now <FaArrowRight />
              </StyledLink>
              <StyledButton
                onClick={() => addProduct(product)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart /> Add to Cart
              </StyledButton>
            </CardFooter>
          </ProductCard>
        ))}
      </GridContainer>
    </>
  );

  return (
    <PageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Greeting>{getGreeting()}</Greeting>
        <Title>Latest Products 🧸</Title>
        <SubTitle>
          Browse our curated collection of must-have items, sustainably styled for your little one!
        </SubTitle>
      </Header>
      {loading ? <LoadingSkeleton /> : <ShowProducts />}
    </PageContainer>
  );
};

export default Products;

/* Styled Components */

const PageContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  background: #f0f2f5;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Greeting = styled(motion.h4)`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const Title = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const FilterButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.7);
  border: none;
  padding: 0.6rem 1.2rem;
  margin: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
  
  &.active {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: #fff;
  }
  
  &:hover {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: #fff;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  transition: transform 0.3s ease;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const ProductTitle = styled.h5`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #222;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #444;
`;

const PriceTag = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6b6b;
  text-align: center;
  margin: 1rem 0;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const StyledLink = styled(motion(Link))`
  text-decoration: none;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledButton = styled(motion.button)`
  background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkeletonWrapper = styled.div`
  padding: 2rem;
`;

const SkeletonCard = styled.div`
  margin-bottom: 2rem;
`;
