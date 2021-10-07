import { EventBus } from '../events/eventbus.js'
import { GAME_EVENTS } from '../events/game.events.js'
import { GameService } from './game.service.js'

class GameManager {
  static #instance
  elements = []
  gameList
  notFinished

  constructor() {
    this.getListParent()
    this.setAddGameEvents()
    this.getCountNotFinishedElement()
  }

  static getInstance() {
    if (!GameManager.#instance) {
      GameManager.#instance = new GameManager()
    }
    return GameManager.#instance
  }

  /**
   * Initialize list of games
   * @param {Game[]} list
   */
  initList(list) {
    this.gameList.innerHTML = ''
    list.forEach((game) => this.addToList(game))
  }

  /**
   * Add element to list
   * @param {Game} game
   * @returns
   */
  addToList(game) {
    if (this.findElementById(game.id)) {
      return
    }
    const newElem = document.createElement('game-list-element-component')
    newElem.setAttribute('name', game.name)
    if (game.finish) {
      newElem.setAttribute('finish', 'finish')
    }
    newElem.setAttribute('game-id', game.id)

    this.gameList.prepend(newElem)
    this.elements.push({ id: game.id, content: newElem })
  }

  /**
   * Remove element to list by id
   * @param {number} id
   */
  removeToListById(id) {
    const element = this.findElementById(id)
    if (element) {
      element.content.remove()
    }
  }

  /**
   * Set status to element by id
   * @param {*} game
   */
  setFinisedStatus(game) {
    const element = this.findElementById(game.id)
    if (element) {
      if (game.finish) {
        element.content.setAttribute('finish', 'finish')
      } else {
        element.content.removeAttribute('finish')
      }
    }
  }

  /**
   * Action on add game
   */
  onBtnAddGameClicked() {
    const name = document.getElementById('input-add-game').value
    document.getElementById('input-add-game').value = ''
    GameService.add(name).then((result) =>
      EventBus.dispatchEvent(GAME_EVENTS.addGame, result)
    )
  }

  /**
   * Get parent list element in DOM
   */
  getListParent() {
    this.gameList = document.getElementById('game-list')
  }

  /**
   * Find element in list by id
   * @param {number} id
   * @returns
   */
  findElementById(id) {
    return this.elements.find((element) => element.id === id)
  }

  /**
   * Event setting to form and button
   */
  setAddGameEvents() {
    document.getElementById('btn-add-game').onclick = this.dispatchAddGame
    document.getElementById('form-add-game').onsubmit = this.dispatchAddGame
  }

  /**
   * Dispactch new game event
   * @param {*} event
   */
  dispatchAddGame(event) {
    event.preventDefault()
    EventBus.dispatchEvent(GAME_EVENTS.addGameButtonClicked)
  }

  /**
   * Get count not finished element in DOM
   */
  getCountNotFinishedElement() {
    this.notFinished = document.getElementById('game-not-finished-count')
  }

  /**
   * On count not finished change
   */
  onCountNotFinishedChange(count) {
    this.notFinished.setAttribute('count', count)
  }
}

const gameManager = GameManager.getInstance()
export { gameManager }
