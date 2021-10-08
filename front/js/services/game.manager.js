import { EventBus } from '../events/eventbus.js'
import { GAME_EVENTS } from '../events/game.events.js'
import { GameService } from './game.service.js'

class GameManager {
  static #instance
  elements = []
  gameList
  notFinished
  nextElement

  constructor() {
    this.getListParent()
    this.setAddGameEvents()
    this.getCountNotFinishedElement()
    this.getBtnNextElements()
    this.setNextElementsEvent()
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
    this.elements = []
    this.addList(list)
  }

  /**
   * Add list of element
   * @param {*} list
   */
  addList(list) {
    list.reverse().forEach((game) => this.addOne(game))
  }

  /**
   * Add element to list
   * @param {Game} game
   * @returns
   */
  addOne(game) {
    if (this.findElementById(game.id)) {
      return
    }

    const newElem = document.createElement('game-list-element-component')
    newElem.setAttribute('name', game.name)
    newElem.setAttribute('finish', game.finish ? 'finish' : '')
    newElem.setAttribute('game-id', game.id)

    const elementsBefore = this.elements.filter((elem) => elem.id > game.id)
    if (elementsBefore.length) {
      elementsBefore[elementsBefore.length - 1].content.after(newElem)
    } else {
      this.gameList.prepend(newElem)
    }

    this.elements.push({ id: game.id, content: newElem })
    this.elements.sort((a, b) => b.id - a.id)
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
    document.getElementById('btn-add-game').onclick = (event) =>
      this.dispatchAddGame(event)
    document.getElementById('form-add-game').onsubmit = (event) =>
      this.dispatchAddGame(event)
  }

  /**
   * Dispactch new game event
   * @param {*} event
   */
  dispatchAddGame(event) {
    event.preventDefault()
    this.addGame()
  }

  /**
   * Action on add game
   */
  addGame() {
    const element = document.getElementById('input-add-game')
    const name = element.value
    element.value = ''
    if (name) {
      GameService.add(name).then((result) =>
        EventBus.dispatchEvent(GAME_EVENTS.addGame, result)
      )
    }
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

  /**
   * Get btn next elements in DOM
   */
  getBtnNextElements() {
    this.nextElement = document.getElementById('btn-game-next-elements')
    console.log(this.nextElement)
  }

  /**
   * Set action on next element clicked
   */
  setNextElementsEvent() {
    this.nextElement.onclick = () => {
      const lastId = Math.min(...this.elements.map((elem) => elem.id))
      GameService.list({ lastId }).then((response) => {
        EventBus.dispatchEvent(
          GAME_EVENTS.countNotFinished,
          response.countNotFinished
        )
        EventBus.dispatchEvent(GAME_EVENTS.addGames, response.data)
      })
    }
  }
}

const gameManager = GameManager.getInstance()
export { gameManager }
