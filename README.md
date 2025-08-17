# 🚀 Razorpay Payment Gateway Integration

A complete Node.js + Express backend with HTML frontend for integrating Razorpay payment gateway.

## ✨ Features

- **Backend**: Node.js + Express server with Razorpay SDK
- **Frontend**: Clean HTML interface with Razorpay checkout
- **Security**: Key secret stays on backend only
- **Amount**: ₹1 (100 paise) test payment
- **Error Handling**: Comprehensive error handling and user feedback
- **Payment Verification**: Backend signature verification

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Razorpay account with live/test keys

## 📦 Installation

1. **Clone or download the files**
2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🔑 Configuration

The Razorpay keys are already configured in the code:

- **Key ID**: `rzp_live_R6NyOWKBnKScPC`
- **Key Secret**: `kwRciWLR0ooywuV7KSvNZmo7`

⚠️ **Important**: The secret key is only used on the backend for security.

## 🚀 Running the Application

### 1. Start the Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### 2. Open the Frontend

Open `payment-test.html` in your browser or serve it from the backend.

## 📱 How It Works

1. **User clicks "Pay ₹1" button**
2. **Frontend calls** `/create-order` API
3. **Backend creates** Razorpay order using SDK
4. **Frontend receives** order_id and opens Razorpay checkout
5. **User completes** payment on Razorpay
6. **Success callback** shows payment confirmation
7. **Optional verification** on backend for security

## 🔌 API Endpoints

### POST `/create-order`
Creates a new Razorpay order
- **Amount**: 100 paise (₹1)
- **Currency**: INR
- **Returns**: `{ success: true, order_id: "...", amount: 100, currency: "INR" }`

### POST `/verify-payment`
Verifies payment signature (optional)
- **Body**: `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`
- **Returns**: `{ success: true, message: "Payment verified successfully" }`

### GET `/health`
Server health check
- **Returns**: `{ status: "OK", message: "Server is running" }`

## 🎯 Frontend Features

- **Clean UI**: Modern, responsive design
- **Loading States**: Visual feedback during payment process
- **Error Handling**: User-friendly error messages
- **Status Updates**: Real-time payment status
- **Mobile Responsive**: Works on all devices

## 🔒 Security Features

- **Secret Key Protection**: Never exposed to frontend
- **Signature Verification**: Backend verifies payment authenticity
- **CORS Protection**: Configured for secure cross-origin requests
- **Error Handling**: Comprehensive error management

## 🧪 Testing

1. **Start the server** (`npm run dev`)
2. **Open** `payment-test.html` in browser
3. **Click** "Pay ₹1" button
4. **Complete** test payment on Razorpay
5. **Verify** success message and payment ID

## 🚨 Production Considerations

- **Environment Variables**: Move keys to `.env` file
- **HTTPS**: Use HTTPS in production
- **Webhooks**: Implement Razorpay webhooks for production
- **Database**: Store order and payment data
- **Logging**: Add proper logging and monitoring
- **Rate Limiting**: Implement API rate limiting

## 📁 File Structure

```
├── server.js              # Express backend server
├── payment-test.html      # Frontend payment interface
├── package.json           # Node.js dependencies
├── README.md             # This file
└── .env                  # Environment variables (create this)
```

## 🔧 Customization

### Change Amount
Update the amount in `server.js`:
```javascript
amount: 100, // Change 100 to desired amount in paise
```

### Change Currency
Update currency in `server.js`:
```javascript
currency: 'INR', // Change to USD, EUR, etc.
```

### Add More Fields
Modify the order options in `server.js`:
```javascript
const options = {
  amount: 100,
  currency: 'INR',
  receipt: 'order_' + Date.now(),
  notes: {
    description: 'Your custom description'
  },
  // Add more Razorpay options here
};
```

## 🆘 Troubleshooting

### Common Issues

1. **"Cannot connect to server"**
   - Make sure `server.js` is running
   - Check if port 3000 is available

2. **"Failed to create order"**
   - Verify Razorpay keys are correct
   - Check Razorpay account status

3. **Payment not completing**
   - Check browser console for errors
   - Verify Razorpay checkout is loading

### Debug Mode

Enable detailed logging in `server.js`:
```javascript
console.log('Order creation options:', options);
console.log('Razorpay response:', order);
```

## 📞 Support

For issues or questions:
- Check Razorpay documentation
- Review server console logs
- Verify API endpoint responses

## 📄 License

MIT License - feel free to use and modify as needed.

---

**Built with ❤️ for yuvapreneur.in**
