import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  TextField,
  Alert,
  Snackbar,
  Avatar,
  Chip,
  Tooltip,
  Grid
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon,
  Image as ImageIcon,
  CheckCircle as InStockIcon,
  Cancel as OutOfStockIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { getProducts, deleteProduct } from '../../services/adminService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
      showSnackbar('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(selectedProduct._id);
      setProducts(products.filter(product => product._id !== selectedProduct._id));
      showSnackbar('Product deleted successfully', 'success');
    } catch (err) {
      showSnackbar('Failed to delete product', 'error');
    } finally {
      setOpenDialog(false);
      setSelectedProduct(null);
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

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Products Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/admin/products/new"
        >
          Add Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow hover key={product._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar 
                            src={product.image} 
                            variant="rounded"
                            sx={{ width: 56, height: 56, mr: 2 }}
                          >
                            <ImageIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1">{product.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {product.description?.substring(0, 50)}...
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={product.category} 
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {formatPrice(product.price)}
                        </Typography>
                        {product.originalPrice > product.price && (
                          <Typography variant="body2" color="error" sx={{ textDecoration: 'line-through' }}>
                            {formatPrice(product.originalPrice)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{product.countInStock}</TableCell>
                      <TableCell>
                        {product.countInStock > 0 ? (
                          <Chip 
                            icon={<InStockIcon />} 
                            label="In Stock" 
                            color="success" 
                            size="small" 
                            variant="outlined"
                          />
                        ) : (
                          <Chip 
                            icon={<OutOfStockIcon />} 
                            label="Out of Stock" 
                            color="error" 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <DeleteIcon />
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the product <strong>{selectedProduct?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
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

export default Products;
