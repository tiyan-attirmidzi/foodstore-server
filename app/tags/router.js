const multer  = require('multer')
const router = require('express').Router()
const tagController = require('./controller')

router.post('/tag', multer().none(), tagController.store)
router.put('/tag/:id', multer().none(), tagController.update)
router.delete('/tag/:id', tagController.destroy)

module.exports = router