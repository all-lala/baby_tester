const GameService = require('../services/game.service')
const xss = require('xss')
const SSE = require('../services/sse.service')
const SSE_MESSAGE_LIST = require('../utils/sse.messagelist')

class GameController {
  /**
   * List games
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  static async list(req, res) {
    res.header('Resource-count', await GameService.count(true))
    res.json(await GameService.find(req.query))
  }

  /**
   * Add new game
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  static async add(req, res) {
    const name = req.body && req.body.name
    if (name) {
      const newGame = await GameService.add(xss(name))
      const countNotFinished = await GameService.count(true)
      res.json(newGame)
      SSE.broadcastMessage(newGame, Date.now(), SSE_MESSAGE_LIST.gameAdded)
      SSE.broadcastMessage(
        { notFinished: countNotFinished },
        Date.now(),
        SSE_MESSAGE_LIST.gameCountChange
      )
    } else {
      res.status(400)
      res.end()
    }
  }

  /**
   * Delete game
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  static async delete(req, res) {
    const id = req.params && req.params.id
    await GameService.deleteById(Number(id))
    const countNotFinished = await GameService.count(true)
    SSE.broadcastMessage(id, Date.now(), SSE_MESSAGE_LIST.gameDeleted)
    SSE.broadcastMessage(
      { notFinished: countNotFinished },
      Date.now(),
      SSE_MESSAGE_LIST.gameCountChange
    )
    res.send('OK')
  }

  /**
   * Toggle finised state game
   * @param {Express.Request} req
   * @param {Express.Request} res
   */
  static async finish(req, res) {
    const id = req.params && req.params.id
    if (id) {
      const game = await GameService.toggleFinishedById(id)
      const countNotFinished = await GameService.count(true)
      res.json(game)
      SSE.broadcastMessage(
        game,
        Date.now(),
        SSE_MESSAGE_LIST.gameGameFinishToggle
      )
      SSE.broadcastMessage(
        { notFinished: countNotFinished },
        Date.now(),
        SSE_MESSAGE_LIST.gameCountChange
      )
    } else {
      res.status(400)
      res.end()
    }
  }
}

module.exports = GameController
