const app = require('express')
const router = app.Router()

// Home Page
router.use('/', require('./home.routes.js'))

/** Games api */
router.use('/game', require('./game.routes.js'))

module.exports = router
