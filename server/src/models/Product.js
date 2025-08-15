const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Clothing',
      'Toys',
      'Books',
      'Shoes',
      'Accessories',
      'Feeding',
      'Diapering',
      'Bath & Body',
      'Nursery',
      'Gear',
      'Other'
    ]
  },
  subcategory: {
    type: String,
    maxlength: [50, 'Subcategory cannot be more than 50 characters']
  },
  brand: {
    type: String,
    maxlength: [50, 'Brand cannot be more than 50 characters']
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  countInStock: {
    type: Number,
    required: [true, 'Please add quantity in stock'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  lowStockLevel: {
    type: Number,
    default: 5
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  colors: [{
    name: String,
    hexCode: String
  }],
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M', '2T', '3T', '4T', '5T']
  }],
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
    default: 0
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  onSale: {
    type: Boolean,
    default: false
  },
  saleStartDate: Date,
  saleEndDate: Date,
  tags: [String],
  metaTitle: String,
  metaDescription: String,
  isActive: {
    type: Boolean,
    default: true
  },
  ageRange: {
    min: {
      type: Number,
      min: 0
    },
    max: {
      type: Number,
      min: 0
    }
  },
  material: String,
  careInstructions: String,
  warnings: String,
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create product slug from the name
ProductSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Generate SKU if not provided
ProductSchema.pre('save', function(next) {
  if (!this.sku) {
    this.sku = this.category.substring(0, 3).toUpperCase() + 
               Date.now().toString().slice(-6) + 
               Math.random().toString(36).substring(2, 5).toUpperCase();
  }
  next();
});

// Calculate if product is on sale
ProductSchema.virtual('isOnSale').get(function() {
  if (!this.onSale) return false;
  
  const now = new Date();
  if (this.saleStartDate && now < this.saleStartDate) return false;
  if (this.saleEndDate && now > this.saleEndDate) return false;
  
  return true;
});

// Calculate discount percentage
ProductSchema.virtual('discountPercent').get(function() {
  if (!this.comparePrice || this.comparePrice <= this.price) return 0;
  return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
});

// Check if product is in stock
ProductSchema.virtual('inStock').get(function() {
  return this.countInStock > 0;
});

// Check if stock is low
ProductSchema.virtual('lowStock').get(function() {
  return this.countInStock <= this.lowStockLevel && this.countInStock > 0;
});

// Virtual for reviews
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, subcategory: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ averageRating: -1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', ProductSchema);