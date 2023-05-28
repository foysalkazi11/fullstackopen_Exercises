import React, { useEffect, useState } from "react";
import findWeatherOfACountry from "../services/weather";
const api_key = process.env.REACT_APP_API_KEY;
const urlForIcon = "https://openweathermap.org/img/wn";

const WeatherDetails = ({ cityName }) => {
  const [weatherDetails, setWeatherDetails] = useState({});

  // handle find weather
  const handleFindWeather = (cityName, apiKey) => {
    findWeatherOfACountry(cityName, apiKey)
      .then((data) => {
        setWeatherDetails(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (cityName) {
      handleFindWeather(cityName, api_key);
    }
  }, [cityName]);

  return (
    <div>
      <h1>Weather in {cityName}</h1>
      <p>temperature {weatherDetails?.main?.temp} Celsius</p>
      <img
        src={`${urlForIcon}/${weatherDetails?.weather?.[0]?.icon}@2x.png`}
        alt="icon"
      />
      <p>wind {weatherDetails?.wind?.speed} m/s</p>
    </div>
  );
};

export default WeatherDetails;
