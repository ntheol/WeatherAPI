from index import final_df
import pymysql
import mysql.connector
from pandas.io import sql
import sqlalchemy

connection = mysql.connector.connect(host='localhost',
                             user='sqluser',
                             password='password',
                             db='weatherdb')
cursor = connection.cursor()

cursor.execute('CREATE TABLE Forecast (lat FLOAT(25) NOT NULL, lon FLOAT(25) NOT NULL, validdate DATETIME NOT NULL, temp FLOAT(25) NOT NULL, precip FLOAT(25) NOT NULL, wind FLOAT(25) NOT NULL)')

sql_insert = "INSERT INTO Forecast (lat,lon,validdate,temp,precip,wind) values (%s,%s,%s,%s,%s,%s)"
for index, row in final_df.iterrows():
       cursor.execute(sql_insert, tuple(row))
connection.commit()