import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Sample featured products (in a real app, this would come from an API)
const featuredProducts = [
  {
    id: 1,
    name: 'Baby Onesies',
    description: 'Soft and comfortable cotton onesies for your little one',
    price: '$19.99',
    image: 'https://via.placeholder.com/300x200?text=Baby+Onesie'
  },
  {
    id: 2,
    name: 'Baby Bottles',
    description: 'BPA-free baby bottles with anti-colic technology',
    price: '$14.99',
    image: 'https://via.placeholder.com/300x200?text=Baby+Bottle'
  },
  {
    id: 3,
    name: 'Baby Stroller',
    description: 'Lightweight and compact stroller for easy travel',
    price: '$129.99',
    image: 'https://via.placeholder.com/300x200?text=Baby+Stroller'
  }
];

const Home = () => {
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.light',
          py: 8,
          textAlign: 'center',
          color: 'primary.contrastText',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to TinyTots
          </Typography>
          <Typography variant="h5" paragraph>
            Your one-stop shop for all your baby needs
          </Typography>
          
          {!user ? (
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                color="secondary"
                sx={{ color: 'white' }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                size="large"
                color="inherit"
                sx={{ borderColor: 'white', color: 'white' }}
              >
                Register
              </Button>
            </Box>
          ) : (
            <Button
              component={Link}
              to={user.role === 'admin' ? '/admin/dashboard' : '/products'}
              variant="contained"
              size="large"
              color="secondary"
              sx={{ mt: 4, color: 'white' }}
            >
              Go to {user.role === 'admin' ? 'Dashboard' : 'Shop'}
            </Button>
          )}
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Featured Products
        </Typography>
        
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Start Shopping?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Discover our wide range of baby products at unbeatable prices.
          </Typography>
          <Button
            component={Link}
            to={user ? (user.role === 'admin' ? '/admin/products' : '/products') : '/products'}
            variant="contained"
            size="large"
            color="primary"
            sx={{ mt: 2 }}
          >
            {user && user.role === 'admin' ? 'Manage Products' : 'Shop Now'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
