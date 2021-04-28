const mongoose = require('mongoose')
const { model, Schema } = mongoose

const tagSchema = Schema({
    name: {
        type: String,
        minlength: [ 3, 'Panjang nama tag minimial 3 karakter' ],
        maxlength: [ 20, 'Panjang nama tag maksimal 20 karakter'],
        require: [ true, 'Nama kategori harus diisi']
    }
})

Tag = model('Tag', tagSchema)

module.exports = Tag