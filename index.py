import datetime as dt
import meteomatics.api as api
import pandas as pd 
from functools import reduce

username = 'nikolasae_theologitis'
password = 'L9Ihoy3E3N'


now = dt.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
startdate = now
enddate = startdate + dt.timedelta(days=7)
interval = dt.timedelta(hours=1)

coordinates1 = [(36.831898, 25.861460)]
coordinates2 = [(37.916107, 23.726803)]
coordinates3 = [(55.709287, 12.580577)]

parameters = ['t_2m:C', 'precip_1h:mm','wind_speed_10m:ms']

try:
    df1 = api.query_time_series(coordinates1, startdate, enddate, interval,
                                  parameters, username, password)
except Exception as e:
    print("Failed, the exception is {}".format(e))

try:
    df2 = api.query_time_series(coordinates2, startdate, enddate, interval,
                                  parameters, username, password)
except Exception as e:
    print("Failed, the exception is {}".format(e))

try:
    df3 = api.query_time_series(coordinates3, startdate, enddate, interval,
                                  parameters, username, password)
except Exception as e:
    print("Failed, the exception is {}".format(e))

df1.reset_index(inplace=True, level=['validdate','lat','lon'])
df2.reset_index(inplace=True, level=['validdate','lat','lon'])
df3.reset_index(inplace=True, level=['validdate','lat','lon'])
dfs = [df1, df2, df3]

final_df = reduce(lambda  left,right: pd.merge(left,right,
                on=['validdate','t_2m:C', 'precip_1h:mm','wind_speed_10m:ms','lat','lon'],how='outer'), dfs)
final_df = final_df.rename(columns = {'t_2m:C':'temp', 'precip_1h:mm':'precip', 'wind_speed_10m:ms':'wind'})
print(final_df.dtypes)