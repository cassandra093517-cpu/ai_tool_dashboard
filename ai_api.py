from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import sqlite3

app=FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["GET"],
  allow_headers=["*"]
)

@app.get('/')

def get_ai_tools():
  connect = sqlite3.connect('ai_Dashboard.db')

  sql_query='SELECT * FROM ai_tools'

  df=pd.read_sql_query(sql_query,connect)

  connect.close()


  data_dict=df.head(5).to_dict(orient='records')
  return data_dict

@app.get('/pricing/{price_type}')

def get_tools_by_priceModel(price_type: str):
  connect = sqlite3.connect('ai_Dashboard.db')
  sql_query="SELECT * FROM ai_tools WHERE Pricing_Model=?"
  df=pd.read_sql_query(sql_query,connect, params=(price_type,))

  connect.close()
  return df.to_dict(orient='records')

@app.get('/top-traffic')
def get_tools_by_top_traffic():
  connect = sqlite3.connect('ai_Dashboard.db')

  sql_query='SELECT * FROM ai_tools ORDER BY Monthly_Traffic_Est DESC LIMIT 10'

  df=pd.read_sql_query(sql_query,connect)

  connect.close()


  data_dict=df.to_dict(orient='records')
  return data_dict


@app.get('/pricing_distribution')

def get_pricing_chart():
  connect = sqlite3.connect('ai_Dashboard.db')
  sql_query='SELECT Pricing_Model, COUNT(*) as Count FROM ai_tools GROUP BY Pricing_Model'
  df=pd.read_sql_query(sql_query,connect)

  connect.close()

  return df.to_dict(orient='records')


@app.get('/kpi-stats')
def get_kpi_stats():
  connect=sqlite3.connect('ai_Dashboard.db')
  sql_query='SELECT COUNT(*) as Total_Tools, MAX(Monthly_Traffic_Est) as Highest_Traffic, AVG(User_Rating) as Average_Rating From ai_tools'
  df=pd.read_sql_query(sql_query,connect)
  connect.close()

  return df.iloc[0].to_dict()