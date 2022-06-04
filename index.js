const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')

const port = 3000;
var path = require('path');
const app = express();

var login = "admin";
var password = "123456";


// utilise acesso
app.use(session({secret:'asdfghjkl123456789'}));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'/views'));

// rota post
app.post('/', (req, res)=>{
    if(req.body.login == login && req.body.password == password){
        //logado com suscesso!
        console.log("logado com sucesso");
        req.session.login = login;
        res.render('logado',{login: login});
    } else {
        res.render('index');
    }
})


//rota get
app.get('/', (req, res)=>{
    if(req.session.login){
        res.render('logado',{login: login});
    } else {
        res.render('index');
    }
})


app.listen(port, ()=>{
    console.log('servidor rodando');
})