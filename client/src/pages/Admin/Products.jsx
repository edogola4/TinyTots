import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Typography, IconButton, TablePagination,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Alert, Snackbar, Avatar, Chip, Tooltip, Grid, Card, CardContent,
  InputAdornment, MenuItem, FormControl, InputLabel, Select,
  Skeleton, useTheme, CircularProgress
} from '@mui/material';
import { 
  Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon,
  Image as ImageIcon, CheckCircle as InStockIcon, Cancel as OutOfStockIcon,
  Search as SearchIcon, FilterList as FilterIcon, Refresh as RefreshIcon,
  Warning as WarningIcon, Visibility as VisibilityIcon, Sort as SortIcon
} from '@mui/icons-material';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency } from '../../utils/format';
import { mockProducts } from '../../mocks/products';

// Status options for filtering
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
  { value: 'low-stock', label: 'Low Stock' }
];

// Sort options
const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'stock-asc', label: 'Stock (Low to High)' },
  { value: 'stock-desc', label: 'Stock (High to Low)' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' }
];

const Products = () => {
  const theme = useTheme();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [categories] = useState([
    'Electronics', 'Clothing', 'Home & Garden', 'Books', 'Toys', 'Beauty', 'Sports', 'Other'
  ]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API call with mock data
        setTimeout(() => {
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
          setError('');
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch products');
        showError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [showError]);

  // Apply filters and sorting
  useEffect(() => {
    if (products.length === 0) return;
    
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term)) ||
        (product.category && product.category.toLowerCase().includes(term))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(product => {
        if (statusFilter === 'in-stock') return product.countInStock > 10;
        if (statusFilter === 'out-of-stock') return product.countInStock === 0;
        if (statusFilter === 'low-stock') return product.countInStock > 0 && product.countInStock <= 10;
        return true;
      });
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const [field, order] = sortBy.split('-');
      let comparison = 0;
      
      if (field === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (field === 'price') {
        comparison = a.price - b.price;
      } else if (field === 'stock') {
        comparison = a.countInStock - b.countInStock;
      } else if (sortBy === 'newest' || sortBy === 'oldest') {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        comparison = dateA - dateB;
        if (sortBy === 'newest') comparison = -comparison;
      }
      
      return order === 'desc' && sortBy !== 'newest' && sortBy !== 'oldest' ? -comparison : comparison;
    });
    
    setFilteredProducts(result);
    setPage(0);
  }, [products, searchTerm, statusFilter, categoryFilter, sortBy]);

  // Handle product deletion
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(prev => prev.filter(p => p._id !== selectedProduct._id));
      showSuccess('Product deleted successfully');
    } catch (err) {
      showError('Failed to delete product');
    } finally {
      setOpenDialog(false);
      setSelectedProduct(null);
      setLoading(false);
    }
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('newest');
  };

  // Get status chip color and icon
  const getStatusChip = (stock) => {
    if (stock === 0) {
      return {
        color: 'error',
        icon: <OutOfStockIcon />,
        label: 'Out of Stock'
      };
    } else if (stock <= 10) {
      return {
        color: 'warning',
        icon: <WarningIcon />,
        label: 'Low Stock'
      };
    } else {
      return {
        color: 'success',
        icon: <InStockIcon />,
        label: 'In Stock'
      };
    }
  };

  // Render loading skeleton
  const renderSkeleton = () => (
    Array(rowsPerPage).fill().map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Skeleton variant="rectangular" width={56} height={56} sx={{ mr: 2, borderRadius: 1 }} />
            <Box>
              <Skeleton width={150} height={24} />
              <Skeleton width={200} height={20} sx={{ mt: 0.5 }} />
            </Box>
          </Box>
        </TableCell>
        <TableCell><Skeleton width={80} /></TableCell>
        <TableCell><Skeleton width={60} /></TableCell>
        <TableCell><Skeleton width={40} /></TableCell>
        <TableCell><Skeleton width={80} /></TableCell>
        <TableCell>
          <Skeleton variant="circular" width={32} height={32} sx={{ display: 'inline-block', mr: 1 }} />
          <Skeleton variant="circular" width={32} height={32} sx={{ display: 'inline-block' }} />
        </TableCell>
      </TableRow>
    ))
  );

  // Render empty state
  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center' }}>
          <ImageIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search or filter criteria
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <Box>
      {/* Header and Actions */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>Products</Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your products inventory
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/products/new')}
            sx={{ height: 42 }}
          >
            Add Product
          </Button>
        </Box>

        {/* Filters and Search */}
        <Card sx={{ mb: 3, overflow: 'visible' }}>
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                    startAdornment={
                      <InputAdornment position="start">
                        <SortIcon color="action" />
                      </InputAdornment>
                    }
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={resetFilters}
                  sx={{ height: 40 }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Products Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                renderSkeleton()
              ) : filteredProducts.length === 0 ? (
                renderEmptyState()
              ) : (
                filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => {
                    const status = getStatusChip(product.countInStock);
                    return (
                      <TableRow 
                        hover 
                        key={product._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar 
                              src={product.image} 
                              variant="rounded"
                              sx={{ 
                                width: 56, 
                                height: 56, 
                                mr: 2,
                                bgcolor: 'grey.100',
                                '& img': { objectFit: 'contain' }
                              }}
                            >
                              <ImageIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" component="div">
                                {product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {product.description?.substring(0, 50)}{product.description?.length > 50 ? '...' : ''}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={product.category} 
                            size="small"
                            sx={{ 
                              textTransform: 'capitalize',
                              bgcolor: 'primary.light',
                              color: 'primary.contrastText',
                              fontWeight: 500
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight="medium">
                            {formatCurrency(product.price)}
                          </Typography>
                          {product.originalPrice > product.price && (
                            <Typography variant="body2" color="error" sx={{ textDecoration: 'line-through' }}>
                              {formatCurrency(product.originalPrice)}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {product.countInStock} units
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={status.icon}
                            label={status.label}
                            color={status.color}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => navigate(`/admin/products/${product._id}`)}
                              sx={{ mr: 0.5 }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                              sx={{ mr: 0.5 }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteClick(product)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2, 
          borderTop: `1px solid ${theme.palette.divider}` 
        }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredProducts.length === 0 ? 0 : page * rowsPerPage + 1} to{' '}
            {Math.min((page + 1) * rowsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
          </Typography>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ '& .MuiTablePagination-toolbar': { p: 0 } }}
          />
        </Box>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="delete-dialog-title">
          <Box display="flex" alignItems="center">
            <WarningIcon color="error" sx={{ mr: 1 }} />
            Confirm Delete
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{selectedProduct?.name}</strong>? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Alert */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;
