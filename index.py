import datetime as dt
import meteomatics.api as api
import pandas as pd 

username = 'nikolasae_theologitis'
password = 'L9Ihoy3E3N'


now = dt.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
startdate_ts = now
enddate_ts = startdate_ts + dt.timedelta(days=7)
interval_ts = dt.timedelta(hours=1)

coordinates_ts = [(36.831898, 25.861460)]
parameters_ts = ['t_2m:C', 'precip_1h:mm','wind_speed_10m:ms']

try:
    df = api.query_time_series(coordinates_ts, startdate_ts, enddate_ts, interval_ts,
                                  parameters_ts, username, password)
    print (df.head())
except Exception as e:
    print("Failed, the exception is {}".format(e))


df.to_csv(index=False)