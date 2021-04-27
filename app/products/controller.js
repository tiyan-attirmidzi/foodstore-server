const fs = require('fs')
const path = require('path')
const config = require('../config')
const Product = require('./model')

async function index (req, res, next) {
    try {
        let { limit = 10, skip = 0 } = req.query
        let products = await Product.find().limit(parseInt(limit)).skip(parseInt(skip))
        return res.status(200).json({
            status: 200,
            message: "Products Data",
            data: products
        })
    } catch (error) {
        next(error)
    }
}

async function store(req, res, next) {
    try {

        let payload = req.body

        if (req.file) {
            let tempPath = req.file.path
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            let fileName = req.file.filename + '.' + originalExt
            let targerPath = path.resolve(config.rootPath, `public/uploads/${fileName}`)

            const src = fs.createReadStream(tempPath)
            const dest = fs.createWriteStream(targerPath)
            src.pipe(dest)

            src.on('end', async () => {
                try {
                    let product = new Product({
                        ...payload,
                        image_url: fileName
                    })
                    await product.save()
                    return res.status(201).json(product)    
                } catch (error) {
                    // if failed, destroy file uploaded
                    fs.unlinkSync(targerPath)
                    // check if error due MongoDB validation
                    if (error && error.name === 'ValidationError') {``
                        return res.json({
                            error: 1,
                            message: error.message,
                            fields: error.errors
                        })
                    }
                    next(error)
                }
            })

            src.on('error', async() => {
                next(error);
            });
            
        } else {
            let product = new Product(payload)
            await product.save()
            return res.status(201).json(product)
        }
    } catch (error) {
        if (error && error.name === 'ValidationError') {``
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            })
        }
        next(error)
    }
}

async function update(req, res, next) {
    try {

        let payload = req.body

        if (req.file) {
            let tempPath = req.file.path
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            let fileName = req.file.filename + '.' + originalExt
            let targerPath = path.resolve(config.rootPath, `public/uploads/${fileName}`)

            const src = fs.createReadStream(tempPath)
            const dest = fs.createWriteStream(targerPath)
            src.pipe(dest)

            src.on('end', async () => {
                try {
                    let product = await Product.findOne({ _id: req.params.id })
                    let currentImage = `${config.rootPath}/public/uploads/${product.image_url}`
                    // Destroy Image When Updated
                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage)
                    }
                    product = await Product.findOneAndUpdate(
                        { _id: req.params.id },
                        { ...payload, image_url: fileName },
                        { new: true, runValidators: true }
                    )
                    return res.status(201).json(product)    
                } catch (error) {
                    // if failed, destroy file uploaded
                    fs.unlinkSync(targerPath)
                    // check if error due MongoDB validation
                    if (error && error.name === 'ValidationError') {``
                        return res.json({
                            error: 1,
                            message: error.message,
                            fields: error.errors
                        })
                    }
                    next(error)
                }
            })

            src.on('error', async() => {
                next(error);
            });
            
        } else {
            let product = await Product.findOneAndUpdate({
                _id: req.params.id
            }, payload, {
                new: true,
                runValidators: true
            })
            return res.status(201).json(product)
        }
    } catch (error) {
        if (error && error.name === 'ValidationError') {``
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            })
        }
        next(error)
    }
}

async function destroy(req, res, next) {
    try {
        let product = await Product.findOneAndDelete({ _id: req.params.id })
        let currentImage = `${config.rootPath}/public/uploads/${product.image_url}`
        // Destroy Image When Updated
        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage)
        }
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}