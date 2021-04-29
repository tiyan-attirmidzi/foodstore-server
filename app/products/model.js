const mongoose = require('mongoose')
const { model, Schema } = mongoose

const productSchema = Schema({
    name: {
        type: String,
        minlength: [ 3, 'Panjang nama makanan minimal 4 karakter' ],
        required: [ true, 'Nama produk harus diisi' ]
    },
    description: {
        type: String,
        maxlength: [ 1000, 'Panjang nama makanan maksimal 1000 karakter' ]
    },
    price: {
        type: Number,
        default: 0
    },
    image_url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true })

Product = model('Product', productSchema)

module.exports = Product