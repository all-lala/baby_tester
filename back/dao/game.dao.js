const pool = require('../services/db').pool

class GameDAO {
  static TABLE_NAME = 'game'

  /**
   * Find all games
   * @returns 
   */
  static async findAll() {
    return await pool.query(`SELECT id, name, finish FROM ${this.TABLE_NAME}`)
  }

  /**
   * Delete game by id
   * @param {number} id 
   * @returns 
   */
  static async deleteById(id) {
    return await pool.query(`DELETE FROM ${this.TABLE_NAME} WHERE id = $1`, [id])
  }

  /**
   * Add new game
   * @param {Game} game 
   * @returns 
   */
  static async add(game) {
    return await pool.query(`
      INSERT INTO ${this.TABLE_NAME}
      (name, finish)
      VALUES
      ($1,$2)
      `, [game.name, game.finish])
  }

  /**
   * Set finished state
   * @param {number} id 
   * @param {boolean} state 
   * @returns 
   */
  static async setFinishedById(id, state = true) {
    return pool.query(`
      UPDATE ${this.TABLE_NAME}
      finish = $1
    `, [state])
  }
}

module.exports = GameDAO