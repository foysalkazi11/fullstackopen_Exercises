import React from "react";
import WeatherDetails from "./WeatherDetails";

const CountryDetails = ({ country }) => {
  const { name, capital, area, languages, flags } = country;

  return (
    <div>
      <h1>{name?.common}</h1>
      <p>Capital: {capital?.[0]}</p>
      <p>Area: {area}</p>
      <img src={flags?.[1]} alt="Country Flag" />
      <h3>Languages</h3>
      <ul>
        {Object.values(languages)?.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <WeatherDetails cityName={capital?.[0]} />
    </div>
  );
};

export default CountryDetails;
