const cron = require('node-cron');
const axios = require('axios');

module.exports = function startCronJob() {
  cron.schedule('0 * * * *', async () => {
    console.log('⏰ Cron Job: Saving snapshot to history...');

    try {
      const response = await axios.post('http://localhost:5000/api/history');
      console.log('✅ Snapshot saved:', response.data.message);
    } catch (err) {
      console.error('❌ Cron job error:', err.message);
    }
  });
};
