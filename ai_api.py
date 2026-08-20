from fastapi import FastAPI
import pandas as pd

app=FastAPI()

@app.get('/')

def welcome():
  df=pd.read_csv('cleaned_ai_data.csv')
  data_dict=df.head(5).to_dict(orient='records')
  return data_dict