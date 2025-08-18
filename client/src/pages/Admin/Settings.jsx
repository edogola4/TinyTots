import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Tabs, 
  Tab, 
  Paper,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
  Avatar
} from '@mui/material';
import { 
  Settings as SettingsIcon,
  Save as SaveIcon,
  Store as StoreIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [storeName, setStoreName] = React.useState('TinyTots');
  const [storeEmail, setStoreEmail] = React.useState('contact@tinytots.com');
  const [currency, setCurrency] = React.useState('USD');
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    promotions: true,
  });
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Settings saved');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <SettingsIcon sx={{ mr: 1, fontSize: 32 }} />
          <Typography variant="h4" component="h1">
            Settings
          </Typography>
        </Box>
        
        <Paper sx={{ width: '100%', mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Store Information" icon={<StoreIcon />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Security" icon={<LockIcon />} iconPosition="start" {...a11yProps(2)} />
          </Tabs>
          
          <form onSubmit={handleSubmit}>
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Store Name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Store Email"
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    margin="normal"
                    required
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={currency}
                      label="Currency"
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <MenuItem value="USD">US Dollar ($)</MenuItem>
                      <MenuItem value="EUR">Euro (€)</MenuItem>
                      <MenuItem value="GBP">British Pound (£)</MenuItem>
                      <MenuItem value="JPY">Japanese Yen (¥)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Avatar
                      src="/logo192.png"
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 2,
                        border: '2px solid',
                        borderColor: 'divider'
                      }}
                    />
                    <Button variant="outlined" component="label">
                      Upload Logo
                      <input type="file" hidden />
                    </Button>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Recommended size: 200x200px
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>Email Notifications</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.email}
                    onChange={handleNotificationChange}
                    name="email"
                  />
                }
                label="Email notifications"
              />
              <Box sx={{ ml: 4, mt: 1, mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Receive email notifications for important updates and activities.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>Push Notifications</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.push}
                    onChange={handleNotificationChange}
                    name="push"
                  />
                }
                label="Push notifications"
              />
              <Box sx={{ ml: 4, mt: 1, mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Receive push notifications in your browser.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>Marketing & Promotions</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.promotions}
                    onChange={handleNotificationChange}
                    name="promotions"
                  />
                }
                label="Promotional emails"
              />
              <Box sx={{ ml: 4, mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Receive emails about new products, promotions, and special offers.
                </Typography>
              </Box>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>Change Password</Typography>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                error={newPassword !== confirmPassword && confirmPassword !== ''}
                helperText={newPassword !== confirmPassword && confirmPassword !== '' ? 'Passwords do not match' : ''}
              />
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>Two-Factor Authentication</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable two-factor authentication"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary" paragraph>
                Add an extra layer of security to your account by enabling two-factor authentication.
              </Typography>
            </TabPanel>
            
            <Divider />
            
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings;
