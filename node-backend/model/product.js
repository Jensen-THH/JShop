
var mongodb = require('mongoose')
// mongodb.connect('mongodb+srv://jshop:03042001qwer@cluster0.fezty.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

var productScheme = mongodb.Schema
    ({
        images: Array,
        name: String,
        sku: String,
        price: Object,
        description: String,
        category: String,
        // __v: Number
    })

var products = module.exports = mongodb.model('products', productScheme)