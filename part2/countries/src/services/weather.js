import axios from "axios";
const url = `http://api.openweathermap.org/data/2.5/weather`;

const findWeatherOfACountry = (cityName, apiKey) => {
  const updateUrl = `${url}?q=${cityName}&appid=${apiKey}`;
  const weather = axios.get(updateUrl);
  return weather.then((res) => res.data);
};
export default findWeatherOfACountry;
