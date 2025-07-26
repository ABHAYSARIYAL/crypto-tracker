const mongoose = require('mongoose');

const currentDataSchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  percentChange24h: Number,
  lastUpdated: Date
});

module.exports = mongoose.model('CurrentData', currentDataSchema);
