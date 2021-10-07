class SSE {
  static #instance

  #clients = []

  static getInstance() {
    if (!SSE.#instance) {
      SSE.#instance = new SSE()
    }
    return SSE.#instance
  }

  /**
   * Add nex client
   * @param {Express.Request} request
   * @param {Express.Response} response
   */
  newClient(request, response) {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    }
    response.writeHead(200, headers)

    const client = {
      clientId: Date.now(),
      context: response,
    }

    request.on('close', () => this.clientClose(client))
    this.#clients.push(client)
    this.sendMessage(client, { clientId: client.clientId })
  }

  /**
   * On client closed
   * @param {*} clientClosed
   */
  clientClose(clientClosed) {
    console.log(`${clientClosed.clientId} Connection closed`)
    this.#clients = this.#clients.filter(
      (client) => client.clientId !== clientClosed.clientId
    )
  }

  /**
   * Send messages to all clients
   * @param {*} message
   */
  broadcastMessage(message, id, type, retry) {
    this.#clients.forEach((client) =>
      this.sendMessage(client, message, id, type, retry)
    )
  }

  /**
   * Send message to one client
   * @param {{clientId: number, context: Express.Response}} client
   * @param {string|object} message
   * @param {number} id
   * @param {string} type
   * @param {number} retry
   */
  sendMessage(client, message, id = 0, type, retry) {
    if (id) {
      client.context.write(`id: ${id}\n`)
    }
    if (type) {
      client.context.write(`event: ${type}\n`)
    }
    if (retry) {
      client.context.write(`retry: ${retry}\n`)
    }

    client.context.write(
      `data: ${
        typeof message === 'object' ? JSON.stringify(message) : message
      }\n\n`
    )
  }
}

module.exports = SSE.getInstance()
