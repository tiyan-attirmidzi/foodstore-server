const multer  = require('multer')
const router = require('express').Router()
const tagController = require('./controller')

router.post('/tag', multer().none(), tagController.store)

module.exports = router