import React from 'react'
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3 personalized-about-page">
        <h1 className="text-center display-4">About Us</h1>
        <hr />
        <p className="lead text-center">
          Welcome to TinyTots Boutique! We are passionate about delivering the best products and experiences to our customers.
          Our journey began with a simple idea – to innovate and inspire. Today, we continue to grow, driven by our commitment
          to quality, creativity, and customer satisfaction.
        </p>
        <section className="my-5">
          <h2 className="text-center py-4">Our Story</h2>
          <p className="text-center">
            Founded in 2025, TinyTots Boutique started as a small venture fueled by innovation and a desire to make a difference.
            Over the years, we have expanded our offerings and refined our vision. Our dedicated team works tirelessly to bring you
            products that not only meet your needs but also exceed your expectations.
          </p>
        </section>
        <section className="my-5">
          <h2 className="text-center py-4">Our Products</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-3 px-3">
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top img-fluid"
                  src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Mens's Clothing"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Kids's Clothing</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3 px-3">
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top img-fluid"
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Women's Clothing"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Women's Clothing</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3 px-3">
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top img-fluid"
                  src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Jewelery"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Jewelery</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3 px-3">
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top img-fluid"
                  src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Electronics"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Electronics</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage;
