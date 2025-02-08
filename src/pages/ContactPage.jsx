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
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneArrowDownRightIcon } from "@heroicons/react/24/outline";
import { Twitter, GitHub, Mail } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ submitting: false, success: false, error: "Failed to send message. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-12"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Let's Connect! 🌟
          </h1>
          <p className="text-lg text-gray-600">
            Have a question or want to collaborate?<br />
            Drop me a message and I'll get back to you faster than a TikTok trend!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            {status.success ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center p-8"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  You're awesome, {formData.name || "friend"}!
                </h2>
                <p className="text-gray-600">
                  I've got your message and will respond before your next coffee break.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hey Alex, I wanted to talk about..."
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                >
                  {status.submitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        {/* Loading spinner SVG */}
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message 🚀"
                  )}
                </button>

                {status.error && (
                  <div className="text-red-600 text-sm mt-4">{status.error}</div>
                )}
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Connect</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email Directly</h3>
                    <p className="text-gray-600">alex@devcorner.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Twitter className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Twitter DMs</h3>
                    <p className="text-gray-600">@alex_devcorner</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <GitHub className="h-6 w-6 text-gray-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">GitHub</h3>
                    <p className="text-gray-600">github.com/alex-devcorner</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Quick Support</h2>
              <p className="mb-6">Need immediate help? Schedule a call with me:</p>
              <button className="w-full bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all">
                Book a Zoom Meeting 📅
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ContactPage;