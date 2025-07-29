const axios = require('axios');
const CurrentData = require('../models/CurrentData');
const HistoryData = require('../models/HistoryData');

// ✅ Fetch from MongoDB, not CoinGecko
exports.getTopCoins = async (req, res) => {
  try {
    const coins = await CurrentData.find().sort({ marketCap: -1 });
    res.json(coins);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching coins', error: err });
  }
};

// ✅ Used by Cron job to save snapshot from CurrentData → HistoryData
exports.saveSnapshot = async (req, res) => {
  try {
    const currentData = await CurrentData.find();
    const historyRecords = currentData.map(coin => ({
      coinId: coin.coinId,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.price,
      marketCap: coin.marketCap,
      percentChange24h: coin.percentChange24h,
      timestamp: new Date() // Add timestamp for each snapshot
    }));

    await HistoryData.insertMany(historyRecords);
    res.status(200).json({ message: 'Snapshot saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving snapshot', error: err });
  }
};

// ✅ View past history for a specific coin
exports.getCoinHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await HistoryData.find({ coinId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history', error: err });
  }
};
