const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true
    }
  }],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: 'Kenya' },
    phone: String
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['PayPal', 'Stripe', 'M-Pesa', 'Cash on Delivery', 'Bank Transfer']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0.0,
    min: 0
  },
  couponCode: String,
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: Date,
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'completed'],
    default: 'pending'
  },
  trackingNumber: String,
  carrier: String,
  estimatedDelivery: Date,
  notes: String,
  orderNumber: {
    type: String,
    unique: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate order number before saving
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `TT${timestamp.slice(-6)}${random}`;
  }
  next();
});

// Calculate total price before saving
OrderSchema.pre('save', function(next) {
  // Calculate items price
  this.itemsPrice = this.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Calculate total price (items + tax + shipping - discount)
  this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice - this.discount;
  
  next();
});

// Virtual for order age in days
OrderSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
});

// Virtual for total items count
OrderSchema.virtual('totalItems').get(function() {
  return this.orderItems.reduce((acc, item) => acc + item.quantity, 0);
});

// Virtual for full customer name
OrderSchema.virtual('customerName').get(function() {
  return `${this.shippingAddress.firstName} ${this.shippingAddress.lastName}`;
});

// Virtual for order status display
OrderSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    completed: 'Completed'
  };
  return statusMap[this.status] || this.status;
});

// Instance method to mark as paid
OrderSchema.methods.markAsPaid = function() {
  this.isPaid = true;
  this.paidAt = Date.now();
  return this.save();
};

// Instance method to mark as delivered
OrderSchema.methods.markAsDelivered = function() {
  this.isDelivered = true;
  this.deliveredAt = Date.now();
  this.status = 'delivered';
  return this.save();
};

// Instance method to cancel order
OrderSchema.methods.cancelOrder = function(reason = '') {
  this.status = 'cancelled';
  this.notes = reason;
  return this.save();
};

// Static method to get order statistics
OrderSchema.statics.getOrderStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalValue: { $sum: '$totalPrice' }
      }
    },
    {
      $project: {
        status: '$_id',
        count: 1,
        totalValue: 1,
        _id: 0
      }
    }
  ]);
};

// Indexes for better query performance
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ 'paymentResult.id': 1 });
OrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);