from fastapi import FastAPI
import pandas as pd
import sqlite3

app=FastAPI()

@app.get('/')

def get_ai_tools():
  connect = sqlite3.connect('ai_Dashboard.db')

  sql_query='SELECT * FROM ai_tools'

  df=pd.read_sql_query(sql_query,connect)

  connect.close()


  data_dict=df.head(5).to_dict(orient='records')
  return data_dict

