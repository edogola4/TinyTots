// Load environment variables
require('dotenv').config();

// Import the Express app
const app = require('./src/app');

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
