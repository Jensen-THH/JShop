var mongodb = require('mongoose')
    // mongodb.connect('mongodb+srv://jshop:03042001qwer@cluster0.fezty.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

var orderScheme = mongodb.Schema({
    name: String,
    email: String,
    district: String,
    city: String,
    zip: String,
    address: String,
    country: String,
    endtotal: String,
    listorder: Object,
    confirm: Boolean,
    iduser: String,
    phone: String,
    date: String,
    card: String,
    timeship: String
        // __v: Number
})

var order = module.exports = mongodb.model('orders', orderScheme)