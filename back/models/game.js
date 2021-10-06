var xss = require('xss')

class Game {
  #id
  #name
  #finish

  constructor(name) {
    this.id = 0
    this.name = name || ''
    this.finish = false
  }

  get id() {
    return this.#id
  }

  set id(val) {
    this.#id = val
  }

  get name() {
    return this.#name
  }

  set name(val) {
    this.#name = xss(val)
  }

  get finish() {
    return this.#finish
  }

  set finish(val) {
    this.#finish = val
  }
}

module.exports = Game
