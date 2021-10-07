const GameService = require('../services/game.service')
const xss = require('xss')
const SSE = require('../services/sse.service')
const SSE_MESSAGE_LIST = require('../utils/sse.messagelist')

class GameController {
  /**
   * List games
   */
  static async list(req, res) {
    res.json(await GameService.find(req?.body?.pagination))
  }

  /**
   * Add new game
   */
  static async add(req, res) {
    if (req?.body?.name) {
      const newGame = await GameService.add(xss(req.body.name))
      res.json(newGame)
      SSE.broadcastMessage(newGame, Date.now(), SSE_MESSAGE_LIST.gameAdded)
    } else {
      res.status(400)
      res.end()
    }
  }

  /**
   * Delete game
   */
  static async delete(req, res) {
    await GameService.deleteById(Number(req?.params?.id))
    SSE.broadcastMessage(
      req?.params?.id,
      Date.now(),
      SSE_MESSAGE_LIST.gameDeleted
    )
    res.send('OK')
  }

  /**
   * Toggle finised state game
   */
  static async finish(req, res) {
    if (req?.params?.id) {
      const game = await GameService.toggleFinishedById(req?.params?.id)
      res.json(game)
      SSE.broadcastMessage(
        game,
        Date.now(),
        SSE_MESSAGE_LIST.gameGameFinishToggle
      )
    } else {
      res.status(400)
      res.end()
    }
  }
}

module.exports = GameController
