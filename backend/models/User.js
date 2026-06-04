const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true  // no two users with same email
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'  // can be 'user' or 'admin'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);