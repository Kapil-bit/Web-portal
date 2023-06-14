import tensorflow as tf
from tensorflow import keras
import numpy as np
from flask import Flask, jsonify, request, make_response
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.model_selection import train_test_split
from datetime import datetime
from keras.models import Sequential
from keras.layers import LSTM,Dense ,Dropout, Bidirectional
from keras.optimizers import Adam
from keras.callbacks import ModelCheckpoint
import pandas as pd
import seaborn as sns

app = Flask(__name__)

@app.route('/')
def hello_world():
    response = jsonify(message="Simple server is running")

    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/lumle", methods=['GET'])

def lumle():
    # Lumle Minimun Temperature Model
    data = pd.read_csv("LumleMinTemp.csv")
    cols = list(data)[2:7]
    data_for_training = data[cols]
    
    X_train, X_test, y_train, y_test = train_test_split(data_for_training, data_for_training['Min Temperature'], test_size = 0.2, shuffle = False)

    scaler = MinMaxScaler()
    X_train_arr=scaler.fit_transform(X_train)
    X_test_arr=scaler.transform(X_test)

    #reshaping it into the single column data 
    y_train_arr=scaler.fit_transform(np.array(y_train).reshape(-1,1))
    y_test_arr=scaler.transform(np.array(y_test).reshape(-1,1))

    testX= X_test_arr.reshape((X_test_arr.shape[0], 1 ,X_test_arr.shape[1]))
    testY = y_test_arr.reshape((y_test_arr.shape[0], 1, y_test_arr.shape[1]))

    from tensorflow.keras.models import load_model
    model = load_model('LumleMinTempmodel.h5')

    next_day_predict = model.predict(testX[-1:])
    next_day = scaler.inverse_transform(next_day_predict)

    # Lumle Maximum Temperature Model
    max_temp = pd.read_csv('LumleMaxTemperature.csv')
    column = list(max_temp)[2:7]
    new_df = max_temp[column]

    X_train, X_test, y_train, y_test = train_test_split(new_df, new_df['Max Temperature'], test_size = 0.2, shuffle = False)

    X_train_arr=scaler.fit_transform(X_train)
    X_test_arr=scaler.transform(X_test)

    y_train_arr=scaler.fit_transform(np.array(y_train).reshape(-1,1))
    y_test_arr=scaler.transform(np.array(y_test).reshape(-1,1))

    trainX = X_train_arr.reshape((X_train_arr.shape[0], 1 ,X_train_arr.shape[1]))
    trainY = y_train_arr.reshape((y_train_arr.shape[0], 1, y_train_arr.shape[1]))

    testX= X_test_arr.reshape((X_test_arr.shape[0], 1 ,X_test_arr.shape[1]))
    testY = y_test_arr.reshape((y_test_arr.shape[0], 1, y_test_arr.shape[1]))

    from tensorflow.keras.models import load_model
    max_model = load_model('LumleMaxTempmodel.h5')

    next_day_temp = max_model.predict(testX[-1:])
    next_day_max = scaler.inverse_transform(next_day_temp)
    
    # Lumle Precipitation Model
    df = pd.read_csv("LumlePrecipitation.csv")
    col = list(df)[2:7]
    train_data = df[col]

    x_train, x_test, Y_train, Y_test = train_test_split(train_data, train_data['Precipitation(mm)'], test_size = 0.7, shuffle = False)
    scale = StandardScaler()
    x_train_arr=scale.fit_transform(x_train)
    x_test_arr=scale.transform(x_test)

    Y_train_arr=scale.fit_transform(np.array(Y_train).reshape(-1,1))
    Y_test_arr=scale.transform(np.array(Y_test).reshape(-1,1))

    testx= x_test_arr.reshape((x_test_arr.shape[0], 1 ,x_test_arr.shape[1]))
    testy = Y_test_arr.reshape((Y_test_arr.shape[0], 1, Y_test_arr.shape[1]))

    from tensorflow.keras.models import load_model
    precip_model = load_model('LumlePrecipitation.h5')

    next_day_precip = precip_model.predict(testx[-1:])
    next_precip = scale.inverse_transform(next_day_precip)

    input_data = data.tail(24)
    input_data['Date'] = pd.to_datetime(input_data['Date'])
    next_date = input_data.iloc[-1]['Date'] + pd.Timedelta(days=1)

    # Results
    results = {'Date': next_date.date().isoformat(), 'Maximum_Temperature': next_day_max.tolist(), 'Minimum_Temperature': next_day.tolist(), 'Precipitation': next_precip.tolist()}
    response = make_response(jsonify(results))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/airport", methods=['GET'])
