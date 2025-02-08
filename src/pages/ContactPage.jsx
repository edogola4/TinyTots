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
      <PageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ContentWrapper>
          <Title> 🌟Contact Us 💌 </Title>
          <Subtitle>
            We’d love to hear from you! Please fill out the form below and we’ll get back to you soon.
          </Subtitle>
          <Divider />
          {submitted ? (
            <SuccessMessage>
              Thank you for reaching out, {formData.name || "guest"}! We will be in touch shortly.
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormField>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
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
                  placeholder="Enter your message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <Button type="submit">Send Message</Button>
            </Form>
          )}
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
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

const SuccessMessage = styled.div`
  padding: 1.5rem;
  background: #dff0d8;
  border-radius: 8px;
  color: #3c763d;
  font-size: 1.2rem;
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
  transition: transform 0.3s ease, background 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;
