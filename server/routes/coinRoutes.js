const express = require('express');
const router = express.Router();
const {
  getTopCoins,
  saveSnapshot,
  getCoinHistory
} = require('../controllers/coinController');

router.get('/coins', getTopCoins);
router.post('/history', saveSnapshot);
router.get('/history/:coinId', getCoinHistory); // Optional

module.exports = router;
