import React, { useState, useCallback, useMemo } from "react";
import { Footer, Navbar } from "../components";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaGithub, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { SiX } from 'react-icons/si';

// Custom hook for form validation
const useFormValidation = (formData) => {
  return useMemo(() => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  }, [formData]);
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [status, setStatus] = useState({ 
    loading: false, 
    submitted: false, 
    error: null 
  });
  const [touched, setTouched] = useState({});

  const { errors, isValid } = useFormValidation(formData);

  // Memoized handler for input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (status.error) {
      setStatus(prev => ({ ...prev, error: null }));
    }
  }, [status.error]);

  // Handler for input blur (to show validation errors)
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  // Memoized submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!isValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setStatus({ loading: true, submitted: false, error: null });
    
    try {
      // Enhanced simulation with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 90% success rate
          Math.random() > 0.1 ? resolve() : reject(new Error("Network error"));
        }, 1500);
      });
      
      setStatus({ loading: false, submitted: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } catch (error) {
      setStatus({ 
        loading: false, 
        submitted: false, 
        error: error.message || "Submission failed. Please try again." 
      });
    }
  }, [isValid]);

  // Reset form handler
  const handleReset = useCallback(() => {
    setStatus({ loading: false, submitted: false, error: null });
    setFormData({ name: "", email: "", message: "" });
    setTouched({});
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Navbar />
      <PageContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ContentWrapper>
          <motion.div variants={itemVariants}>
            <Title>Contact Us 💌</Title>
            <Subtitle>
              Hey there! We'd love to hear from you. Drop us a message below, or reach out through our other channels.
            </Subtitle>
          </motion.div>
          
          <Divider />
          
          <AnimatePresence mode="wait">
            {status.loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingContainer>
                  <Spinner />
                  <LoadingText>Sending your message...</LoadingText>
                </LoadingContainer>
              </motion.div>
            )}
            
            {status.error && (
              <ErrorMessage
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                ❌ {status.error}
              </ErrorMessage>
            )}
            
            {status.submitted ? (
              <SuccessMessage
                key="success"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <FaCheckCircle size={24} />
                <div>
                  <strong>Thank you for reaching out!</strong>
                  <p>We'll get back to you within 24 hours.</p>
                  <ResetButton onClick={handleReset}>
                    Send Another Message
                  </ResetButton>
                </div>
              </SuccessMessage>
            ) : (
              <motion.div key="form" variants={itemVariants}>
                <Form onSubmit={handleSubmit} noValidate>
                  <FormField>
                    <Label htmlFor="name">
                      Name <RequiredStar>*</RequiredStar>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      $hasError={touched.name && errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      required
                    />
                    <AnimatePresence>
                      {touched.name && errors.name && (
                        <ErrorText
                          id="name-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {errors.name}
                        </ErrorText>
                      )}
                    </AnimatePresence>
                  </FormField>

                  <FormField>
                    <Label htmlFor="email">
                      Email <RequiredStar>*</RequiredStar>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      $hasError={touched.email && errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      required
                    />
                    <AnimatePresence>
                      {touched.email && errors.email && (
                        <ErrorText
                          id="email-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {errors.email}
                        </ErrorText>
                      )}
                    </AnimatePresence>
                  </FormField>

                  <FormField>
                    <Label htmlFor="message">
                      Message <RequiredStar>*</RequiredStar>
                    </Label>
                    <TextArea
                      id="message"
                      name="message"
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      $hasError={touched.message && errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      required
                    />
                    <CharacterCount $isNearLimit={formData.message.length > 400}>
                      {formData.message.length}/500
                    </CharacterCount>
                    <AnimatePresence>
                      {touched.message && errors.message && (
                        <ErrorText
                          id="message-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {errors.message}
                        </ErrorText>
                      )}
                    </AnimatePresence>
                  </FormField>

                  <ButtonContainer>
                    <Button 
                      type="submit" 
                      disabled={status.loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status.loading ? "Sending..." : "Send Message"}
                    </Button>
                  </ButtonContainer>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Divider />
          
          <motion.div variants={itemVariants}>
            <ContactMethods>
              <MethodTitle>Other ways to reach us:</MethodTitle>
              <MethodList>
                <MethodItem
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope size={20} />
                  <MethodLink href="mailto:contact@boutique.com">
                    Email Us
                  </MethodLink>
                </MethodItem>
                <MethodItem
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SiX size={20} color="#000000"/>
                  <MethodLink 
                    href="https://x.com/boutique" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Message on X
                  </MethodLink>
                </MethodItem>
                <MethodItem
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={20} />
                  <MethodLink 
                    href="https://github.com/boutique" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </MethodLink>
                </MethodItem>
                <MethodItem
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCalendarAlt size={20} />
                  <MethodLink 
                    href="https://calendly.com/boutique/meeting" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Book a Meeting
                  </MethodLink>
                </MethodItem>
              </MethodList>
            </ContactMethods>
          </motion.div>
        </ContentWrapper>
      </PageContainer>
      <Footer />
    </>
  );
};

export default ContactPage;

/* Enhanced Styled Components */

const PageContainer = styled(motion.div)`
  background: linear-gradient(135deg, #ffe6e6, #fff0e6);
  min-height: 80vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  padding: 2.5rem 3rem;
  border-radius: 20px;
  max-width: 650px;
  width: 100%;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #d35400;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ddd, transparent);
  margin: 2rem 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

const Spinner = styled.div`
  border: 4px solid rgba(211, 84, 0, 0.1);
  border-left-color: #d35400;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

const ErrorMessage = styled(motion.div)`
  color: #e74c3c;
  background: #fdf2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuccessMessage = styled(motion.div)`
  padding: 2rem;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border: 1px solid #a3d9a5;
  border-radius: 16px;
  color: #155724;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  div {
    text-align: left;
    flex: 1;
  }
  
  strong {
    font-size: 1.3rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0 0 1rem 0;
    color: #0f5132;
  }
`;

const ResetButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: #218838;
  }
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
  position: relative;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const RequiredStar = styled.span`
  color: #e74c3c;
  margin-left: 2px;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${props => props.$hasError ? '#e74c3c' : '#e1e5e9'};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.$hasError ? '#fdf2f2' : 'white'};
  
  &:focus {
    border-color: ${props => props.$hasError ? '#e74c3c' : '#d35400'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(211, 84, 0, 0.1)'};
  }
  
  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${props => props.$hasError ? '#e74c3c' : '#e1e5e9'};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: ${props => props.$hasError ? '#fdf2f2' : 'white'};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  
  &:focus {
    border-color: ${props => props.$hasError ? '#e74c3c' : '#d35400'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(211, 84, 0, 0.1)'};
  }
  
  &::placeholder {
    color: #999;
  }
`;

const CharacterCount = styled.div`
  font-size: 0.8rem;
  color: ${props => props.$isNearLimit ? '#f39c12' : '#999'};
  text-align: right;
  margin-top: 0.25rem;
`;

const ErrorText = styled(motion.div)`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6b6b, #f39c12);
  border: none;
  color: white;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactMethods = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const MethodTitle = styled.h3`
  font-size: 1.5rem;
  color: #d35400;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const MethodList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
`;

const MethodItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(211, 84, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(211, 84, 0, 0.05);
    border-color: rgba(211, 84, 0, 0.2);
  }
`;

const MethodLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  text-align: center;
  
  &:hover {
    color: #d35400;
  }
`;