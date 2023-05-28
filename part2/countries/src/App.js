import React, { useState } from "react";
import SearchInput from "./components/SearchInput";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import findAllCountries from "./services/findCountries";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchCountries = (query) => {
    if (query.trim() !== "") {
      findAllCountries(query)
        .then((data) => {
          if (data.length === 1) {
            setSelectedCountry(data[0]);
          } else {
            setCountries(data);
            setSelectedCountry(null);
          }
        })
        .catch((err) => {
          setCountries([]);
          setSelectedCountry(null);
          console.log(err);
        });
    } else {
      setCountries([]);
    }
  };

  // handle search
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    fetchCountries(searchQuery);
    setSelectedCountry(null);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <SearchInput query={query} onSearch={handleSearch} />
      {!selectedCountry ? (
        countries?.length > 10 ? (
          <p>Too many matches, please make your query more specific.</p>
        ) : (
          <CountryList
            countries={countries}
            onCountrySelect={handleCountrySelect}
          />
        )
      ) : null}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
