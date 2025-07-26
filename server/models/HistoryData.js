const mongoose = require('mongoose');

const historyDataSchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  percentChange24h: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HistoryData', historyDataSchema);
