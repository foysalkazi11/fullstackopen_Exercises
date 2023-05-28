import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // show notification
  const showNotification = (
    errorMes = "Operation failed",
    type = "success",
    timeToShowInMilliseconds = 3000
  ) => {
    setMessageType(type);
    setMessage(errorMes);
    setTimeout(() => {
      setMessage(null);
    }, timeToShowInMilliseconds);
  };

  // find person by name
  const findPersonByName = (name) => {
    const existingPerson = persons.find((person) => person.name === name);
    return existingPerson;
  };

  // create person
  const postDataToServer = (obj) => {
    personsService
      .createPerson(obj)
      .then((res) => {
        setPersons(persons.concat(res));
        showNotification("Save person data successfully", "success");
      })
      .catch((err) => {
        console.log(err);
        showNotification("Person added failed", "error");
      });
  };

  // update person
  const UpdateDataToServer = (id, obj) => {
    personsService
      .updatePerson(id, obj)
      .then((res) => {
        setPersons(
          persons.map((person) =>
            person?.id === res?.id ? { ...person, ...res } : person
          )
        );
        showNotification("Update person data successfully");
      })
      .catch((err) => {
        console.log(err);
        showNotification("Person updated failed", "error");
      });
  };

  // delete person
  const handleToDeletePerson = (id, name) => {
    const isAllowToDelete = window.confirm(`Delete ${name} ?`);
    if (isAllowToDelete) {
      personsService
        .deletePerson(id)
        .then((data) => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification("Delete person successfully");
        })
        .catch((err) => {
          console.log(err);
          showNotification("Person delete failed", "error");
        });
    }
  };

  // add new person
  const handleSubmit = (event) => {
    event.preventDefault();
    // is already person exist
    let existingUser = findPersonByName(newName);

    if (existingUser) {
      let isAllowToUpdate = false;
      if (existingUser.number === newNumber) {
        isAllowToUpdate = window.confirm(
          `Person's information is already added to phonebook, replace the old information with a new one?`
        );
      } else {
        isAllowToUpdate = window.confirm(
          `${existingUser?.name} is already added to phonebook, replace the old number with a new one?`
        );
        existingUser = { ...existingUser, number: newNumber };
      }
      if (isAllowToUpdate) {
        UpdateDataToServer(existingUser.id, existingUser);
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
      };
      postDataToServer(newObject);
    }

    setNewName("");
    setNewNumber("");
  };

  // handle filter persons
  const handleFilter = (value) => {
    setFilterTerm(value);
    const filterPerson = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    setPersons(filterPerson);
  };

  useEffect(() => {
    // get all persons
    personsService
      .getAllPersons()
      .then((response) => {
        setPersons(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <Filter filterTerm={filterTerm} setFilterTerm={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleToDeletePerson={handleToDeletePerson} />
    </div>
  );
};

export default App;
