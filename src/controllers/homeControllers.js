const HomeModel = require('../models/HomeModel')
//import { nome } from '../../public/assets/js/bundle'

HomeModel.create({
    nome: 'Carimba'
})
    .then(dados => console.log(dados))
    .catch(e => console.log(e))

exports.paginaInicial = (req,res) => {
    res.render("../views/index");
};

exports.trataPost = (req, res) => {
    res.send('Ei, sou sua nova rota de Post')
}