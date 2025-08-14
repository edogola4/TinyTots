const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  attributes: {
    type: Map,
    of: String,
    default: {}
  }
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Please provide a city'],
    trim: true
  },
  postalCode: {
    type: String,
    required: [true, 'Please provide a postal code'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please provide a country'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true
  }
});

const paymentResultSchema = new mongoose.Schema({
  id: String,
  status: String,
  update_time: String,
  email_address: String
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  paymentMethod: {
    type: String,
    required: true,
    enum: ['stripe', 'paypal', 'cod'],
    default: 'cod'
  },
  paymentResult: paymentResultSchema,
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

// Update product stock when order is created
orderSchema.post('save', async function(doc) {
  if (doc.orderItems && doc.orderItems.length > 0) {
    for (const item of doc.orderItems) {
      await mongoose.model('Product').updateOne(
        { _id: item.product },
        { $inc: { stock: -item.quantity } }
      );
    }
  }
});

// Update product stock if order is cancelled
orderSchema.pre('findOneAndUpdate', async function() {
  const docToUpdate = await this.model.findOne(this.getQuery());
  
  if (docToUpdate && this._update.status === 'cancelled' && docToUpdate.status !== 'cancelled') {
    for (const item of docToUpdate.orderItems) {
      await mongoose.model('Product').updateOne(
        { _id: item.product },
        { $inc: { stock: item.quantity } }
      );
    }
  }
});

// Add text index for search
orderSchema.index(
  { 
    'orderNumber': 'text',
    'shippingAddress.fullName': 'text',
    'shippingAddress.email': 'text',
    'user': 'text'
  },
  {
    weights: {
      'orderNumber': 5,
      'shippingAddress.fullName': 3,
      'shippingAddress.email': 3,
      'user': 2
    }
  }
);

// Static method to get monthly sales
orderSchema.statics.getMonthlySales = async function() {
  const currentYear = new Date().getFullYear();
  
  return this.aggregate([
    {
      $match: {
        isPaid: true,
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalSales: { $sum: '$totalPrice' },
        orderCount: { $sum: 1 }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ]);
};

module.exports = mongoose.model('Order', orderSchema);
