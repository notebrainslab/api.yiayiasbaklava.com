const express = require('express');
const WalletController = require('../controllers/WalletController');

const router = express.Router();
const auth = require('../middlewares/auth');

const walletController = new WalletController();

router.get(
    '/wallet-transactions',
    auth(),    
    walletController.fetchWalletTransactions,
);

module.exports = router;