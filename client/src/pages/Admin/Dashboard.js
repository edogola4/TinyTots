import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Grid, Box, Card, CardContent,
  List, ListItem, ListItemIcon, ListItemText, Divider, LinearProgress, Button
} from '@mui/material';
import { 
  People as PeopleIcon, ShoppingCart as OrdersIcon, 
  Inventory as ProductsIcon, AttachMoney as RevenueIcon,
  CheckCircle as CheckCircleIcon, LocalShipping as ShippingIcon,
  Pending as PendingIcon, TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { getDashboardStats } from '../../services/adminService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const statsCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <PeopleIcon fontSize="large" color="primary" />,
      color: 'primary',
      link: '/admin/users'
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: <ProductsIcon fontSize="large" color="secondary" />,
      color: 'secondary',
      link: '/admin/products'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <OrdersIcon fontSize="large" color="success" />,
      color: 'success',
      link: '/admin/orders'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: <RevenueIcon fontSize="large" color="warning" />,
      color: 'warning'
    },
  ];

  const recentActivities = [
    { id: 1, text: 'New order received', time: '2 min ago', icon: <CheckCircleIcon color="success" /> },
    { id: 2, text: 'Order shipped', time: '1 hour ago', icon: <ShippingIcon color="info" /> },
    { id: 3, text: 'New user registered', time: '3 hours ago', icon: <PeopleIcon color="primary" /> },
    { id: 4, text: 'Payment pending', time: '5 hours ago', icon: <PendingIcon color="warning" /> },
    { id: 5, text: 'Sales up 15%', time: '1 day ago', icon: <TrendingUpIcon color="success" /> },
  ];

  if (loading) return <LinearProgress />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
      
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      
      <Grid container spacing={3} mb={4}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              component={card.link ? RouterLink : 'div'} 
              to={card.link}
              sx={{
                height: '100%',
                p: 2,
                textDecoration: 'none',
                '&:hover': { boxShadow: card.link ? 3 : 1 }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    {card.title}
                  </Typography>
                  <Typography variant="h4">{card.value}</Typography>
                </Box>
                <Box sx={{ p: 1, borderRadius: '50%', bgcolor: `${card.color}.light` }}>
                  {card.icon}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Sales Overview</Typography>
            <Box height={300}>
              {/* Placeholder for chart */}
              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                height="100%"
                bgcolor="action.hover"
                borderRadius={1}
              >
                <Typography color="text.secondary">Sales Chart</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Recent Activities</Typography>
            <List>
              {recentActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem disableGutters>
                    <ListItemIcon>{activity.icon}</ListItemIcon>
                    <ListItemText 
                      primary={activity.text} 
                      secondary={activity.time} 
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            <Box textAlign="center" mt={2}>
              <Button size="small" component={RouterLink} to="/admin/orders">
                View All Activities
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;