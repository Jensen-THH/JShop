let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors');
mongoDb = require('./database/db')
const multer = require("multer");
const createError = require('http-errors');

// const path = require('path');
//   require('./model/users');
const rtsIndex = require('./routes/index.routes')
const productRoute = require('./routes/product.routes')
const orderRoute = require('./routes/order.routes')
const app = express();
const mongoDburl = "mongodb+srv://jshop:03042001qwer@cluster0.fezty.mongodb.net/quanao"
var expressSession = require('express-session');


// const passport = require('passport');
// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// require('./database/passport')(passport);
mongoose.Promise = global.Promise;
mongoose.connect(mongoDburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database successfully connected');
}, error => {
    console.log('Database error: ' + error)
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(expressSession({ secret: 'yoursecret', saveUninitialized: true, resave: false }));

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/')))
    // Base route
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// API Root
app.use(express.static('uploads'))
app.use('/api', productRoute);
app.use('/order', orderRoute);
app.use('/apiuser', rtsIndex);

// const cors = require("cors");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

//var upload = multer({ dest: "uploads/" });

var upload = multer({ storage: storage });

app.post("/file", upload.single("file"), function(req, res, next) {
    const file = req.file;
    if (file) {
        res.json(req.file);
    } else throw "error";
});

app.post("/multiplefiles", upload.array("files"), function(req, res, next) {
    const files = req.files;
    if (Array.isArray(files) && files.length > 0) {
        res.json(req.files);
    } else {
        res.status(400);
        throw new Error("No file");
    }
});





// PORT 
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
    next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})