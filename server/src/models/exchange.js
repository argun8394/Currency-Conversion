"use strict"
/* ----------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "base_currency": "USD",
    "target_currency": "EUR",
    "previous_rate": 1.10,
    "current_rate": 1.12,
    "change_date": "2024-12-22T10:30:00Z"
}
/* ------------------------------------------------------- */
// ExchangeRateChange Model:

const ExchangeSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fromCurrency: {
      type: String,
      required: true
    },
    toCurrency: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    convertedAmount: {
      type: Number,
      required: true
    },
    exchangeRate: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }, { collection: 'exchanges', timestamps: true })
  
  module.exports = mongoose.model('Exchange', ExchangeSchema)

/* ------------------------------------------------------- */
ExchangeSchema.pre('init', function (data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Exchange', ExchangeSchema)
