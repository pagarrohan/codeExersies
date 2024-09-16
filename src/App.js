import React, { useState, useEffect } from "react";
import { QUESTIONS } from "./questions";
import './index.css';

const App = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    if (savedScores.length > 0) {
      const avgScore = savedScores.reduce((sum, score) => sum + score, 0) / savedScores.length;
      setAverageScore(avgScore);
    }
  }, []);


  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const totalQuestions = Object.keys(QUESTIONS).length;
    const yesAnswers = Object.values(answers).filter((answer) => answer === "yes").length;


    const newScore = (100 * yesAnswers) / totalQuestions;


    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    savedScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(savedScores));


    const avgScore = savedScores.reduce((sum, score) => sum + score, 0) / savedScores.length;

    setScore(newScore);
    setAverageScore(avgScore);
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <div>
          <h1>Answer the following questions:</h1>
          <form>
            {Object.entries(QUESTIONS).map(([id, question]) => (
              <div key={id} className="question-item">
                <p>{question}</p>
                <div className="answer-options">
                  <label className={`option ${answers[id] === "yes" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name={`question-${id}`}
                      value="yes"
                      onChange={() => handleAnswer(id, "yes")}
                      checked={answers[id] === "yes"}
                    />
                    Yes
                  </label>
                  <label className={`option ${answers[id] === "no" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name={`question-${id}`}
                      value="no"
                      onChange={() => handleAnswer(id, "no")}
                      checked={answers[id] === "no"}
                    />
                    No
                  </label>
                </div>
              </div>
            ))}
          </form>
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>

          {score !== null && (
            <div>
              <h2>Your Score: {score.toFixed(2)}</h2>
            </div>
          )}

          {averageScore !== null && (
            <div>
              <h2>Average Score across all runs: {averageScore.toFixed(2)}</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
