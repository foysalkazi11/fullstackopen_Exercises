import axios from "axios";
const url = "https://restcountries.com/v3/name";

const findAllCountries = (query) => {
  const newUrl = `${url}/${query}`;
  const countries = axios.get(newUrl);
  return countries.then((response) => response.data);
};

export default findAllCountries;
