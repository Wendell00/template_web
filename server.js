require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.connectionMongoDB)

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const helmet = require('helmet')
const csrf = require('csurf')
const routes = require('./routes')
const path = require('path')
const { middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middlewares')
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')))

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+5511946744120'
   })
  .then(message => console.log(message.sid));

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
app.use(csrf());
app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(routes);

app.listen(3000, () => {
    console.log("Servidor Iniciado")
    console.log("Porta 3000: http://localhost:3000/")
})