import api from './api';

const productService = {
  // Fetch all products
  async getProducts() {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error.response?.data?.message || 'Error fetching products';
    }
  },

  // Fetch a single product by ID
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error.response?.data?.message || 'Error fetching product';
    }
  },

  // Create a new product (admin only)
  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error.response?.data?.message || 'Error creating product';
    }
  },

  // Update a product (admin only)
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error.response?.data?.message || 'Error updating product';
    }
  },

  // Delete a product (admin only)
  async deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error.response?.data?.message || 'Error deleting product';
    }
  },

  // Search products
  async searchProducts(query) {
    try {
      const response = await api.get('/products/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error.response?.data?.message || 'Error searching products';
    }
  },
};

export default productService;
