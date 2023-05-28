import React from "react";

const SearchInput = ({ query, onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      find countries
      <input type="text" value={query} onChange={handleInputChange} />
    </div>
  );
};

export default SearchInput;
