import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { styled, useTheme, alpha } from '@mui/material/styles';
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
  Tooltip,
  Stack,
  Badge,
  useMediaQuery,
  CssBaseline
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  Inventory as ProductsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AdminPanelSettings as AdminIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const drawerWidth = 260;
const collapsedWidth = 72;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    border: 'none',
    boxShadow: theme.shadows[3],
    '&.MuiDrawer-paperCollapsed': {
      width: collapsedWidth,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: collapsedWidth,
    width: `calc(100% - ${collapsedWidth}px)`,
  }),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${collapsedWidth}px`,
    marginTop: '64px',
    ...(open && {
      marginLeft: `${drawerWidth}px`,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(2),
    },
  })
);

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Products', icon: <ProductsIcon />, path: '/admin/products' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orders' },
  { text: 'Users', icon: <UsersIcon />, path: '/admin/users' },
  { text: 'Roles', icon: <AdminIcon />, path: '/admin/roles' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.background.default,
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: '64px',
          px: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        {!collapsed && (
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            TinyTots Admin
          </Typography>
        )}
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{
            p: 1,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', py: 2 }}>
        <List>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItem 
                key={item.text} 
                disablePadding 
                sx={{ 
                  display: 'block',
                  mb: 0.5,
                  px: 2,
                }}
              >
                <Tooltip title={collapsed ? item.text : ''} placement="right">
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={active}
                    sx={{
                      minHeight: 48,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      px: 2.5,
                      borderRadius: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.main',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'primary.contrastText',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: collapsed ? 0 : 2,
                        justifyContent: 'center',
                        color: active ? 'primary.contrastText' : 'inherit',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: active ? 600 : 'normal',
                            color: active ? 'primary.contrastText' : 'inherit',
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>
      
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar 
            alt={user?.name} 
            src={user?.avatar} 
            sx={{ 
              width: collapsed ? 36 : 40, 
              height: collapsed ? 36 : 40,
              bgcolor: 'primary.main',
              fontSize: '1rem',
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          {!collapsed && (
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.role?.name || 'User'}
              </Typography>
            </Box>
          )}
          {!collapsed && (
            <Tooltip title="Logout">
              <IconButton 
                size="small" 
                onClick={handleLogout}
                sx={{
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Box>
    </Box>
  );

  const mobileDrawer = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: drawerWidth,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );

  const desktopDrawer = (
    <StyledDrawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          ...(collapsed && {
            width: collapsedWidth,
          }),
        },
      }}
      open={!collapsed}
    >
      <Box 
        className={collapsed ? 'MuiDrawer-paperCollapsed' : ''}
        sx={{ 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {drawerContent}
      </Box>
    </StyledDrawer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <StyledAppBar position="fixed" open={!collapsed}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              mr: 2,
              color: 'text.primary',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Button 
              color="inherit" 
              onClick={handleLogout} 
              startIcon={<LogoutIcon />}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      
      {/* Mobile Drawer */}
      {mobileDrawer}
      
      {/* Desktop Drawer */}
      {desktopDrawer}
      
      {/* Main Content */}
      <Main open={!collapsed}>
        <Toolbar /> {/* This pushes content down below the app bar */}
        {children || <Outlet />}
      </Main>
    </Box>
  );
};

export default AdminLayout;
