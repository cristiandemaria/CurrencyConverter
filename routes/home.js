const express = require('express')
const router = express.Router()
const request = require('request')
const convert = require('xml-js')


//ROTA CENTRAL
router.get('/home', (req, res) => {
    
    var xml = require('fs').readFileSync('public/files/moedas.xml', 'utf8');
    var result = convert.xml2json(xml, {compact: true, spaces: 4});
    var json = JSON.parse(result)
    //console.log(json)

    res.render('admin/pages/home', {moedas: json})
    
})

//ROTA CURRENCY
router.get('/currency:id1&:id2&:m1&:m2', (req, res) => {
    var xml = require('fs').readFileSync('public/files/moedas.xml', 'utf8');
    var result = convert.xml2json(xml, {compact: true, spaces: 4});
    var json = JSON.parse(result)
    var m1 = req.params.m1 
    var m2 = req.params.m2
    var k1 = req.params.id1
    var k2 = req.params.id2
    const moedas = k1+"-"+k2
    console.log(moedas)
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
            console.error
        }
        
        var json = JSON.parse(body)
        dado = json
        
        if (dado == undefined){
            dado = 0
        }

        
        console.log(dado.status)
    }

    request(options, chamandoCotacoes)

    setTimeout(()=>{
        console.log(dado)
        res.render('admin/pages/home', {
            dados: dado, 
            moedas: json,
            encodedJson : encodeURIComponent(JSON.stringify(dado)),
            m1: m1,
            m2: m2,
            k1: k1,
            k2: k2
        })
    }, 3000)
   
})

module.exports = router