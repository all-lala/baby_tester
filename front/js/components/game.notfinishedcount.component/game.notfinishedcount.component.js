customElements.define(
  'game-not-finished-count-component',
  class extends HTMLElement {
    constructor() {
      super()
      const template = document.createElement('div')
      template.id = 'countNotFinished'
      const text = document.createElement('h2')
      text.innerHTML = '0'
      template.appendChild(text)

      const linkElem = document.createElement('link')
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute(
        'href',
        './js/components/game.notfinishedcount.component/game.notfinishedcount.component.css'
      )

      this.attachShadow({ mode: 'open' })

      this.shadowRoot.appendChild(template.cloneNode(true))
      this.shadowRoot.appendChild(linkElem)
    }

    static get observedAttributes() {
      return ['count']
    }

    /**
     * Obeserve attribute change
     * @param {string} name
     * @param {any} oldValue
     * @param {any} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'count':
          this.setCount()
          break
      }
    }

    /**
     * Set the name
     */
    setCount() {
      this.shadowRoot.querySelector('h2').innerHTML = this.getAttribute('count')
    }
  }
)
