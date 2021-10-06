const express = require('express')
const router = express.Router()
const GameController = require('../controllers/game.controller')

/* GET games */
router.get('/', GameController.list)

/* Add game */
router.post('/', GameController.add)

/* Delete game by ID */
router.delete('/:id', GameController.delete)

/* Finish game by ID */
router.put('/:id', GameController.finish)

module.exports = router
