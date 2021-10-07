import { EventBus } from './events/eventbus.js'
import { GameService } from './services/game.service.js'
import { GAME_EVENTS } from './events/game.events.js'
import './services/sse.service.js'

// Initial list
GameService.list().then((list) => {
  EventBus.dispatchEvent(GAME_EVENTS.newList, list)
})
