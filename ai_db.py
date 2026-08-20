import pandas as pd
import sqlite3

df=pd.read_csv('cleaned_ai_data.csv')

connection=sqlite3.connect('ai_Dashboard.db')
df.to_sql('ai_tools', connection, if_exists='replace', index=False)

connection.close()

