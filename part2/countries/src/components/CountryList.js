import React from "react";

const CountryList = ({ countries, onCountrySelect }) => {
  return (
    <ul>
      {countries?.map((country) => {
        const { name, population } = country;
        return (
          <li key={name?.common + population}>
            {name?.common}{" "}
            <button onClick={() => onCountrySelect(country)}>show</button>
          </li>
        );
      })}
    </ul>
  );
};

export default CountryList;
