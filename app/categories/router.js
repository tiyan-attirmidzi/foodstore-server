const multer = require('multer')
const router = require('express').Router()
const categoryController = require('./controller')

router.post('/category', multer().none(), categoryController.store)
router.put('/category/:id', multer().none(), categoryController.update)

module.exports = router