import React from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="container my-4 py-4">
        <h1 className="text-center mb-3">Join the TinyTots Boutique Family</h1>
        <hr className="mb-4" />
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="form-group my-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="Email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Create a secure password"
                  required
                />
              </div>
              <div className="my-3 text-center">
                <p>
                  Already a member?{' '}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login here
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
