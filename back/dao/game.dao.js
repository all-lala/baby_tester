const db = require('../services/db')

class GameDAO {
  static TABLE_NAME = 'game'
  static PAGINATION_BASE_BY_PAGE = 20

  /**
   * Count total games
   * @param {boolean} onlyNotfinished: count only not finished
   * @returns
   */
  static count(onlyNotfinished) {
    return db
      .query(
        `
        SELECT count(1)
        FROM ${this.TABLE_NAME}
        ${onlyNotfinished ? 'WHERE not finish' : ''}
      ;`
      )
      .then((result) => result.rows[0].count)
  }

  /**
   * Find all games
   * @returns
   */
  static find(pagination) {
    const preparedStatements = []
    const byPage =
      (pagination && pagination.byPage) || GameDAO.PAGINATION_BASE_BY_PAGE
    const lastId = pagination && pagination.lastId

    preparedStatements.push(byPage)
    if (lastId) {
      preparedStatements.push(lastId)
    }

    return db
      .query(
        `
        SELECT id, name, finish
        FROM ${this.TABLE_NAME}
        ${lastId ? 'WHERE id < $2' : ''}
        ORDER BY id DESC
        LIMIT $1
      ;`,
        preparedStatements
      )
      .then((result) => result.rows)
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