def airport():
    # Airport Hourly Temperature Prediction
    data = pd.read_csv('Airportfinaldata.csv')
    cols = list(data)[1:5]
    data_for_training = data[cols].astype(float)

    scaler = StandardScaler()
    scaler.fit(data_for_training)
    data_scaled = scaler.transform(data_for_training)

    # taking last 24 rows of datasets for the next 2 hour prediction
    input = data_scaled[-24:]
    input_shaped = input.reshape(1,24,4)
    
    from tensorflow.keras.models import load_model
    model = load_model('HourlyTemperaturemodel.h5')

    next_2_hour = model.predict(input_shaped)
    transpose = next_2_hour.transpose()
    #making it same for 4 columns so that scaler will denormalize the data
    forecast_copies=np.repeat(transpose,4, axis=-1)
    
    next2hours_denormalized = scaler.inverse_transform(forecast_copies)[:, 1]

    # Airport Hourly Precipitation Prediction
    df = pd.read_csv('AirportHourlyPrecipitation.csv')
    #train_dates = pd.to_datetime(data['Date'])
    col = list(df)[2:7]
    train_data = df[col].astype(float)

    scaler.fit(train_data)
    data_scaled = scaler.transform(train_data)

    input = data_scaled[-24:]
    shaped_input = input.reshape(1,24,5)
    
    from tensorflow.keras.models import load_model
    precip_model = load_model('AirportPrecipitation.h5')

    next_2_hour_precip = precip_model.predict(shaped_input)
    transposes = next_2_hour_precip.transpose()
    #making it same for 5 columns so that scaler will denormalize the data
    forecast_copies=np.repeat(transposes,5, axis=-1)
    
    next2hours_denormalized_precip = scaler.inverse_transform(forecast_copies)[:, -1]

    if next2hours_denormalized_precip[0] < 0:
        next2hours_denormalized_precip[0] = 0
    if next2hours_denormalized_precip[1] < 0:
        next2hours_denormalized_precip[1] = 0

    import datetime

    # Parse the last timestamp in the CSV file
    last_timestamp_str = df['Date'].iloc[-1]
    last_timestamp = datetime.datetime.strptime(last_timestamp_str, '%Y-%m-%d %H:%M')

    # Calculate the next two timestamps
    next_timestamps = []
    for i in range(1, 3):
        next_timestamp = last_timestamp + datetime.timedelta(hours=i)
        next_timestamps.append(next_timestamp)

    # Convert the timestamps to strings in the desired format
    output_timestamps = [t.strftime('%Y-%m-%d %H:%M') for t in next_timestamps]

    results = {'Date': output_timestamps, 'Precipitation': next2hours_denormalized_precip.tolist(), 'Temperature': next2hours_denormalized.tolist()}

    response = make_response(jsonify(results))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response




@app.route("/lamachaur", methods=['GET'])
def lamachaur():
    data = pd.read_csv('LamachaurPrecipitation.csv')
    cols = list(data)[2:5]
    train_data = data[cols].astype(float)

    X_train, X_test, y_train, y_test = train_test_split(train_data, train_data['Precipitation(mm)'], test_size = 0.3, shuffle = False)
    scaler = StandardScaler()
    X_train_arr = scaler.fit_transform(X_train)
    X_test_arr = scaler.transform(X_test)

    #reshaping it into the single column data 
    y_train_arr = scaler.fit_transform(np.array(y_train).reshape(-1,1))
    y_test_arr = scaler.transform(np.array(y_test).reshape(-1,1))

    trainX = X_train_arr.reshape((X_train_arr.shape[0], 1 ,X_train_arr.shape[1]))
    trainY = y_train_arr.reshape((y_train_arr.shape[0], 1, y_train_arr.shape[1]))

    testX = X_test_arr.reshape((X_test_arr.shape[0], 1 ,X_test_arr.shape[1]))
    testY = y_test_arr.reshape((y_test_arr.shape[0], 1, y_test_arr.shape[1]))

    from tensorflow.keras.models import load_model
    precip_model = load_model('LamachaurPrecipitation.h5')

    next_day_predict = precip_model.predict(testX[-1:])
    next_day = scaler.inverse_transform(next_day_predict)

    input_data = data.tail(24)
    input_data['Date'] = pd.to_datetime(input_data['Date'])
    next_date = input_data.iloc[-1]['Date'] + pd.Timedelta(days=1)

    results = {'Date': next_date.date().isoformat(), 'Precipitation': next_day.tolist()}
    response = make_response(jsonify(results))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/begnas", methods=['GET'])
