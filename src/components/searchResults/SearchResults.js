import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";
import { locationAPI } from "../../services/axiosFactory";
import { useDispatch } from "react-redux";
import { setprecip, settempr, setdate, setmax_tempr, setmin_tempr } from "../../redux/slices/locationSlice"

const SearchResults = ({ searchResults }) => {
  const [locationName, setlocationName] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleClick = (searchResult, coordinate, precip, tempr, date, endpoint) => {
      locationAPI(endpoint).then((res)=>{
        console.log(res)
        setlocationName(endpoint)
        if (res.status == 200 && res.data){
          dispatch(setprecip(res.data?.Precipitation))
          dispatch(settempr(res.data?.Temperature))
          dispatch(setmax_tempr(res.data?.Maximum_Temperature))
          dispatch(setmin_tempr(res.data?.Minimum_Temperature))
          dispatch(setdate(res.data?.Date))
          navigate(
            `/searchresult/${searchResults.map((item, index) => item.location)}`,
            { state: [searchResult, coordinate, precip, tempr, date, endpoint] }
          );
        }
      }).catch((error)=>{
        console.log(error)
      })
      
  };
  return (
    <div className="search-results">
      {searchResults.map((item, index) => (
        <button
          key={index}
          className="search-result"
          onClick={() =>
        
            handleClick(
              item.location,
              item.coordinates,
              item.precip,
              item.tempr,
              item.date,
              item.endpoint,
            )
          }
        >
          <div>{item.location}</div>
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
