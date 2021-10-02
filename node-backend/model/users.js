var db = require('mongoose')
var bcrypt = require('bcrypt')

// db.connect('mongodb://localhost:27017/quanao', { useNewUrlParser: true, useUnifiedTopology: true })

var userSchema = db.Schema({
    username: { type: String, unique: true, required: 'Full name can\'t be empty' },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
})
userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(error, encrypted) {
        user.password = encrypted;
        next()
    })
})
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

db.model('User', userSchema)