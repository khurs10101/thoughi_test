const express = require('express')
const route = express.Router()

const { getAllRecords, processResult } = require('../controllers/records')

route.get('/records', getAllRecords)
route.get('/process/:page?', processResult)

module.exports = route