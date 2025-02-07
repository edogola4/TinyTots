import React, { useEffect, useState } from "react";
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
