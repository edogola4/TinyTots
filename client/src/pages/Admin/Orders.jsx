import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Grid,
  Select,
  Chip,
  Tooltip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Visibility as VisibilityIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Cancel as CancelledIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { getOrders, updateOrderStatus, updateOrderToDelivered } from '../../services/adminService';

const statusColors = {
  'pending': 'warning',
  'processing': 'info',
  'shipped': 'primary',
  'delivered': 'success',
  'cancelled': 'error'
};

const statusIcons = {
  'pending': <PaymentIcon />,
  'processing': <EditIcon />,
  'shipped': <ShippingIcon />,
  'delivered': <DeliveredIcon />,
  'cancelled': <CancelledIcon />
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch orders');
      showSnackbar('Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChangeClick = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.status);
    setStatusDialogOpen(true);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  const handleStatusUpdate = async () => {
    try {
      if (selectedStatus === 'delivered') {
        await updateOrderToDelivered(selectedOrder._id);
      } else {
        await updateOrderStatus(selectedOrder._id, { status: selectedStatus });
      }
      
      // Update the orders list
      const updatedOrders = orders.map(order => 
        order._id === selectedOrder._id 
          ? { ...order, status: selectedStatus, isDelivered: selectedStatus === 'delivered' } 
          : order
      );
      
      setOrders(updatedOrders);
      showSnackbar('Order status updated successfully', 'success');
      setStatusDialogOpen(false);
    } catch (err) {
      showSnackbar('Failed to update order status', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getStatusChip = (status) => (
    <Chip
      icon={statusIcons[status] || null}
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      color={statusColors[status] || 'default'}
      size="small"
      variant="outlined"
    />
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Orders Management</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow hover key={order._id}>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          #{order._id.substring(0, 8)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {order.user?.name || 'Guest'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {order.user?.email || order.shippingAddress?.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.orderItems?.length || 0}</TableCell>
                      <TableCell>
                        <Typography fontWeight="medium">
                          {formatPrice(order.totalPrice)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {getStatusChip(order.status)}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton
                            color="primary"
                            onClick={() => handleViewDetails(order)}
                            size="small"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update Status">
                          <IconButton
                            color="secondary"
                            onClick={() => handleStatusChangeClick(order)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Order #{selectedOrder?._id?.substring(0, 8)}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Current Status: {selectedOrder?.status}
          </Typography>
          <Select
            fullWidth
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleStatusUpdate} 
            variant="contained"
            disabled={!selectedStatus || selectedStatus === selectedOrder?.status}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog 
        open={orderDetailsOpen} 
        onClose={() => setOrderDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              Order #{selectedOrder._id.substring(0, 8)}
              <Box display="flex" alignItems="center" mt={1}>
                <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                  Status:
                </Typography>
                {getStatusChip(selectedOrder.status)}
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>Order Items</Typography>
                  <List>
                    {selectedOrder.orderItems?.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar src={item.image} variant="rounded" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.name}
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item.qty} x {formatPrice(item.price)}
                                </Typography>
                                {` — ${item.description?.substring(0, 50)}...`}
                              </>
                            }
                          />
                          <Typography variant="subtitle1">
                            {formatPrice(item.qty * item.price)}
                          </Typography>
                        </ListItem>
                        {index < selectedOrder.orderItems.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>Order Summary</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>{formatPrice(selectedOrder.itemsPrice)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Shipping:</Typography>
                    <Typography>{formatPrice(selectedOrder.shippingPrice)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Tax:</Typography>
                    <Typography>{formatPrice(selectedOrder.taxPrice)}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6">{formatPrice(selectedOrder.totalPrice)}</Typography>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Shipping Address</Typography>
                  <Typography>{selectedOrder.shippingAddress?.fullName}</Typography>
                  <Typography>{selectedOrder.shippingAddress?.address}</Typography>
                  <Typography>
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}
                  </Typography>
                  <Typography>{selectedOrder.shippingAddress?.country}</Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOrderDetailsOpen(false)}>Close</Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  setOrderDetailsOpen(false);
                  handleStatusChangeClick(selectedOrder);
                }}
              >
                Update Status
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Orders;
