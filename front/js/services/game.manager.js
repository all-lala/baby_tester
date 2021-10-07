import { EventBus } from '../events/eventbus.js'
import { GAME_EVENTS } from '../events/game.events.js'
import { GameService } from './game.service.js'

export class GameManager {
  elements = []
  template
  gameList

  constructor() {
    this.getListParent()
    this.getTemplateGameElementLine()
    this.setAddGameEvents()
  }

  initList(list) {
    this.gameList.innerHTML = ''
    list.forEach((game) => this.addToList(game))
  }

  addToList(game) {
    if (this.findElementById(game.id)) {
      return
    }
    const template = document.importNode(this.template.content, true)
    const content = template.children[0]

    this.elementSetName(content, game.name)
    this.elementSetFinish(content, game.finish)
    this.elementSetCheckBoxAction(content, game.id)
    this.elementSetDeleteAction(content, game.id)

    this.gameList.prepend(content)
    this.elements.push({ id: game.id, content })
  }

  elementSetName(content, name) {
    content.querySelector('.div-players-names').innerHTML = name
  }

  elementSetFinish(content, finish) {
    content.querySelector('.checkbox-game-finished').checked = finish
    content.classList.toggle('game-list-element-finished', finish)
    this.elmentRemoveLoading(content)
  }

  elementSetCheckBoxAction(content, id) {
    content.querySelector('.checkbox-game-finished').onclick = () => {
      this.elmentSetLoading(content, 'Modification en cours ...')
      this.onCheckboxGameFinishedClicked(id)
    }
  }

  elementSetDeleteAction(content, id) {
    content.querySelector('.btn-delete-game').onclick = () => {
      this.elmentSetLoading(content, 'Suppression en cours ...', 'delete')
      this.onBtnGameDeleteClicked(id)
    }
  }

  elmentSetLoading(content, message, type = null) {
    const loadingBlock = content.querySelector('.game-list-loading-action')
    if (type === 'delete') {
      loadingBlock.classList.toggle('game-list-loading-action-delete')
    }
    loadingBlock.style.display = 'block'
    loadingBlock.getElementsByTagName('p').innerHTML =
      message || 'Action en cours ...'
  }

  elmentRemoveLoading(content) {
    const loadingBlock = content.querySelector('.game-list-loading-action')
    loadingBlock.style.display = 'none'
    loadingBlock.className = 'game-list-loading-action'
  }

  removeToListById(id) {
    const element = this.findElementById(id)
    if (element) {
      element.content.remove()
    }
  }

  setFinisedStatus(game) {
    const element = this.findElementById(game.id)
    if (element) {
      this.elementSetFinish(element.content, game.finish)
    }
  }

  onBtnAddGameClicked() {
    const name = document.getElementById('input-add-game').value
    document.getElementById('input-add-game').value = ''
    GameService.add(name).then((result) =>
      EventBus.dispatchEvent(GAME_EVENTS.addGame, result)
    )
  }

  onCheckboxGameFinishedClicked(id) {
    GameService.toggleFinishById(id).then((result) =>
      EventBus.dispatchEvent(GAME_EVENTS.finishedGame, result)
    )
  }

  onBtnGameDeleteClicked(id) {
    GameService.deleteById(id).then((result) =>
      EventBus.dispatchEvent(GAME_EVENTS.removeGame, id)
    )
  }

  getListParent() {
    this.gameList = document.getElementById('game-list')
  }

  getTemplateGameElementLine() {
    this.template = document.getElementById('template-game-element-line')
  }

  findElementById(id) {
    return this.elements.find((element) => element.id === id)
  }

  setAddGameEvents() {
    document.getElementById('btn-add-game').onclick = this.dispatchAddGame
    document.getElementById('form-add-game').onsubmit = this.dispatchAddGame
  }

  dispatchAddGame(event) {
    event.preventDefault()
    EventBus.dispatchEvent(GAME_EVENTS.addGameButtonClicked)
  }
}
