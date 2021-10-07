const app = require('express')
const router = app.Router()

// Home Page
router.use('/', require('./home.routes.js'))

/** Games api */
router.use('/game', require('./game.routes.js'))

/** SSE */
router.use('/stream', require('./sse.routes.js'))

module.exports = router
