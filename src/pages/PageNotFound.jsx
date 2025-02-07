import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
                <h1>404</h1>
              <h4 className="p-3 display-5">Whoops! The page you're looking for seems to have vanished.</h4>
              <Link to="/" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;