import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Button,
  Container,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  Inventory as ProductsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Products', icon: <ProductsIcon />, path: '/admin/products' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orders' },
  { text: 'Users', icon: <UsersIcon />, path: '/admin/users' },
];

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          TinyTots Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user?.name}
            </Typography>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Button 
              color="inherit" 
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children || <Outlet />}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;
