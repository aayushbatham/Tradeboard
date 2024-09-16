const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  address: { type: String, required: true },
  blockchain: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;
