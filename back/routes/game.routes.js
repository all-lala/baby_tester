const express = require('express')
const router = express.Router()
const GameController = require('../controllers/game.controller')

/* GET games */
router.get('/', GameController.list)

/* Add game */
router.post('/', GameController.add)

/* Delete game by ID */
router.delete('/:id([0-9]+)', GameController.delete)

/* Finish game by ID */
router.put('/:id([0-9]+)/finish', GameController.finish)

module.exports = router
