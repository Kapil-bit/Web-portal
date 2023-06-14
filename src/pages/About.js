import React from "react";
import PublicLayout from "../components/common/layout/layout";
import Navbar from "../components/common/header/navbar";

const About = () => {
  return (
    <PublicLayout title="About">
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "45%", height: 1, background: "black" }}></div>
          <h2 style={{ margin: "0 10px", color: "#000", textAlign: "center" }}>
            About The Project
          </h2>
          <div style={{ width: "45%", height: 1, background: "black" }}></div>
        </div>
        <p style={{ lineHeight: 1.5, textAlign: "justify", marginTop: 20 }}>
          In the present context, one of the most pressing concerns is reliable
          and rapid weather forecasting. In Nepal, the Hydrology and
          Meteorological Department uses a numerical modeling approach to
          forecast the weather, which is time-consuming and requires high end
          equipment to process the information.
        </p>
        <p style={{ lineHeight: 1.5, textAlign: "justify", marginTop: 20 }}>
          This project aims to forecast the precipitation and air temperature of
          different four stations of the Kaski district using Long Short Term
          Memory (LSTM) neural network and deploy the outputs through the web
          portal. The LSTM algorithm is found to be more accurate for time
          series forecasting. Parameters like rainfall, relative humidity,
          maximum and minimum temperature and wind speed are used to train the
          model. The hourly precipitation and air temperature are predicted with
          data acquired from Pokhara Airport and daily precipitation, minimum
          and maximum air temperature with data acquired from Begnas, Lumle and
          precipitation with Lamachaur station. For daily precipitation,
          prediction is done for the next coming day and for hourly prediction,
          it is done for next 2 hours.
        </p>
        <p style={{ lineHeight: 1.5, textAlign: "justify", marginTop: 20 }}>
          The RMSE values range from 0.58 to 4.08 for precipitation and from
          0.16 to 0.82 for air temperature and MAE values range from 0.21 to
          2.87 for precipitation and from 0.12 to 0.64 for air temperature,
          indicating temperature has a good accuracy. The R² values range from
          0.89 to 0.99 indicating strong correlation between the predicted and
          actual values.
        </p>
      </div>
    </PublicLayout>
  );
};

export default About;
