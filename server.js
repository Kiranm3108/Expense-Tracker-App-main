const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Allows frontend requests

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS

mongoose.set("strictQuery", false);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/expense-tracker", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully! ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error);
    process.exit(1);
  }
};

connectDB();

// Sample API Route (Check if server is working)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Create Transaction Route
app.post("/transactions/createTransaction", (req, res) => {
  const { amount, category, description } = req.body;
  if (!amount || !category || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  res.status(201).json({ message: "Transaction created successfully!" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
