const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: 'rzp_live_R6NyOWKBnKScPC',
  key_secret: 'kwRciWLR0ooywuV7KSvNZmo7'
});

// Create order endpoint
app.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: 100, // ₹1 in paise
      currency: 'INR',
      receipt: 'order_' + Date.now(),
      notes: {
        description: 'Café Business Course Payment'
      }
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      message: error.message
    });
  }
});

// Payment verification endpoint (optional - for webhook handling)
app.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Verify signature
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', 'kwRciWLR0ooywuV7KSvNZmo7')
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid signature'
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Payment verification failed',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Razorpay integration ready`);
  console.log(`💰 Amount: ₹1 (100 paise)`);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});
