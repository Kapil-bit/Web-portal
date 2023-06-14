import React from "react";
import {
  precips,
  min_temprs,
  max_temprs,
  dates,
  temprs,
} from "../redux/slices/locationSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PublicLayout from "../components/common/layout/layout";
import moment from "moment";

const Details = () => {
  const location = useLocation();
  const temperature = useSelector(temprs);
  console.log(temperature);
  const Date = useSelector(dates);
  console.log(Date);
  const precipitation = useSelector(precips);
  const maxtemperature = useSelector(max_temprs);
  const mintemperature = useSelector(min_temprs);
  const [searchResult, coordinate, precip, tempr, date] = location.state;
  return (
    <PublicLayout title={searchResult}>
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#f2f2f2",
          borderRadius: 10,
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.4)",
          padding: 40,
          margin: 150,
        }}
      >
        <h2 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
          Search Result
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ fontWeight: "bold", marginRight: 10 }}>Location:</span>
          <span>{searchResult}</span>
        </div>
        {Date && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: "bold", marginRight: 10 }}>Date:</span>
            <span>
              {Array.isArray(Date)
                ? `${moment(Date[0]).format("YYYY-MM-DD HH:mm")}, ${moment(
                    Date[1]
                  ).format("YYYY-MM-DD HH:mm")}`
                : moment(Date).format("YYYY-MM-DD")}
            </span>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ fontWeight: "bold", marginRight: 10 }}>
            Precipitation(mm):
          </span>
          <span>
            {precipitation.map((p) => Number(p).toFixed(2)).join(", ")}
            {precipitation.length === 1 && " "}
          </span>
        </div>

        {maxtemperature && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: "bold", marginRight: 10 }}>
              Maximum Temperature(Celcius):
            </span>
            <span>{Number(maxtemperature).toFixed(2)}</span>
          </div>
        )}

        {mintemperature && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: "bold", marginRight: 10 }}>
              Minimum Temperature(Celcius):
            </span>
            <span>{Number(mintemperature).toFixed(2)}</span>
          </div>
        )}

        {temperature && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: "bold", marginRight: 10 }}>
              Temperature(Celsius):
            </span>
            <span>
              {temperature.map((t) => Number(t).toFixed(2)).join(", ")}
            </span>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default Details;
