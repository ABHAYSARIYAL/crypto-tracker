const cron = require('node-cron');
const axios = require('axios');
const CurrentData = require('./models/CurrentData');
const HistoryData = require('./models/HistoryData');
require('dotenv').config();

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/markets';

module.exports = function startCronJob() {
  cron.schedule('0 * * * *', async () => {
    console.log('⏰ Cron Job: Fetching crypto data from CoinGecko');

    try {
      const { data } = await axios.get(COINGECKO_URL, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1
        },
        headers: {
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
        }
      });

      const formattedCoins = data.map(coin => ({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        marketCap: coin.market_cap,
        percentChange24h: coin.price_change_percentage_24h,
        timestamp: new Date(coin.last_updated)
      }));

      // ✅ Step 1: Save latest snapshot to CurrentData
      await CurrentData.deleteMany({});
      await CurrentData.insertMany(formattedCoins);
      console.log('✅ Cron: CurrentData updated');

      // ✅ Step 2 (Optional): Also save to HistoryData
      await HistoryData.insertMany(formattedCoins);
      console.log('✅ Cron: Snapshot saved to HistoryData');

    } catch (err) {
      console.error('❌ Cron error:', err.message);
    }
  });
};
