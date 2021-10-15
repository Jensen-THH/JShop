const express = require('express');
// const app = express();
const multer = require('multer');
var cors = require('cors');
const orderRoute = express.Router();
let order = require('../model/order');
const path = require('path')

const fs = require('fs')
    // const { dirname } = require('path/posix');
orderRoute.use(cors())
    // Add order
orderRoute.route('/add-order').post((req, res, next) => {
        console.log(req.body)
        order.create(req.body, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
            }
        })
    })
    // Delete order
orderRoute.route('/delete-order/:id').delete((req, res, next) => {
        order.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                    msg: data
                });
            }
        })
    })
    // Get all order
orderRoute.route('/all').get((req, res) => {
    order.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update order
orderRoute.route('/update-order/:id').put((req, res, next) => {
        order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.json(data);
                console.log('order Updated Successfully');
            }
        })
    })
    // Get order
orderRoute.route('/read-order/:id').get((req, res) => {
    order.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})
module.exports = orderRoute;