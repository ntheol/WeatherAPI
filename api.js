const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`Its alive on http://localhost:${PORT}`)
)


var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "sqluser",
    password: "password",
    database: "weatherdb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

