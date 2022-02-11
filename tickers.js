const axios = require("axios");

const getAllTickers = async () => {
  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.FINNHUB_API_KEY}`
  );
  const result = response.data.map((rec) => {
    return { label: rec.description, value: rec.symbol };
  });
  return result;
};

module.exports = (async function() {
  const tickers = await getAllTickers();
  return { tickers: tickers };
})();
