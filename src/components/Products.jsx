import React, { useState, useEffect, useCallback, useMemo } from "react";
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
