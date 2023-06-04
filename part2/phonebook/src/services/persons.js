import axios from "axios";
const baseUrl = "/api/persons";

// get all person
const getAllPersons = () => {
  const allPersons = axios.get(baseUrl);
  return allPersons.then((res) => res.data);
};

// crate person
const createPerson = (obj) => {
  const person = axios.post(baseUrl, obj);
  return person.then((res) => res.data);
};

// delete person
const deletePerson = (id) => {
  const url = `${baseUrl}/${id}`;
  const deletedPerson = axios.delete(url);
  return deletedPerson.then((res) => res.data);
};

// update person
const updatePerson = (id, obj) => {
  const url = `${baseUrl}/${id}`;
  const updatedPerson = axios.put(url, obj);
  return updatedPerson.then((res) => res.data);
};

const exportFun = { getAllPersons, createPerson, deletePerson, updatePerson };
export default exportFun;
