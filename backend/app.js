const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/banco.db';

const hostname = '127.0.0.1';
const port = 2002;
const app = express();

/* Move all static content to the frontend */
app.use(express.static("../frontend/"));

/* Definition of endpoints */
/******** CRUD ************/
app.use(express.json());

// Inserts a record of Phone, Email, Password, Category, Name, PlantationType, ConfirmPassword into the USER table (it's the C in CRUD - Create). On line 23, it opens the database, and on line 33, it closes the database.
app.post('/insereMensagem', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const { mensagem } = req.body;
    sql = "INSERT INTO mensagem (mensagem) VALUES (?)";
    console.log(sql);
    db.run(sql, [mensagem], err => {
        if (err) {
            throw err;
        }
    });
    db.close(); 
    res.end();
});

app.listen(port, hostname, () => {
	console.log(`Servidor rodando em http://${hostname}:${port}/`);
  });