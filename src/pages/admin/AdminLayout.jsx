import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBox, 
  FaShoppingCart, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #1e293b;
  color: white;
  padding: 1.5rem 0;
  transition: all 0.3s;
  position: fixed;
  height: 100%;
  z-index: 1000;
  
  @media (max-width: 768px) {
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${({ isOpen }) => isOpen ? '4px 0 10px rgba(0,0,0,0.1)' : 'none'};
  }
`;

const Logo = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #334155;
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    
    span {
      color: #818cf8;
      margin-left: 0.5rem;
    }
  }
`;

const Nav = styled.nav`
  padding: 0 1rem;
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-item {
    margin-bottom: 0.5rem;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: #e2e8f0;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: all 0.2s;
    
    &:hover {
      background-color: #334155;
      color: white;
    }
    
    &.active {
      background-color: #4f46e5;
      color: white;
    }
    
    svg {
      margin-right: 0.75rem;
      font-size: 1.1rem;
    }
  }
  
  .nav-section {
    margin: 1.5rem 0;
    
    h3 {
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      margin: 0 0 0.5rem 1rem;
      letter-spacing: 0.05em;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  transition: margin 0.3s;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const TopBar = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #4f46e5;
    cursor: pointer;
    
    @media (max-width: 768px) {
      display: block;
    }
  }
  
  .user-menu {
    display: flex;
    align-items: center;
    
    .user-info {
      text-align: right;
      margin-right: 1rem;
      
      .user-name {
        font-weight: 600;
        color: #1f2937;
        margin: 0;
      }
      
      .user-role {
        font-size: 0.75rem;
        color: #6b7280;
        margin: 0;
      }
    }
    
    .logout-btn {
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
      
      &:hover {
        background-color: #f3f4f6;
        color: #ef4444;
      }
      
      svg {
        margin-right: 0.5rem;
      }
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  // Get user info from your auth context or state
  const user = {
    name: 'Admin User',
    email: 'admin@tinytots.com',
    role: 'admin'
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <Logo>
          <h2>TinyTops <span>Admin</span></h2>
        </Logo>
        <Nav>
          <ul>
            <li className="nav-item">
              <Link to="/admin" className="nav-link" onClick={() => setIsSidebarOpen(false)}>
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
          </ul>
          
          <div className="nav-section">
            <h3>Management</h3>
            <ul>
              <li className="nav-item">
                <Link to="/admin/users" className="nav-link" onClick={() => setIsSidebarOpen(false)}>
                  <FaUsers /> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/products" className="nav-link" onClick={() => setIsSidebarOpen(false)}>
                  <FaBox /> Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/orders" className="nav-link" onClick={() => setIsSidebarOpen(false)}>
                  <FaShoppingCart /> Orders
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="nav-section">
            <h3>Settings</h3>
            <ul>
              <li className="nav-item">
                <Link to="/admin/settings" className="nav-link" onClick={() => setIsSidebarOpen(false)}>
                  <FaCog /> Settings
                </Link>
              </li>
            </ul>
          </div>
        </Nav>
      </Sidebar>
      
      <MainContent>
        <TopBar>
          <button className="menu-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="user-menu">
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-role">{user.role}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </TopBar>
        
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;
