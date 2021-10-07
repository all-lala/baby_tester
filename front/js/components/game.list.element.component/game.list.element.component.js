import { EventBus } from '../../events/eventbus.js'
import { GAME_EVENTS } from '../../events/game.events.js'
import { GameService } from '../../services/game.service.js'

customElements.define(
  'game-list-element-component',
  class extends HTMLElement {
    constructor() {
      super()
      const template = document.getElementById('template-game-element-line')
      const templateContent = template.content
      const linkElem = document.createElement('link')
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute(
        'href',
        './js/components/game.list.element.component/game.list.element.component.css'
      )

      this.attachShadow({ mode: 'open' })

      this.shadowRoot.appendChild(templateContent.cloneNode(true))
      this.shadowRoot.appendChild(linkElem)
    }

    static get observedAttributes() {
      return ['name', 'finish', 'game-id']
    }

    /**
     * Obeserve attribute change
     * @param {string} name
     * @param {any} oldValue
     * @param {any} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'name':
          this.setName()
          break
        case 'finish':
          this.setFinish()
          break
        case 'game-id':
          this.setCheckBoxAction()
          this.setDeleteAction()
          break
      }
    }

    /**
     * Set the name
     */
    setName() {
      this.shadowRoot.querySelector('.div-players-names').innerHTML =
        this.getAttribute('name')
    }

    /**
     * Set finish render
     */
    setFinish() {
      this.shadowRoot.children[0].querySelector(
        '.checkbox-game-finished'
      ).checked = this.getAttribute('finish')
      this.shadowRoot.children[0].classList.toggle(
        'game-list-element-finished',
        this.getAttribute('finish')
      )
      this.removeLoading()
    }

    /**
     * Set action to chexkbox
     */
    setCheckBoxAction() {
      this.shadowRoot.children[0].querySelector(
        '.checkbox-game-finished'
      ).onclick = () => {
        this.setLoading('Modification en cours ...')
        this.onCheckboxGameFinishedClicked(this.getAttribute('game-id'))
      }
    }

    /**
     * Set action to delete
     */
    setDeleteAction() {
      this.shadowRoot.children[0].querySelector('.btn-delete-game').onclick =
        () => {
          this.setLoading('Suppression en cours ...', 'delete')
          this.onBtnGameDeleteClicked(this.getAttribute('game-id'))
        }
    }

    /**
     * Add loading
     * @param {string} message
     * @param {string} type : 'delete' ou undefined
     */
    setLoading(message, type = null) {
      const loadingBlock = this.shadowRoot.children[0].querySelector(
        '.game-list-loading-action'
      )
      if (type === 'delete') {
        loadingBlock.classList.toggle('game-list-loading-action-delete')
      }
      loadingBlock.style.display = 'block'
      loadingBlock.getElementsByTagName('p').innerHTML =
        message || 'Action en cours ...'
    }

    /**
     * Remove loading
     */
    removeLoading() {
      const loadingBlock = this.shadowRoot.children[0].querySelector(
        '.game-list-loading-action'
      )
      loadingBlock.style.display = 'none'
      loadingBlock.className = 'game-list-loading-action'
    }

    /**
     * Action on finished clicked
     */
    onCheckboxGameFinishedClicked() {
      GameService.toggleFinishById(this.getAttribute('game-id')).then(
        (result) => EventBus.dispatchEvent(GAME_EVENTS.finishedGame, result)
      )
    }

    /**
     * Action on delete clicked
     */
    onBtnGameDeleteClicked() {
      GameService.deleteById(this.getAttribute('game-id')).then((result) =>
        EventBus.dispatchEvent(
          GAME_EVENTS.removeGame,
          this.getAttribute('game-id')
        )
      )
    }
  }
)
