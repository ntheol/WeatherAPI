var mysql = require('mysql');
const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`Its alive on http://localhost:${PORT}`)
)

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
sql_latest = "SELECT lat,lon,temp,precip,wind FROM forecast WHERE validdate ='2022-09-03 23:00:00' OR validdate ='2022-09-04 23:00:00' OR validdate ='2022-09-05 23:00:00' OR validdate ='2022-09-06 23:00:00' OR validdate ='2022-09-07 23:00:00' OR validdate ='2022-09-08 23:00:00' OR validdate ='2022-09-09 23:00:00'"
app.get('/latest_forecast', (req, res) => {
    con.query(sql_latest,function(err, result){ 
        if (err) {
            response.end();
            return;
        }
        res.send(result);
    });
});
