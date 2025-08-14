import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUsers, FaBox, FaShoppingCart, FaChartLine } from 'react-icons/fa';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
  }
  p {
    color: #666;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    font-size: 2rem;
    margin-right: 1rem;
    color: #4f46e5;
  }
  
  .info {
    h3 {
      margin: 0;
      font-size: 0.9rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    p {
      margin: 0.25rem 0 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
    }
  }
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  h2 {
    margin-top: 0;
    font-size: 1.25rem;
    color: #1f2937;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .activity-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    .activity-item {
      padding: 1rem 0;
      border-bottom: 1px solid #f3f4f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &:last-child {
        border-bottom: none;
      }
      
      .activity-details {
        .title {
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }
        
        .time {
          font-size: 0.875rem;
          color: #6b7280;
        }
      }
      
      .status {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        font-weight: 500;
        
        &.completed {
          background-color: #ecfdf5;
          color: #059669;
        }
        
        &.pending {
          background-color: #fef3c7;
          color: #d97706;
        }
      }
    }
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Sample data - replace with actual data from your API
  const stats = [
    { 
      title: 'Total Users', 
      value: '1,234', 
      icon: <FaUsers className="icon" />,
      onClick: () => navigate('/admin/users')
    },
    { 
      title: 'Products', 
      value: '256', 
      icon: <FaBox className="icon" />,
      onClick: () => navigate('/admin/products')
    },
    { 
      title: 'Orders', 
      value: '189', 
      icon: <FaShoppingCart className="icon" />,
      onClick: () => navigate('/admin/orders')
    },
    { 
      title: 'Revenue', 
      value: '$24,780', 
      icon: <FaChartLine className="icon" />
    },
  ];
  
  const recentActivities = [
    { id: 1, title: 'New order #1234 received', time: '2 min ago', status: 'completed' },
    { id: 2, title: 'User John Doe registered', time: '10 min ago', status: 'completed' },
    { id: 3, title: 'Product "Blue T-Shirt" updated', time: '25 min ago', status: 'completed' },
    { id: 4, title: 'Order #1233 shipped', time: '1 hour ago', status: 'pending' },
    { id: 5, title: 'New product added', time: '2 hours ago', status: 'completed' },
  ];

  return (
    <DashboardContainer>
      <Header>
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your store today.</p>
      </Header>
      
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index} onClick={stat.onClick}>
            {stat.icon}
            <div className="info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </StatCard>
        ))}
      </StatsGrid>
      
      <RecentActivity>
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          {recentActivities.map(activity => (
            <li key={activity.id} className="activity-item">
              <div className="activity-details">
                <div className="title">{activity.title}</div>
                <div className="time">{activity.time}</div>
              </div>
              <div className={`status ${activity.status}`}>
                {activity.status === 'completed' ? 'Completed' : 'Pending'}
              </div>
            </li>
          ))}
        </ul>
      </RecentActivity>
    </DashboardContainer>
  );
};

export default AdminDashboard;
