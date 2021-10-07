export class GameService {
  static GAME_URL = './game'

  /**
   * List games to show
   */
  static async list() {
    return await axios
      .get(`/${this.GAME_URL}`)
      .then((response) => response.data)
  }

  /**
   * Add game to list
   * @param {string} name
   */
  static async add(name) {
    return await axios
      .post(`/${this.GAME_URL}`, { name })
      .then((response) => response.data)
  }

  /**
   * Delete game by id
   * @param {number} id
   */
  static async deleteById(id) {
    return await axios
      .delete(`/${this.GAME_URL}/${id}`)
      .then((response) => response.data)
  }

  /**
   * Toggle finished bi id
   * @param {number} id
   */
  static async toggleFinishById(id) {
    return await axios
      .put(`/${this.GAME_URL}/${id}/finish`)
      .then((response) => response.data)
  }
}
