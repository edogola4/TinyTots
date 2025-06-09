import React from 'react';
import { Footer, Navbar } from "../components";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { email: 'Guest' };

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
          <Title>Welcome, {user.email}!</Title>
          <Subtitle>
            You’re logged in to TinyTots. Explore your dashboard.
          </Subtitle>
          <Divider />
          <p>Here’s your personalized dashboard. More features coming soon!</p>
        </ContentWrapper>
      </PageContainer>
      <Footer />
    </>
  );
};

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

export default Dashboard;