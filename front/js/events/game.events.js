import { EventBus } from './eventbus.js'
import { GameManager } from '../services/game.manager.js'

const gameManager = new GameManager()

const GAME_EVENTS = {
  addGameButtonClicked: 'addGameButtonClicked',
  newList: 'newList',
  addGame: 'addGame',
  removeGame: 'removeGame',
  finishedGame: 'finishedGame',
}

/**
 * When new list is dispatched
 */
EventBus.addEventListener(GAME_EVENTS.newList, (event) =>
  gameManager.initList(event.detail)
)

/**
 * When game added to list
 */
EventBus.addEventListener(GAME_EVENTS.addGame, (event) =>
  gameManager.addToList(event.detail)
)

/**
 * When game removed from list
 */
EventBus.addEventListener(GAME_EVENTS.removeGame, (event) =>
  gameManager.removeToListById(event.detail)
)

/**
 * When game finish state change
 */
EventBus.addEventListener(GAME_EVENTS.finishedGame, (event) =>
  gameManager.setFinisedStatus(event.detail)
)

EventBus.addEventListener(GAME_EVENTS.addGameButtonClicked, (event) =>
  gameManager.onBtnAddGameClicked()
)

export { GAME_EVENTS }
