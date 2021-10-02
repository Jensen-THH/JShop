const express = require('express');
const router = express.Router();
const ctrlUser = require('./../controllers/user.controllers');
const passport = require('passport');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
router.post('/register', ctrlUser.register)
const config = require('./../database/db');


// user login
var bcrypt = require('bcrypt');
router.get('*', function(req, res, next) {
    res.locals.userId = req.session.userId;
    next()
})
router.post('/login', function(req, res, next) {
    var { email, passwordUser } = req.body;
    console.log("chuan bi tim ... ")
    User.findOne({ email: email }, (error, useradmin) => {
        console.log("dang tim...")
        if (useradmin) {
            bcrypt.compare(passwordUser, useradmin.password, (error, same) => {
                if (same) {
                    req.session.userId = useradmin._id
                    const token = jwt.sign({ data: useradmin }, config.secret, {
                        expiresIn: 604800 // 1 week
                    });

                    res.json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: {
                            id: useradmin._id,
                            username: useradmin.username,
                            email: useradmin.email
                        }
                    });
                    console.log("token: ", token)
                } else {
                    return res.json({ success: false, msg: 'User not found' });
                }
            })
        } else
        // res.redirect('/login')
            console.log("login false 2")
    })
})

//session kiểm tra xem có đăng nhập chưa đăng nhập r mới cho vào admin
router.get('/admin', function(req, res, next) {

    if (req.session.userId) {
        console.log('admin page', req.session.userId)
        res.json({
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
            }
        });

    } else {
        console.log('doesnt login')
    }
});
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({
        user: {
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
        }
    });
});
router.get('/logout', function(req, res, next) {
    req.session.userId = undefined
        // res.redirect('/')
    console.log('logout')
});
module.exports = router