def begnas():
    # Begnas Maximum Temperature Prediction
    data = pd.read_csv('BegnasMaxTemperature.csv')
    cols = list(data)[2:7]
    data_for_training = data[cols].astype(float)

    X_train, X_test, y_train, y_test = train_test_split(data_for_training, data_for_training['Max Temperature'], test_size = 0.2, shuffle = False)
    
    scaler = MinMaxScaler()
    X_train_arr = scaler.fit_transform(X_train)
    X_test_arr = scaler.transform(X_test)

    #reshaping it into the single column data 
    y_train_arr = scaler.fit_transform(np.array(y_train).reshape(-1,1))
    y_test_arr = scaler.transform(np.array(y_test).reshape(-1,1))

    trainX = X_train_arr.reshape((X_train_arr.shape[0], 1 ,X_train_arr.shape[1]))
    trainY = y_train_arr.reshape((y_train_arr.shape[0], 1, y_train_arr.shape[1]))

    testX = X_test_arr.reshape((X_test_arr.shape[0], 1 ,X_test_arr.shape[1]))
    testY = y_test_arr.reshape((y_test_arr.shape[0], 1, y_test_arr.shape[1]))

    from tensorflow.keras.models import load_model
    max_model = load_model('BegnasMaxTempModel.h5')

    next_day_predict = max_model.predict(testX[-1:])
    next_day_max = scaler.inverse_transform(next_day_predict)

    # Begnas Minimum Temperature Prediction
    data = pd.read_csv('BegnasMinTemperature.csv')
    cols = list(data)[2:7]
    data_for_training = data[cols].astype(float)

    x_train, x_test, Y_train, Y_test = train_test_split(data_for_training, data_for_training['Min Temperature'], test_size = 0.2, shuffle = False)
    
    x_train_arr = scaler.fit_transform(x_train)
    x_test_arr = scaler.transform(x_test)

    #reshaping it into the single column data 
    Y_train_arr = scaler.fit_transform(np.array(Y_train).reshape(-1,1))
    Y_test_arr = scaler.transform(np.array(Y_test).reshape(-1,1))

    trainx = x_train_arr.reshape((x_train_arr.shape[0], 1 ,x_train_arr.shape[1]))
    trainy = Y_train_arr.reshape((Y_train_arr.shape[0], 1, Y_train_arr.shape[1]))

    testx = x_test_arr.reshape((x_test_arr.shape[0], 1 ,x_test_arr.shape[1]))
    testy = Y_test_arr.reshape((Y_test_arr.shape[0], 1, Y_test_arr.shape[1]))

    from tensorflow.keras.models import load_model
    min_model = load_model('BegnasMinTempModel.h5')

    next_day_predict_min = min_model.predict(testx[-1:])
    next_day_min = scaler.inverse_transform(next_day_predict_min)

    # Begnas Precipitation Prediction
    df = pd.read_csv("BegnasPrecipitation.csv")
    col = list(df)[2:9]
    train_data = df[col]

    x_train, x_test, Y_train, Y_test = train_test_split(train_data, train_data['Precipitation(mm)'], test_size = 0.3, shuffle = False)
    scale = StandardScaler()
    x_train_arr=scale.fit_transform(x_train)
    x_test_arr=scale.transform(x_test)

    Y_train_arr=scale.fit_transform(np.array(Y_train).reshape(-1,1))
    Y_test_arr=scale.transform(np.array(Y_test).reshape(-1,1))

    testx= x_test_arr.reshape((x_test_arr.shape[0], 1 ,x_test_arr.shape[1]))
    testy = Y_test_arr.reshape((Y_test_arr.shape[0], 1, Y_test_arr.shape[1]))

    from tensorflow.keras.models import load_model
    precip_model = load_model('BegnasPrecipitation.h5')

    next_day_precip = precip_model.predict(testx[-1:])
    next_precip = scale.inverse_transform(next_day_precip)

    input_data = data.tail(24)
    input_data['Date'] = pd.to_datetime(input_data['Date'])
    next_date = input_data.iloc[-1]['Date'] + pd.Timedelta(days=1)
     

    results = {'Date': next_date.date().isoformat(), 'Maximum_Temperature': next_day_max.tolist(), 'Minimum_Temperature': next_day_min.tolist(), 'Precipitation': next_precip.tolist()}
    response = make_response(jsonify(results))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    app.run(debug=True)

