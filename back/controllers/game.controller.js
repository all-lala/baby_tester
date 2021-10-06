const GameService = require('../services/game.service')
const xss = require('xss')

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
      res.json(await GameService.add(xss(req.body.name)))
    } else {
      res.status(400)
      res.end()
    }
  }

  /**
   * Delete game
   */
  static async delete(req, res) {
    if (await GameService.deleteById(Number(req?.params?.id))) {
      res.send('OK')
    } else {
      res.status(400)
      res.end()
    }
  }

  /**
   * Toggle finised state game
   */
  static async finish(req, res) {
    if (req?.params?.id) {
      res.json(await GameService.toggleFinishedById(req?.params?.id))
    } else {
      res.status(400)
      res.end()
    }
  }
}

module.exports = GameController
