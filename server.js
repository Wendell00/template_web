require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.connectionMongoDB)

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const routes = require('./routes')
const path = require('path')
const { middlewareGlobal, outroMiddleware } = require('./src/middlewares/middlewares')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOption = session({
    secret: 'kdjsasijdasiojdi  ioasjdia,m,masdasoi a6()',
    store: MongoStore.create({ mongoUrl: process.env.connectionMongoDB }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true 
    }
})

app.use(sessionOption)
app.use(flash())

app.set('views', path.resolve(__dirname,'src', 'views' ));
app.set('view engine', 'ejs')
app.use(middlewareGlobal)
app.use(outroMiddleware)
app.use(routes);

app.listen(3000, () => {
    console.log("Servidor Iniciado")
    console.log("Porta 3000: http://localhost:3000/")
})