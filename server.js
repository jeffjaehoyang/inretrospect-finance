require('dotenv').config()

const express = require('express')
const axios = require('axios')
const redis = require('redis')
const cors = require('cors')
const yahooFinance = require('yahoo-finance2').default
const Fuse = require('fuse.js')
const sslRedirect = require('heroku-ssl-redirect').default
const app = express()

app.use(cors())
app.use(sslRedirect())

let allTickerSymbols = []
const redisPort = 6379
let client
if (process.env.REDIS_URL) {
  client = redis.createClient({ url: process.env.REDIS_URL })
} else {
  client = redis.createClient({ port: redisPort })
}

app.get('/stockData', async (req, res) => {
  const tickerSymbol = req.query.symbol
  try {
    client.get(tickerSymbol, async (err, stockData) => {
      if (err) {
      }
      if (stockData) {
        res.status(200).send({
          data: JSON.parse(stockData),
        })
      } else {
        try {
          const queryOptions = { period1: '1970-01-01' }
          const stockData = await yahooFinance.historical(
            tickerSymbol,
            queryOptions
          )
          const storableStockData = JSON.stringify(stockData)
          client.setex(tickerSymbol, 24 * 60 * 60, storableStockData)
          // client.set(tickerSymbol, storableStockData)
          res.status(200).send({
            data: stockData,
          })
        } catch (error) {
          res.status(500).send({ message: 'there was an error in API call' })
          if (error instanceof yahooFinance.errors.FailedYahooValidationError) {
            // See the validation docs for examples of how to handle this
            // error.result will be a partially validated / coerced result.
          } else if (error instanceof yahooFinance.errors.HTTPError) {
            // Probably you just want to log and skip these
            console.warn(
              `Skipping yf.quote("${tickerSymbol}"): [${error.name}] ${error.message}`
            )
            return
          } else {
            // Same here
            console.warn(
              `Skipping yf.quote("${tickerSymbol}"): [${error.name}] ${error.message}`
            )
            return
          }
        }
        // const stockData = await axios.get(
        //   `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${tickerSymbol}&outputsize=full&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
        // )
      }
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// import syntax (recommended)
app.get('/companyDomain', async (req, res) => {
  const tickerSymbol = req.query.symbol
  const result = await yahooFinance.quoteSummary(tickerSymbol, {
    modules: ['assetProfile'],
  })
  const companyWebsiteUrl = result.assetProfile.website
  let domain = new URL(companyWebsiteUrl)
  domain = domain.hostname.replace('www.', '')
  if (tickerSymbol === 'META') {
    domain = 'meta.com'
  }
  res.status(200).send(domain)
})

app.get('/tickerSymbol', async (req, res) => {
  const tickerSymbol = req.query.symbol
  const result = fuzzySearch(allTickerSymbols, tickerSymbol)
  if (tickerSymbol.length > 0) {
    res.status(200).send(result.slice(0, 10).map((d) => d.item))
  } else {
    res.status(200).send(result.slice(0, 10))
  }
})

function fuzzySearch(options, value) {
  const fuse = new Fuse(options, {
    keys: ['value', 'label'],
    threshold: 0.5,
  })

  if (!value.length) {
    return options.slice(0, 10)
  }
  return fuse.search(value)
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (process.env.NODE_ENV === 'production') {
  const root = require('path').join(__dirname, 'client', 'build')
  app.use(express.static(root))
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root })
  })
}

//log error to the console if any occurs
client.on('error', (err) => {
  console.log(err)
})

app.listen(process.env.PORT || 5000, async () => {
  const { tickers } = await require('./tickers')
  allTickerSymbols = tickers
  console.log('Node server started')
})
