import React from "react";

const Persons = ({ persons, handleToDeletePerson }) => {
  return persons?.map((person) => (
    <p key={person.id}>
      {`${person?.name} ${person?.number}`}{" "}
      <button onClick={() => handleToDeletePerson(person?.id, person?.name)}>
        Delete
      </button>{" "}
    </p>
  ));
};

export default Persons;
