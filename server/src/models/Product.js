const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be a positive number']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price must be a positive number']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'clothing',
      'shoes',
      'accessories',
      'toys',
      'baby-care',
      'nursery',
      'feeding',
      'bath',
      'safety',
      'other'
    ]
  },
  subcategory: {
    type: String,
    required: [true, 'Please add a subcategory']
  },
  images: {
    type: [String],
    required: [true, 'Please add at least one image']
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  sku: {
    type: String,
    required: [true, 'Please add a SKU'],
    unique: true,
    uppercase: true
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  attributes: {
    type: Map,
    of: [String],
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create product slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // replace spaces with -
      .replace(/--+/g, '-') // replace multiple - with single -
      .trim() // trim - from start and end
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Reverse populate with virtuals
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Cascade delete reviews when a product is deleted
productSchema.pre('remove', async function(next) {
  await this.model('Review').deleteMany({ product: this._id });
  next();
});

// Create text index for search
productSchema.index({ 
  name: 'text',
  description: 'text',
  category: 'text',
  subcategory: 'text',
  sku: 'text'
}, {
  weights: {
    name: 5,
    sku: 5,
    subcategory: 3,
    category: 2,
    description: 1
  }
});

// Static method to get average rating
productSchema.statics.getAverageRating = async function(productId) {
  const obj = await this.model('Review').aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      rating: obj[0] ? obj[0].averageRating : 0,
      numReviews: obj[0] ? obj[0].numReviews : 0
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model('Product', productSchema);
