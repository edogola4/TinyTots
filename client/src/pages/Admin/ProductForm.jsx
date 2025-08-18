import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  CircularProgress,
  IconButton,
  Divider,
  Chip,
  Alert
} from '@mui/material';
import { PhotoCamera, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProduct, uploadProductPhoto } from '../../services/adminService';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    countInStock: '',
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categories] = useState([
    'Toys',
    'Clothing',
    'Books',
    'Baby Care',
    'Furniture',
    'Feeding',
    'Nursery',
    'Bath',
    'Health & Safety'
  ]);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await getProduct(id);
          const product = response.data;
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            brand: product.brand,
            countInStock: product.countInStock.toString(),
          });
          if (product.image) {
            setImagePreview(product.image);
          }
        } catch (err) {
          setError('Failed to load product data');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
    // In a real app, you might want to add logic to remove the image from the server
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price');
      return false;
    }
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }
    if (!formData.countInStock || isNaN(formData.countInStock) || parseInt(formData.countInStock) < 0) {
      setError('Please enter a valid stock quantity');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;
    
    try {
      setSaving(true);
      
      // Prepare product data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock)
      };
      
      let product;
      
      // Create or update product
      if (isEditMode) {
        const response = await updateProduct(id, productData);
        product = response.data;
      } else {
        const response = await createProduct(productData);
        product = response.data;
      }
      
      // Upload image if a new one was selected
      if (image) {
        await uploadProductPhoto(product._id, image);
      }
      
      setSuccess(`Product ${isEditMode ? 'updated' : 'created'} successfully!`);
      
      // Redirect to products list after a short delay
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/admin/products')}
        >
          Back to Products
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 0, step: 0.01 }}
                    margin="normal"
                    InputProps={{
                      startAdornment: <Chip label="$" size="small" sx={{ mr: 1 }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    name="countInStock"
                    type="number"
                    value={formData.countInStock}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 0 }}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Image
                </Typography>
                <Box 
                  sx={{
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    textAlign: 'center',
                    mb: 2,
                    minHeight: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    bgcolor: 'action.hover',
                  }}
                >
                  {imagePreview ? (
                    <Box sx={{ position: 'relative', width: '100%' }}>
                      <Box
                        component="img"
                        src={imagePreview}
                        alt="Product preview"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 200,
                          borderRadius: 1,
                        }}
                      />
                      <IconButton
                        color="error"
                        onClick={handleRemoveImage}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'background.paper',
                          '&:hover': {
                            bgcolor: 'background.default',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <PhotoCamera sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Upload a product image
                      </Typography>
                    </>
                  )}
                </Box>
                
                <Button
                  fullWidth
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Choose Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1, textAlign: 'center' }}>
                  JPG, PNG up to 5MB
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/admin/products')}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving}
                >
                  {saving ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : isEditMode ? (
                    'Update Product'
                  ) : (
                    'Create Product'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ProductForm;
