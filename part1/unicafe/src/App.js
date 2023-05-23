import { useState } from "react";

// StatisticLine component
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// Statistics component
const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  // if no feedback
  if (!total) {
    return <p>No feedback give</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + "%"} />
      </tbody>
    </table>
  );
};

// button component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const averageScoreGood = 1;
const averageScoreNeutral = 0;
const averageScoreBad = -1;

// root component
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  // calculate total , average and positive feedback
  const claTotalAverageAndPositiveFeedback = (good, neutral, bad) => {
    const totalScore = good + neutral + bad;
    setTotal(totalScore);
    setAverage(
      (
        (good * averageScoreGood +
          neutral * averageScoreNeutral +
          bad * averageScoreBad) /
        totalScore
      ).toFixed(1)
    );
    setPositive(((good / totalScore) * 100).toFixed(1));
  };

  // calculate good feedback
  const handleGoodFeedbackClick = () => {
    setGood(good + 1);
    claTotalAverageAndPositiveFeedback(good + 1, neutral, bad);
  };

  // calculate neutral feedback
  const handleNeutralFeedbackClick = () => {
    setNeutral(neutral + 1);
    claTotalAverageAndPositiveFeedback(good, neutral + 1, bad);
  };
  // calculate bad feedback
  const handleBadFeedbackClick = () => {
    setBad(bad + 1);
    claTotalAverageAndPositiveFeedback(good, neutral, bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodFeedbackClick} text="good" />
      <Button handleClick={handleNeutralFeedbackClick} text="neutral" />
      <Button handleClick={handleBadFeedbackClick} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
