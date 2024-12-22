"use strict"

// Models
const Exchange = require('../models/Exchange')
const axios = require('axios')

const API_KEY = process.env.API_KEY // .env'den alınacak
const BASE_URL = `https://v6.exchangerate-api.com/v6/${ API_KEY}/latest/`

module.exports = {

  list: async (req, res) => {
    const filters = (req.user?.is_superadmin) ? {} : { user_id: req.user._id }
    const data = await Exchange.find(filters)

    res.status(200).send({
      error: false,
      data,
    })
  },

  create: async (req, res) => {
    try {
      // Data from the user
      const { fromCurrency, toCurrency, amount } = req.body

      if (!fromCurrency || !toCurrency || !amount) {
        return res.status(400).send({ error: true, message: 'There are missing areas!' })
      }

      // Retrieve exchange rate data from API
      const response = await axios.get(`${BASE_URL}${fromCurrency}`)
      
      const data = response.data

      if (!data || !data.conversion_rates[toCurrency]) {
        return res.status(400).send({ error: true, message: 'Invalid currency' })
      }

      // Currency conversion rate
      const conversionRate = data.conversion_rates[toCurrency]

      // Dönüşüm işlemi
      const convertedAmount = amount * conversionRate

      // Saving currency conversion information
      const exchangeData = {
        user_id: req.user?._id,
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount,
        exchangeRate: conversionRate,
        timestamp: new Date()
      }

      const savedExchange = await Exchange.create(exchangeData)

      res.status(201).send({
        error: false,
        message: 'Currency conversion saved successfully.',
        data: savedExchange
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        error: true,
        message: 'An error occurred during currency conversion.',
        details: error.message
      })
    }
  },

  read: async (req, res) => {
    const data = await Exchange.findOne({ _id: req.params.id })

    res.status(200).send({
      error: false,
      data
    })
  },

  update: async (req, res) => {
    const data = await Exchange.updateOne({ _id: req.params.id }, req.body)

    res.status(202).send({
      error: false,
      data,
      new: await Exchange.findOne({ _id: req.params.id })
    })
  },

  delete: async (req, res) => {
    const data = await Exchange.deleteOne({ _id: req.params.id })

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data
    })
  },
}
