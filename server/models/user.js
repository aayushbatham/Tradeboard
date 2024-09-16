const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  discordId: { type: String, required: true, unique: true },
  email: { type: String },
  avatar: { type: String },
  wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }] // Referencing Wallet model
});

const User = mongoose.model('User', userSchema);
module.exports = User;
