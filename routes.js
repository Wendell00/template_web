express = require('express')
route = express.Router()
const homeControllers = require('./src/controllers/homeControllers')
const contatoControllers = require('./src/controllers/contatoControllers')

route.get('/', homeControllers.paginaInicial)
route.post('/', homeControllers.trataPost)


route.get('/contato', contatoControllers.paginaInicial)

module.exports = route