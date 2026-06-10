const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'LuxeMart API is running!' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB!');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log('❌ MongoDB connection failed:', error.message);
  });