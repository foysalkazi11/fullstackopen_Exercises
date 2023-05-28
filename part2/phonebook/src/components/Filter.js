import React from "react";

const Filter = ({ filterTerm, setFilterTerm }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
      />
    </div>
  );
};

export default Filter;
