const express = require('express');
// const app = express();
const multer = require('multer');
var cors = require('cors');
const productRoute = express.Router();
let product = require('../model/product');
const path = require('path')

const fs = require('fs')
    // const { dirname } = require('path/posix');
productRoute.use(cors())
    // Add product
productRoute.route('/add-product').post((req, res, next) => {
    product.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})

// Get all product
productRoute.route('/all').get((req, res) => {
    product.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get product
productRoute.route('/read-product/:id').get((req, res) => {
        product.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        })
    })
    // const path = require("path");
    // const cors = require("cors");



// This middleware is used to enable Cross Origin Resource Sharing This sets Headers to allow access to our client application
// productRoute.use(cors());
// Update product
productRoute.route('/update-product/:id').put((req, res, next) => {



    product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
            console.log('product Updated Successfully');
        }
    })
})

// Delete product
productRoute.route('/delete-product/:id').delete((req, res, next) => {
    product.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
        // cb(null, Date.now() + "--" + file.originalname);
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: fileStorageEngine });
// const upload = multer({ dest: 'uploads/' })
// Single File Route Handler
productRoute.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
});

// Multiple Files Route Handler
productRoute.post("/multiple", upload.array("images"), (req, res) => {
    console.log(req.files);
    res.send("Multiple Files Upload Success");
});

productRoute.delete('/delete-images/:nameimage', (req, res) => {
    const reqPath = path.join(__dirname, '../')
    try {
        // console.log(reqPath + `/uploads/${req.params.nameimage}`)
        fs.unlinkSync(reqPath + `/uploads/${req.params.nameimage}`);

        res.status(201).send({ message: "Image deleted" });

    } catch (e) {
        res.status(400).send({ message: "Error deleting image!", error: e.toString(), req: req.body });
    }
});
// productRoute.route('/delete-images/:nameimage').delete((req, res, next) => {
//     try {
//         const reqPath = path.join(__dirname, '../')
//         const name = req.params.nameimage
//         console.log(name)
//         fs.unlinkSync(reqPath + "/uploads/" + name);
//         res.status(201).send({ message: "Image deleted" });

//     } catch (e) {
//         res.status(400).send({ message: "Error deleting image!", error: e.toString(), req: req.body });
//     }
// })


productRoute.get('/:name', (req, res) => {
    try {
        const reqPath = path.join(__dirname, '../')
        const name = req.params.name

        res.sendFile(reqPath + "/uploads/" + name);

    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).json({ message: 'No such image file' })
        } else {
            res.status(500).json({ message: error.message })
        }

    }



})
module.exports = productRoute;