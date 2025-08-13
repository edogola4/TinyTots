import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: "",
    email: "", 
    password: "",
    confirmPassword: ""
  });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    // Form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
      setStatus({ loading: false, error: "All fields are required.", success: false });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus({ loading: false, error: "Passwords do not match.", success: false });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ loading: false, error: "Please enter a valid email.", success: false });
      return;
    }

    if (formData.password.length < 6) {
      setStatus({ loading: false, error: "Password must be at least 6 characters.", success: false });
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setStatus({ loading: false, error: null, success: true });
      navigate("/" || "/dashboard");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        role="main"
      >
        <ContentWrapper>
          <Title>Join TinyTots!</Title>
          <Subtitle>
            Create an account to get started.
          </Subtitle>
          <Divider />
          {status.loading && <Spinner aria-label="Loading, please wait" />}
          {status.error && <ErrorMessage role="alert">{status.error}</ErrorMessage>}
          {status.success && (
            <SuccessMessage
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              role="alert"
            >
              🎉 Registration successful! Redirecting to login...
            </SuccessMessage>
          )}
          {!status.success && (
            <StyledForm onSubmit={handleRegister} noValidate>
              <FormField>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={status.loading}
                />
              </FormField>
              
              <FormField>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={status.loading}
                />
              </FormField>
              
              <FormField>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min 6 characters)"
                  required
                  disabled={status.loading}
                />
              </FormField>
              
              <FormField>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  disabled={status.loading}
                />
              </FormField>
              
              <FormLinks>
                <p>
                  Already have an account?{" "}
                  <StyledLink to="/login" aria-label="Log in to your account">
                    Login
                  </StyledLink>
                </p>
              </FormLinks>
              
              <Button 
                type="submit" 
                disabled={status.loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status.loading ? "Registering..." : "Register"}
              </Button>
            </StyledForm>
          )}
        </ContentWrapper>
      </PageContainer>
      <Footer />
    </>
  );
};

/* Styled Components */
const PageContainer = styled(motion.div)`
  background: linear-gradient(135deg, #e6f0ff, #f0f7ff);
  min-height: 80vh;
  padding: 4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #ddd;
  margin: 1.5rem 0 2rem;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #2c3e50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 1rem auto;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  padding: 0.5rem;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
`;

const SuccessMessage = styled(motion.div)`
  padding: 1.5rem;
  background: #dff0d8;
  border-radius: 8px;
  color: #3c763d;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    border-color: #2c3e50;
    box-shadow: 0 0 5px rgba(44, 62, 80, 0.3);
    outline: none;
  }
  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

const FormLinks = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #666;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3498db;
  font-weight: 500;
  transition: color 0.3s ease;
  &:hover {
    color: #2c3e50;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #3498db, #2980b9);
  border: none;
  color: #fff;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease, background 0.3s ease, opacity 0.3s ease;
  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: linear-gradient(45deg, #5dade2, #5499c7);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Register;