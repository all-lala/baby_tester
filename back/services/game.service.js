const GameDAO = require('../dao/game.dao')
const Game = require('../models.game')

class GameService {
  /**
   * Find all games
   * @returns
   */
  static findAll() {
    return GameDAO.findAll().map((game) => {
      return Object.assign(new Game(), game)
    })
  }

  /**
   * Add new game
   * @param {string} name
   * @param {boolean} finished
   * @returns
   */
  static add(name, finished = false) {
    const game = new Game(name)
    return GameDAO.add(game, finished)
  }

  /**
   * Delete game by id
   * @param {number} id
   * @returns
   */
  static deleteById(id) {
    return !!GameDAO.deleteById(id)
  }

  /**
   * Set finished state
   * @param {number} id
   * @param {boolean} state
   * @returns
   */
  static setFinishedById(id, state = true) {
    return !!GameDAO.setFinishedById(id, state)
  }
}

module.exports = GameService
