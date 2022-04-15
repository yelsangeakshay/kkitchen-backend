const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
var cors = require('cors');

const app  = express()
require('dotenv').config()



//IMPORT ROUTES

const authRoutes = require('./routes/auth')
const menuRoutes  = require('./routes/menu')
const userRoutes  = require('./routes/user')
const orderRoutes  = require('./routes/orders')
//DB CONNECTION
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser:true}).then(()=>console.log('DB CONNECTED'))

mongoose.connection.on('error',err=>{
    console.log(`DB CONNECTION ERROR: ${err.message}`);
})

//middleware
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser())
app.use(expressValidator());


//ROUTES MIDDLEWARE
app.use('/api',authRoutes)
app.use('/api',menuRoutes)
app.use('/api',userRoutes)
app.use('/api',orderRoutes)

const port = process.env.PORT || 8000


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

