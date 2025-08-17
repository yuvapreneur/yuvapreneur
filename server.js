const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

// Restrictive CORS: change to your GitHub Pages URL
app.use(cors({
  origin: ["https://your-username.github.io", "http://localhost:5500", "http://localhost:5173", "http://localhost:3000"]
}));

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("Missing Razorpay env vars");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Public endpoint to share ONLY keyId with client
app.get("/config", (req, res) => {
  res.json({ keyId: process.env.RAZORPAY_KEY_ID || "" });
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 29900, // ₹299 in paise
      currency: "INR",
      receipt: "receipt#1",
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Order creation failed:", err?.message || err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
