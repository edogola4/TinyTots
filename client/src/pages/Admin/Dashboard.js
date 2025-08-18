import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Box, Card, CardContent,
  List, ListItem, ListItemIcon, ListItemAvatar, Avatar, ListItemText, Divider, 
  Button, IconButton, useTheme, alpha, Skeleton, Stack
} from '@mui/material';
import { 
  People as PeopleIcon, 
  ShoppingCart as OrdersIcon, 
  Inventory as ProductsIcon, 
  AttachMoney as RevenueIcon,
  CheckCircle as CheckCircleIcon, 
  LocalShipping as ShippingIcon,
  Pending as PendingIcon, 
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { getDashboardStats } from '../../services/adminService';
import { DashboardSkeleton } from '../../components/LoadingSkeleton';

const StatCard = ({ title, value, icon, change, isPositive }) => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
          <Typography variant="body2" color={isPositive ? 'success.main' : 'error.main'}>
            {isPositive ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />} {change}%
          </Typography>
        </Box>
        <Box sx={{ p: 1, borderRadius: '50%', bgcolor: theme.palette.primary.light }}>
          {icon}
        </Box>
      </Box>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock data for development
  const mockStats = {
    totalUsers: 1245,
    totalOrders: 342,
    totalProducts: 89,
    totalRevenue: 12543.87,
    recentOrders: [
      { id: 1, customer: 'John Doe', amount: 129.99, status: 'completed' },
      { id: 2, customer: 'Jane Smith', amount: 89.50, status: 'processing' },
      { id: 3, customer: 'Robert Johnson', amount: 45.99, status: 'shipped' },
    ],
    recentUsers: [
      { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2023-08-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2023-08-14' },
      { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joinDate: '2023-08-13' },
    ]
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          // In production, uncomment this:
          // const data = await getDashboardStats();
          setStats(mockStats);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const recentActivities = [
    { id: 1, text: 'New order received', time: '2 min ago', icon: <CheckCircleIcon color="success" /> },
    { id: 2, text: 'Order shipped', time: '1 hour ago', icon: <ShippingIcon color="info" /> },
    { id: 3, text: 'New user registered', time: '3 hours ago', icon: <PeopleIcon color="primary" /> },
    { id: 4, text: 'Payment pending', time: '5 hours ago', icon: <PendingIcon color="warning" /> },
    { id: 5, text: 'Sales up 15%', time: '1 day ago', icon: <TrendingUpIcon color="success" /> },
  ];

  if (loading) return <DashboardSkeleton />;
  if (error) return (
    <Box sx={{ p: 3, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 2, mb: 3 }}>
      <Typography>{error}</Typography>
    </Box>
  );
  if (!stats) return <DashboardSkeleton />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
      
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={<PeopleIcon />}
            change={12.5}
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={<OrdersIcon />}
            change={8.2}
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Products" 
            value={stats.totalProducts} 
            icon={<ProductsIcon />}
            change={5.7}
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Revenue" 
            value={formatCurrency(stats.totalRevenue)} 
            icon={<RevenueIcon />}
            change={15.3}
            isPositive={true}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 3 }}>
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
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2 }}>
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
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;