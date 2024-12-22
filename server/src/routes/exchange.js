"use strict"
/* ----------------------------------------------------- */
const router = require('express').Router()
/* -------------------------------------------------------*/
// routes/exchange:

const { isLogin } = require('../middlewares/permissions')
const exchange = require('../controllers/exchange')

// URL: /exchanges

// router.use(isLogin)

router.route('/')
    .get(exchange.list)
    .post(exchange.create)

router.route('/:id')
    .get(exchange.read)
    .put(exchange.update)
    .patch(exchange.update)
    .delete(exchange.delete)

    /* ------------------------------------------------------*/
    module.exports = router
