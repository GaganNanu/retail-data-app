import json
import pandas

products = pandas.read_csv(
    'D:/University of Cincinnati/Fall 2022/Cloud Computing/final/8451_The_Complete_Journey_2_Sample/400_products.csv').rename(columns=lambda x: x.strip())
households = pandas.read_csv(
    'D:/University of Cincinnati/Fall 2022/Cloud Computing/final/8451_The_Complete_Journey_2_Sample/400_households.csv').rename(columns=lambda x: x.strip())
transactions = pandas.read_csv(
    'D:/University of Cincinnati/Fall 2022/Cloud Computing/final/8451_The_Complete_Journey_2_Sample/400_transactions.csv').rename(columns=lambda x: x.strip())


joined = transactions.join(products, on='PRODUCT_NUM', how='left', rsuffix='_prd').join(households, on='HSHD_NUM', how='left', rsuffix='_prd')
joined = joined[['HSHD_NUM', 'L', 'AGE_RANGE', 'MARITAL', 'INCOME_RANGE', 'HOMEOWNER', 'HSHD_COMPOSITION', 'HH_SIZE', 'CHILDREN', 'BASKET_NUM', 'PURCHASE_', 'PRODUCT_NUM', 'SPEND', 'UNITS','STORE_R', 'WEEK_NUM', 'YEAR','DEPARTMENT','COMMODITY', 'BRAND_TY', 'NATURAL_ORGANIC_FLAG']]
joined = joined.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

joined = joined.dropna(thresh=16).apply(lambda x: x.str.strip() if x.c == "object" else x)
# _2018 = joined.where(joined['YEAR'] == 2018).iloc[0,10000]
# _2019 = joined.where(joined['YEAR'] == 2019).iloc[0,10000]
# _2020 = joined.where(joined['YEAR'] == 2020).iloc[0,10000]
# joined = pandas.concat([_2018,_2019,_2020])
# joined.insert(0, 'id', range(0, len(joined)))
# joined.set_index('id')
# joined.reset_index(inplace=True)

withincomerange = joined.filter

joined.to_csv('final_data_joined_30k.csv', index=False)
# with open('finaldata','w+') as f:
#     json.dump(js, f)
#     joined.index()