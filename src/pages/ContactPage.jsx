/*import React, { useState } from "react";
import { Footer, Navbar } from "../components";

const ContactPage = () => {
  // Local state for managing form input and submission feedback
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could send formData to an API endpoint
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <p className="text-center text-muted">
          We’d love to hear from you! Please fill out the form below and we’ll get back to you soon.
        </p>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-6 col-sm-10 mx-auto">
            {submitted ? (
              <div className="alert alert-success text-center">
                Thank you for reaching out, {formData.name || "guest"}! We will be in touch shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form my-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form my-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form my-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="form-control"
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button className="my-2 px-4 mx-auto btn btn-dark" type="submit">
                    Send
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
*/

import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaEnvelope, FaTwitter, FaGithub, FaCalendarAlt } from "react-icons/fa";

const ContactPage = () => {
  // State for form data and status (loading, submitted, error)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, submitted: false, error: null });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, submitted: false, error: null });
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus({ loading: false, submitted: true, error: null });
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      setStatus({ loading: false, submitted: false, error: "Submission failed. Please try again." });
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ContentWrapper>
          <Title>Contact Us 💌</Title>
          <Subtitle>
            Hey there! We'd love to hear from you. Drop us a message below, or reach out through our other channels.
          </Subtitle>
          <Divider />
          {status.loading && <Spinner />}
          {status.error && <ErrorMessage>{status.error}</ErrorMessage>}
          {status.submitted ? (
            <SuccessMessage
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              🎉 Thank you for reaching out! We'll get back to you soon.
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormField>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <Button type="submit">Send Message</Button>
            </Form>
          )}
          <Divider />
          <ContactMethods>
            <MethodTitle>Other ways to reach us:</MethodTitle>
            <MethodList>
              <MethodItem>
                <FaEnvelope size={20} />
                <MethodLink href="mailto:contact@boutique.com">Email Us</MethodLink>
              </MethodItem>
              <MethodItem>
                <FaTwitter size={20} />
                <MethodLink href="https://x.com/boutique" target="_blank" rel="noopener noreferrer">
                  Message on X
                </MethodLink>
              </MethodItem>
              <MethodItem>
                <FaGithub size={20} />
                <MethodLink href="https://github.com/boutique" target="_blank" rel="noopener noreferrer">
                  GitHub
                </MethodLink>
              </MethodItem>
              <MethodItem>
                <FaCalendarAlt size={20} />
                <MethodLink href="https://calendly.com/boutique/meeting" target="_blank" rel="noopener noreferrer">
                  Book a Meeting
                </MethodLink>
              </MethodItem>
            </MethodList>
          </ContactMethods>
        </ContentWrapper>
      </PageContainer>
      <Footer />
    </>
  );
};

export default ContactPage;

/* Styled Components */

const PageContainer = styled(motion.div)`
  background: linear-gradient(135deg, #ffe6e6, #fff0e6);
  min-height: 80vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  padding: 2rem 3rem;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #d35400;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #eee;
  margin: 1rem 0 2rem;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #d35400;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 1rem auto;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const SuccessMessage = styled(motion.div)`
  padding: 1.5rem;
  background: #dff0d8;
  border-radius: 8px;
  color: #3c763d;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
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
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #d35400;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #d35400;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
  border: none;
  color: #fff;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease, background 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ContactMethods = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const MethodTitle = styled.h3`
  font-size: 1.4rem;
  color: #d35400;
  margin-bottom: 1rem;
`;

const MethodList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const MethodItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const MethodLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s ease;
  &:hover {
    color: #d35400;
  }
`;
