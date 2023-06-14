import React, { useState } from "react";
import "./styles/SearchStation.css";
import data from "../data/mock";
import SearchResults from "./searchResults/SearchResults";
import { useNavigate } from "react-router-dom";

const SearchStation = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);

    const filteredData = data.filter((item) => {
      return item.location.toLowerCase().includes(searchValue.toLowerCase());
    });
    setSearchResults(filteredData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredData = data.filter((item) => {
      return item.location.toLowerCase().includes(searchValue.toLowerCase());
    });
    setSearchResults(filteredData);
  };

  return (
    <div>
      <div className="input_wrapper">
        <form onSubmit={handleSubmit}>
          <input
            className="input_field"
            type="text"
            placeholder="Search for location"
            value={searchValue}
            onChange={handleChange}
          />
        </form>
      </div>
      {searchResults.length > 0 && searchValue && (
        <SearchResults
          searchResults={searchResults}
        />
      )}
    </div>
  );
};

export default SearchStation;
