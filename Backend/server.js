const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log("===================================");
  console.log("🚀 Lost & Found Backend Started");
  console.log(`🌐 Server Running: http://localhost:${PORT}`);
  console.log("===================================");
});