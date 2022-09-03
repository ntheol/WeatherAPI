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

sql_avg1 = "SELECT lat,lon,AVG(temp) FROM forecast WHERE validdate ='2022-09-07 23:00:00' OR validdate ='2022-09-08 23:00:00' OR validdate ='2022-09-09 23:00:00' AND lat = '36.831898' AND lon = '25.86146'";
sql_avg2 = "SELECT lat,lon,AVG(temp) FROM forecast WHERE validdate ='2022-09-07 23:00:00' OR validdate ='2022-09-08 23:00:00' OR validdate ='2022-09-09 23:00:00' AND lat = '37.9161078' AND lon = '23.726803'";
sql_avg3 = "SELECT lat,lon,AVG(temp) FROM forecast WHERE validdate ='2022-09-07 23:00:00' OR validdate ='2022-09-08 23:00:00' OR validdate ='2022-09-09 23:00:00' AND lat = '55.709287' AND lon = '12.580577'";

app.get('/avg_temp1', (req, res) => {
    con.query(sql_avg1,function(err, result){ 
        if (err) {
            response.end();
            return;
        }
        res.send(result);
    });
});

app.get('/avg_temp2', (req, res) => {
    con.query(sql_avg2,function(err, result2){ 
        if (err) {
            response.end();
            return;
        }
        res.send(result2);
    });
});

app.get('/avg_temp3', (req, res) => {
    con.query(sql_avg3,function(err, result3){ 
        if (err) {
            response.end();
            return;
        }
        res.send(result3);
    });
});


sql_maxt = "SELECT lat,lon From forecast WHERE temp = (SELECT MAX(temp) FROM Forecast)";
sql_maxp = "SELECT lat,lon From forecast WHERE precip = (SELECT MAX(precip) FROM Forecast)";
sql_maxw = "SELECT lat,lon From forecast WHERE wind = (SELECT MAX(wind) FROM Forecast)";

app.get('/max_temp', (req, res) => {
    con.query(sql_maxt,function(err, result){ 
        if (err) {
            response.end();
            return;
        }
        res.send(result);
    });
});

app.get('/max_prec', (req, res) => {
    con.query(sql_maxp,function(err, result){ 
        if (err) {
            response.end();
            return;
        }
        res.send(result);
    });
});

app.get('/max_wind', (req, res) => {
    con.query(sql_maxw,function(err, result){ 
        if (err) {
            response.end();
            return;
        }
        res.send(result);
    });
});