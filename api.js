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

sql_avg = "SELECT lat,lon,AVG(temp) FROM forecast WHERE validdate ='2022-09-07 23:00:00' OR validdate ='2022-09-08 23:00:00' OR validdate ='2022-09-09 23:00:00' GROUP BY lat"

app.get('/avg_temp', (req, res) => {
    con.query(sql_avg,function(err, result){ 
        if (err) {
            response.end();
            return;
        }
        res.send(result);
    });
});


sql_maxt1 = "SELECT lat,lon,MAX(temp) FROM Forecast GROUP BY lat ORDER BY MAX(temp) DESC LIMIT 1";
sql_maxt2 = "SELECT lat,lon,MAX(temp) FROM Forecast GROUP BY lat ORDER BY MAX(temp) DESC LIMIT 2";
sql_maxt3 = "SELECT lat,lon,MAX(temp) FROM Forecast GROUP BY lat ORDER BY MAX(temp) DESC LIMIT 3";



sql_maxp = "SELECT lat,lon,MAX(precip) FROM Forecast GROUP BY lat ORDER BY MAX(precip) DESC";
sql_maxw = "SELECT lat,lon,MAX(wind) FROM Forecast GROUP BY lat ORDER BY MAX(wind) DESC";

app.get('/top_loc/:n', (req, res) => {
    var n = req.params.n;
    if (n==1){
        con.query(sql_maxt1,function(err, result){ 
            if (err) {
                response.end();
                return;
            }
            res.send(result);
        });
    }
    else if (n==2){
        con.query(sql_maxt2,function(err, result){ 
            if (err) {
                response.end();
                return;
            }
            res.send(result);
        });        
    }
    else if (n==3){
        con.query(sql_maxt3,function(err, result){ 
            if (err) {
                response.end();
                return;
            }
            res.send(result);
        });        
    }
    else {console.log("Request Failed")}
});

app.get('/max_prec', (req, res) => {
    con.query(sql_maxp + "LIMIT 2",function(err, result){ 
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