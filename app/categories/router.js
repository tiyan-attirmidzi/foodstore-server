const multer = require('multer')
const router = require('express').Router()
const categoryController = require('./controller')

router.post('/category', multer().none(), categoryController.store)

module.exports = router