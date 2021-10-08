import { gameManager } from '../services/game.manager.js'
import { EventBus } from './eventbus.js'

const GAME_EVENTS = {
  newList: 'newList',
  countNotFinished: 'countNotFinished',
  addGame: 'addGame',
  addGames: 'addGames',
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
 * When count of not finished is dispatched
 */
EventBus.addEventListener(GAME_EVENTS.countNotFinished, (event) =>
  gameManager.onCountNotFinishedChange(event.detail)
)

/**
 * When game added to list
 */
EventBus.addEventListener(GAME_EVENTS.addGame, (event) =>
  gameManager.addOne(event.detail)
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

/**
 * When next list elements added
 */
EventBus.addEventListener(GAME_EVENTS.addGames, (event) =>
  gameManager.addList(event.detail)
)

export { GAME_EVENTS }
