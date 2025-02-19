import { useNavigate } from "react-router-dom";
import useQuizStore from "../../stores/useQuestions";
import Confetti from "react-confetti";
import "./QuizSummary.css";

export const QuizSummary = () => {
  const { answers, restart, gameResult } = useQuizStore();
  const navigate = useNavigate();

  return (
    <div className="summary-container">
      <h2 className="quiz-header">Quiz Summary</h2>
      {gameResult === "win" && 
        <Confetti width={window.innerWidth} height={window.innerHeight} />}
      {gameResult === "win" ? (
        <h3 className="result">
          🌟 Victory! Quiz mastery achieved! 👑
        </h3>
      ) : (
        <h3 className="result">
          😉 So close! The crown is just a quiz away. 👑
        </h3>
      )}

      {/* Display user answers and correct answers for each question */}
      <ul className="answer-summary">
        {answers.map((answer) => {
          return (
            <li key={answer.questionId}>
              <p>
                {answer.question.questionText}
              </p>
              <p style={{ 
                color: answer.isCorrect ? "limegreen" : "red" 
                }}>
                Your Answer: {answer.answer}
              </p>
              <p>
                Correct Answer:{" "}
                {answer.question.options[answer.question.correctAnswerIndex]}
              </p>
            </li>
          );
        })}
      </ul>

      <button
        className="restart-btn"
        onClick={() => {
          restart();
          navigate("/");
        }}
      >
        Restart Quiz
      </button>
    </div>
  );
};
