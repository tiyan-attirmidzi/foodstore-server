const multer = require('multer')
const router = require('express').Router()
const os = require('os')
const productController = require('./controller')

router.get('/products', productController.index)
router.post('/product', multer({dest: os.tmpdir()}).single('image'), productController.store)
router.put('/product/:id', multer({dest: os.tmpdir()}).single('image'), productController.update)

module.exports = router
