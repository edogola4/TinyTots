const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

// Load environment variables
dotenv.config();

// Sample products data
const sampleProducts = [
  {
    name: 'Baby Bodysuit Set',
    description: 'Adorable 3-pack cotton bodysuits for babies',
    price: 24.99,
    comparePrice: 29.99,
    category: 'Clothing',
    subcategory: 'Bodysuits',
    brand: 'TinyComfort',
    size: '0-3M',
    color: 'Blue',
    gender: 'Unisex',
    inStock: true,
    featured: true,
    averageRating: 4.5,
    numReviews: 24,
    isActive: true
  },
  {
    name: 'Wooden Building Blocks',
    description: 'Eco-friendly wooden building blocks for creative play',
    price: 34.99,
    comparePrice: 39.99,
    category: 'Toys',
    subcategory: 'Educational',
    brand: 'EduPlay',
    ageGroup: '1-3 years',
    inStock: true,
    featured: true,
    averageRating: 4.8,
    numReviews: 15,
    isActive: true
  },
  {
    name: 'Baby Shampoo & Body Wash',
    description: 'Gentle tear-free formula for baby\'s delicate skin',
    price: 12.99,
    category: 'Bath & Body',
    brand: 'PureBaby',
    size: '16oz',
    inStock: true,
    averageRating: 4.2,
    numReviews: 8,
    isActive: true
  }
];

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('🌱 Seeding database...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🧹 Cleared existing products');
    
    // Add sample products
    const createdProducts = await Product.create(sampleProducts);
    console.log(`✅ Added ${createdProducts.length} sample products`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
    
    // Start the server after seeding
    console.log('\n🚀 Starting server...');
    require('./server');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
