# Weather portal
# This web app is developed to visualize the forecasted precipitation and temperature of various meteorological stations using ML models trained on the station based different weather parameters.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

For backend, you need to create a virtual environment.
Open a Git Bash or Bash terminal and navigate to the flask-server directory:
### cd flask-server

Create a virtual environment named "venv" using the following command:
### python3 -m venv venv

Activate the virtual environment using the following command:
### source venv/Scripts/activate

Install flask:
### pip install Flask

Virtual environment for your backend server will be created and to run the server use following command:
If you are inside the flask-server directory:
### source venv/Scripts/activate
### flask run

If you are in react directory:
### cd flask-server
### source venv/Scripts/activate
### flask run

Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

You also need to install multiple python libraries in order to run the ML model inside the server. Install tensorflow, keras, seaborn, pandas, numpy, scikit-learn using pip install <libraries_names>. The virtual environment along with libraries were not uploaded because of large file sizes.
