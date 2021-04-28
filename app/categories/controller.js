const Category = require('./model')

async function store(req, res, next) {
    try {
        let payload = req.body
        let category = new Category(payload)
        await category.save()
        return res.json(category)
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            })
        }
        next(error)
    }
}

module.exports = {
    store
}