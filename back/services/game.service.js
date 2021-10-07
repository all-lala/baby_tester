const GameDAO = require('../dao/game.dao')
const Game = require('../models/game')

class GameService {
  /**
   * Count total games
   * @param {boolean} onlyNotfinished: count only not finished
   * @returns
   */
  static async count(onlyNotfinished) {
    return await GameDAO.count(onlyNotfinished)
  }

  /**
   * Find games
   * @returns
   */
  static async find(pagination) {
    const games = await GameDAO.find(pagination)
    return games.map((game) => {
      return Object.assign(new Game(), game)
    })
  }

  /**
   * Add new game
   * @param {string} name
   * @param {boolean} finished
   * @returns
   */
  static async add(name, finished = false) {
    const game = new Game(name)
    const gameSaved = await GameDAO.add(game, finished)
    return Object.assign(new Game(), gameSaved)
  }

  /**
   * Delete game by id
   * @param {number} id
   * @returns
   */
  static async deleteById(id) {
    return GameDAO.deleteById(id)
  }

  /**
   * Set finished state
   * @param {number} id
   * @param {boolean} state
   * @returns
   */
  static async toggleFinishedById(id) {
    return GameDAO.toggleFinishedById(id)
  }
}

module.exports = GameService
