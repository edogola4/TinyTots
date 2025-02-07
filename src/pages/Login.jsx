import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  // Local state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form submission handler (replace with your auth logic)
  const handleLogin = (e) => {
    e.preventDefault();
    // For demonstration, log the credentials
    console.log("Logging in with:", email, password);
    // Implement your login logic here (API call, validations, etc.)
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        {/* Personalized greeting message */}
        <h1 className="text-center">Welcome Back!</h1>
        <p className="text-center text-muted">
          We’re excited to see you again. Please login to continue.
        </p>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              <div className="my-3">
                <label htmlFor="emailInput" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <p>
                  New here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
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

export default Login;
