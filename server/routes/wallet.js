const express = require('express');
const User = require('../models/user');
const Wallet = require('../models/wallet');
const router = express.Router();

// Add a new wallet to the user's account
router.post('/wallet', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { address, blockchain } = req.body;

  try {
    // Check if wallet already exists
    const existingWallet = await Wallet.findOne({ address, blockchain });
    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet already linked' });
    }

    // Create a new wallet
    const wallet = new Wallet({
      address,
      blockchain,
      user: req.user.id,
    });

    await wallet.save();

    // Add the wallet to the user's wallet list
    const user = await User.findById(req.user.id);
    user.wallets.push(wallet._id);
    await user.save();

    res.status(201).json({ message: 'Wallet added successfully', wallet });
  } catch (error) {
    res.status(500).json({ message: 'Error adding wallet', error });
  }
});

module.exports = router;
