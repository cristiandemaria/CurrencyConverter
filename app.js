const express = require('express');
const handlebars = require('express-handlebars');
const { urlencoded, json } = require('body-parser');
const bodyParser = require('body-parser');
const app = express();
const home = require('./routes/home');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const hbs = handlebars.create({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//CARREGANDO ARQUIVOS ESTÁTICOS
app.use('/public/css', express.static('public/css'));
app.use('/public/js', express.static('public/js'));
app.use('/public/img', express.static('public/img'));



app.use('/', home);



const PORT = process.env.PORT || 5050;
app.listen(PORT, ()=>{
    console.log("Servidor aberto!!!!!")
});