const axios = require('axios');
const CurrentData = require('../models/CurrentData');
const HistoryData = require('../models/HistoryData');

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

exports.getTopCoins = async (req, res) => {
  try {
    const { data } = await axios.get(COINGECKO_URL);
    const transformed = data.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      percentChange24h: coin.price_change_percentage_24h,
      lastUpdated: coin.last_updated
    }));

    // Overwrite current data
    await CurrentData.deleteMany({});
    await CurrentData.insertMany(transformed);

    res.json(transformed);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching coins', error: err });
  }
};

exports.saveSnapshot = async (req, res) => {
  try {
    const currentData = await CurrentData.find();
    const historyRecords = currentData.map(coin => ({
      coinId: coin.coinId,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.price,
      marketCap: coin.marketCap,
      percentChange24h: coin.percentChange24h
    }));

    await HistoryData.insertMany(historyRecords);
    res.status(200).json({ message: 'Snapshot saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving snapshot', error: err });
  }
};

exports.getCoinHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await HistoryData.find({ coinId });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history', error: err });
  }
};
