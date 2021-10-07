import { EventBus } from '../events/eventbus.js'
import { GAME_EVENTS } from '../events/game.events.js'
import { GameService } from './game.service.js'

const eventSource = new EventSource('/stream/game')

eventSource.onopen = () => {
  console.info('Connection SSE open')

  // Initial list
  GameService.list().then((response) => {
    EventBus.dispatchEvent(
      GAME_EVENTS.countNotFinished,
      response.countNotFinished
    )
    EventBus.dispatchEvent(GAME_EVENTS.newList, response.data)
  })
}

eventSource.onerror = (event) => {
  console.error(event)
}

const SSE_MESAGE_LIST = {
  gameAdded: 'gameAdded',
  gameDeleted: 'gameDeleted',
  gameGameFinishToggle: 'gameGameFinishToggle',
  gameCountChange: 'gameCountChange',
}

eventSource.addEventListener(SSE_MESAGE_LIST.gameAdded, (event) => {
  EventBus.dispatchEvent(GAME_EVENTS.addGame, JSON.parse(event.data))
})

eventSource.addEventListener(SSE_MESAGE_LIST.gameDeleted, (event) => {
  EventBus.dispatchEvent(GAME_EVENTS.removeGame, Number(event.data))
})

eventSource.addEventListener(SSE_MESAGE_LIST.gameGameFinishToggle, (event) => {
  EventBus.dispatchEvent(GAME_EVENTS.finishedGame, JSON.parse(event.data))
})

eventSource.addEventListener(SSE_MESAGE_LIST.gameCountChange, (event) => {
  const counts = JSON.parse(event.data)
  EventBus.dispatchEvent(GAME_EVENTS.countNotFinished, counts.notFinished)
})
