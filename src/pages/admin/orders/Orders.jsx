import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentStatusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  refunded: 'bg-purple-100 text-purple-800',
  failed: 'bg-red-100 text-red-800',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/orders', {
        params: { 
          search: searchTerm,
          status: statusFilter === 'all' ? '' : statusFilter
        }
      });
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Orders</h1>
        <p className="text-gray-600">View and manage customer orders</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 flex">
              <input
                type="text"
                placeholder="Search orders..."
                className="flex-1 p-2 border rounded-l"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-4 rounded-r">
                <FaSearch />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter by status:</span>
              <select 
                className="border rounded p-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaBox className="mx-auto text-4xl mb-2 text-gray-300" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.orderNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.shippingAddress?.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{order.user?.email || 'Guest'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">${order.total?.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusStyles[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${paymentStatusStyles[order.paymentStatus] || 'bg-gray-100 text-gray-800'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Order"
                        >
                          <FaEye />
                        </Link>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'processing')}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as Processing"
                          >
                            <FaCheckCircle />
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'shipped')}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Mark as Shipped"
                          >
                            <FaTruck />
                          </button>
                        )}
                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel Order"
                          >
                            <FaTimesCircle />
                          </button>
                        )}
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

export default Orders;
