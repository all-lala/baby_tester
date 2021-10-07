export class EventBus {
  static #bus

  static init() {
    if (!EventBus.#bus) {
      EventBus.#bus = document.createElement('eventbus')
    }
  }

  static addEventListener(event, callback) {
    EventBus.init()
    EventBus.#bus.addEventListener(event, callback)
  }

  static removeEventListener(event, callback) {
    EventBus.init()
    EventBus.#bus.removeEventListener(event, callback)
  }

  static dispatchEvent(event, detail = {}) {
    EventBus.init()
    EventBus.#bus.dispatchEvent(new CustomEvent(event, { detail }))
  }
}
