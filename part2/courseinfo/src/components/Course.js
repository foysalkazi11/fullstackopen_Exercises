import React from "react";

// Header component
const Header = ({ name }) => <h2>{name}</h2>;

// Part component

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

// Content component
const Content = ({ parts }) => {
  const total = parts.reduce(
    (total, current) => (total += current?.exercises),
    0
  );

  return (
    <>
      {parts?.map((part) => {
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
      <h4>total of {total} exercises</h4>
    </>
  );
};

const Course = ({ courses }) => {
  return courses.map((content) => {
    return (
      <div key={content.id}>
        <Header name={content.name} />
        <Content parts={content.parts} />
      </div>
    );
  });
};

export default Course;
