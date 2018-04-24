const express = require('express');
const app = express();
const formidable = require('express-formidable');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 5000);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit : 30,
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'be51cde8b60b52',
    password: 'f2e7d590',
    database: 'heroku_1921cd23e58fe90'
});

pool.on('error', function() {});

//Hakee kaikki hoidot
app.get('/api/hoidot', (req, res) => {
    pool.query('SELECT * from HOITO', function(err, rows, fields) {
        if (!err) {
            res.send(JSON.stringify(rows));
        } else {
            console.log('Error while performing Query(hoidot).');
        }
    });
});


app.post('/api/tyontekijat', function(req, res) {  {/* Hakee valitun hoidon perusteella mahdolliset työntekijät*/}                                     
    const hoito = req.body.hoito;
    console.log(hoito);
    pool.query('SELECT * from TYONTEKIJA WHERE hoidot LIKE ?',["%" + hoito + "%"], function(err, rows, fields) {
        if (!err) {
            res.send(JSON.stringify(rows));
            console.log(rows);  
            console.log(this.sql);
        } else {
            console.log('Error while performing Query(tyontekijat).');
        }
    });    
});
  
//ASIAKAS ja AJANVARAUS tauluihin tiedot
app.post('/api/varaus',formidable(), function(req, res) {      
    const nimi = req.fields.nimi;
    const sahkoposti = req.fields.sahkoposti;
    const puhelinnumero = req.fields.puhelinnumero;
    const hoitoID = req.fields.hoitoID;
    const tyontekijaID = req.fields.tyontekijaID;
    const aika = req.fields.aika;
    
    
    pool.query('INSERT INTO ASIAKAS (asiakkaan_nimi,puhelinnumero,sahkoposti) VALUES (?,?,?)', [nimi,puhelinnumero,sahkoposti], function(err, rows, fields) {
        if (!err) {
            console.log(this.sql);
        } else {
            console.log('Error while inserting asiakas');
        }
    })
    
        pool.query('INSERT INTO AJANVARAUS (hoitoID,Aika,hoidon_tekija,asiakas) VALUES (?,?,?,LAST_INSERT_ID())', [hoitoID,aika,tyontekijaID], function(err, rows, fields) {
        if (!err) {
            console.log(this.sql);
        } else {
            console.log('Error while inserting Varaus');
        }
    })
    
});


