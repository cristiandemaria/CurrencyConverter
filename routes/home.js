const express = require('express')
const router = express.Router()
const request = require('request')
const moedas = 'USD-BRL,EUR-BRL,BTC-BRL'
var dado = 1

//CONSTANTE COM OS PARAMETROS DA API
const options = {
    url: `https://economia.awesomeapi.com.br/json/last/${moedas}`,
    method: 'GET',
    header: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
}
//CHAMADA CALLBACK DA API
const chamandoCotacoes = (erro, res, body) => {
    
    if(erro){
        
    }
    
    var json = JSON.parse(body)
    dado = json
    console.log(dado)
}

//REQUEST COM 


//ROTA CENTRAL
router.get('/', (req, res) => {
    request(options, chamandoCotacoes)
    console.log(dado)

    res.render('home', {dados: dado})
    
})

module.exports = router