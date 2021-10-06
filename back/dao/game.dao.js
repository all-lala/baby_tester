const db = require('../services/db')

class GameDAO {
  static TABLE_NAME = 'game'

  /**
   * Find all games
   * @returns
   */
  static find(pagination) {
    const limit = pagination.byPage || 1
    const offset = (pagination.page - 1) * pagination.byPage || 0
    return db
      .query(
        `
        SELECT id, name, finish
        FROM ${this.TABLE_NAME}
        ORDER BY id DESC
        LIMIT $1
        OFFSET $2
      ;`,
        [limit, offset]
      )
      .then((result) => {
        console.log(result.rowCount)
        return result.rows
      })
  }

  /**
   * Delete game by id
   * @param {number} id
   * @returns
   */
  static deleteById(id) {
    return db
      .query(`DELETE FROM ${this.TABLE_NAME} WHERE id in ($1);`, [id])
      .then((result) => result.rows[0])
  }

  /**
   * Add new game
   * @param {Game} game
   * @returns
   */
  static add(game) {
    return db
      .query(
        `
      INSERT INTO ${this.TABLE_NAME}
      (name, finish)
      VALUES
      ($1,$2)
      RETURNING *;
      `,
        [game.name, game.finish]
      )
      .then((result) => result.rows[0])
  }

  /**
   * Set finished state
   * @param {number} id
   * @param {boolean} state
   * @returns
   */
  static toggleFinishedById(id) {
    return db
      .query(
        ` UPDATE ${this.TABLE_NAME}
          SET
          finish = NOT finish
          WHERE id = $1
          RETURNING *;
        `,
        [id]
      )
      .then((result) => result.rows[0])
  }
}

module.exports = GameDAO
