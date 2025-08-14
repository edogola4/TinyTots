import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaBox } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/products', {
        params: { search: searchTerm }
      });
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`/api/admin/products/${productId}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary">
          <FaPlus className="mr-2" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 p-2 border rounded-l"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 rounded-r">
              <FaSearch />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaBox className="mx-auto text-4xl mb-2 text-gray-300" />
            <p>No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-gray-200">
                          {product.images?.[0] && (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                        {product.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">${product.price?.toFixed(2)}</div>
                      {product.price < product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ${product.originalPrice?.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/admin/products/edit/${product._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
