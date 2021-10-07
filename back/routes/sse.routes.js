const express = require('express')
const router = express.Router()
const SSE = require('../services/sse.service')

/* GET SSE */
router.get('/game', function (req, res) {
  SSE.newClient(req, res)
})

module.exports = router
