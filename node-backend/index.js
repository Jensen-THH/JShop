let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors');
mongoDb = require('./database/db')
    //   require('./model/users');
const rtsIndex = require('./routes/index.routes')
const productRoute = require('./routes/product.routes')
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
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// API Root
app.use('/api', productRoute);
app.use('/apiuser', rtsIndex);

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