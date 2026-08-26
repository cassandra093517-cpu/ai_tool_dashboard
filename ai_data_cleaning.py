import pandas as pd

df=pd.read_csv("top100_ai_tools_2026.csv")
# print(df.head)
# df.info()

df.drop("Description",axis=1, inplace=True)
df.drop_duplicates(inplace=True)
df["Starting_Price_CAD"] =df["Starting_Price_USD"]*1.37
df["Starting_Price_CAD"]=df["Starting_Price_CAD"].round(2)

df.to_csv("cleaned_ai_data.csv", index=False)
# print(df["Pricing_Model"].value_counts())