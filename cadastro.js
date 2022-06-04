const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var mysql = require('mysql');

const port = 3000;
var path = require('path');
const app = express();



// utilise acesso
app.use(session({secret:'asdfghjkl123456789'}));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'/views'));

// rota post
app.post('/', (req, res)=>{   
    console.log("Post");
    var login = req.body.login;
    var password = req.body.password;
    var departamento = req.body.departamento;
    if(departamento != 0){
        //logado com suscesso!
        console.log("login = " + login);
        console.log("password = " + password);
        console.log("departamento = " + departamento);
        cadastrar(login, password, departamento);
        res.render('cadastro');
    } else {        
        console.log('departamento não escolhido')
        res.render('cadastro');
    }
})

function cadastrar(login, password, departamento){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "S@fira159",
        database: "mylogintest"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // query a database
        /* sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
        var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
        */
        var sql = "INSERT INTO users (login, pw, departamento) VALUES ?";
        var values = [
          [login.toString(), password.toString(), departamento.toString()]
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("database created")
            //console.log("Result: " + result)
            console.log("Number of records inserted: " + result.affectedRows);
        });
    });

}

//rota get
app.get('/', (req, res)=>{/*
    if(req.session.login){
        res.render('logado',{login: login});
    } else {
        res.render('index');
    }*/
    console.log("Start");
    res.render('cadastro');
})


app.listen(port, ()=>{
    console.log('servidor rodando');
})