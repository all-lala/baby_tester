require('dotenv-flow').config()
const path = require('path')
const express = require('express')
const app = express()
const http = require('http')
const port = process.env.HTTP_PORT || 3000

// SET SERVER OPTIONS
app.set('port', port)
app.use(express.json())
app.use(express.static(path.join(__dirname, '/front')))

// LOAD ROUTES
app.use('/', require('./back/routes'))

// CREATE SERVER
const server = http.createServer(app)

// LOAD MIGRATIONS
const Migration = require('./back/migrations')
Migration.generate()

// OPEN SERVER
server.listen(port)
server.on('error', console.error)
server.on('listening', () => {
  const address = server.address()
  const listening =
    typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port
  console.info(`Listening on : ${listening}`)
})
