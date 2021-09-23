  
let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors')
// mongoDb = require('./database/db')


mongoose.Promise = global.Promise;

// mongoose.connect(mongoDb.db, {
const mongoDburl = "mongodb+srv://jshop:03042001qwer@cluster0.fezty.mongodb.net/quanao"
mongoose.connect(mongoDburl, {
useNewUrlParser: true,
// useFindAndModify: false,
useUnifiedTopology: true
}).then(() => {
console.log('Database successfully connected');
}, error => {
console.log('Database error: ' + error)
})
// const username = "jshop";
// const password = "03042001qwer";
// const cluster = "cluster0";
// const dbname = "test/quanao";
// mongodb+srv://jshop:03042001qwer@cluster0.fezty.mongodb.net/test/quanao
// mongoose.connect(
//   `mongodb+srv://${username}:${password}@${cluster}.fezty.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }
// );
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });
const productRoute = require('./routes/product.routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/')))
// Base route
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// API Root
app.use('/api', productRoute);

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