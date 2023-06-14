import axios from "axios";
import { BASE_URL } from "../constants/urlconstants";
export const test = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    // console.log("response = ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const locationAPI = async (locationName) => {
  try {
    const response = await axios.get(`${BASE_URL}${locationName}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
