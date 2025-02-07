import React, { useState } from "react";
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
