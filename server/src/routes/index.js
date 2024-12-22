"use strict"
/* ------------------------------------------------------ */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// auth:
router.use('/auth', require('./auth'))

// user:
router.use('/users', require('./user'))

// exchange:
router.use('/exchanges', require('./exchange'))




module.exports = router