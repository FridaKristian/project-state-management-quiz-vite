import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useQuizStore from "../../stores/useQuestions";
import useQuestions from "../../stores/useQuestions";
import "./board.css";

export const Board = () => {
  const { answers, setGameResult } = useQuizStore();

  const questions = useQuestions((state) => state.questions);
  const navigate = useNavigate();

  //function to check which "board-cards" have been answered. Makes a 3x3 matrix where each element is changed to true if the answer was correct and a "lose"-matrix where the elements change to true if the answer was incorrect. Contructs each possible win-row/column/diagonal and each lose-row/col/diag. Lastly we use conditionals to determine if the user has won/lost and if so, sends him/her to the summary page
  const checkIfWon = () => {
    let row = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    let win = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    let lose = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    answers.map((answer) =>
      row[0].find((num) => num === answer.questionId)
        ? (win[0][answer.questionId - 1] = answer.isCorrect)
        : null
    );
    answers.map((answer) =>
      row[1].find((num) => num === answer.questionId)
        ? (win[1][answer.questionId - 4] = answer.isCorrect)
        : null
    );
    answers.map((answer) =>
      row[2].find((num) => num === answer.questionId)
        ? (win[2][answer.questionId - 7] = answer.isCorrect)
        : null
    );

    answers.map((answer) =>
      row[0].find((num) => num === answer.questionId)
        ? (lose[0][answer.questionId - 1] = !answer.isCorrect)
        : null
    );
    answers.map((answer) =>
      row[1].find((num) => num === answer.questionId)
        ? (lose[1][answer.questionId - 4] = !answer.isCorrect)
        : null
    );
    answers.map((answer) =>
      row[2].find((num) => num === answer.questionId)
        ? (lose[2][answer.questionId - 7] = !answer.isCorrect)
        : null
    );

    let winningRow1 = win[0][0] && win[0][1] && win[0][2];
    let winningRow2 = win[1][0] && win[1][1] && win[1][2];
    let winningRow3 = win[2][0] && win[2][1] && win[2][2];

    let winningCol1 = win[0][0] && win[1][0] && win[2][0];
    let winningCol2 = win[0][1] && win[1][1] && win[2][1];
    let winningCol3 = win[0][2] && win[1][2] && win[2][2];

    let winningDia1 = win[0][0] && win[1][1] && win[2][2];
    let winningDia2 = win[0][2] && win[1][1] && win[2][0];

    let losingRow2 = lose[1][0] || lose[1][1] || lose[1][2];
    let losingRow1 = lose[0][0] || lose[0][1] || lose[0][2];
    let losingRow3 = lose[2][0] || lose[2][1] || lose[2][2];

    let losingCol1 = lose[0][0] || lose[1][0] || lose[2][0];
    let losingCol2 = lose[0][1] || lose[1][1] || lose[2][1];
    let losingCol3 = lose[0][2] || lose[1][2] || lose[2][2];

    let losingDia1 = lose[0][0] || lose[1][1] || lose[2][2];
    let losingDia2 = lose[0][2] || lose[1][1] || lose[2][0];

    if (
      winningRow1 ||
      winningRow2 ||
      winningRow3 ||
      winningCol1 ||
      winningCol2 ||
      winningCol3 ||
      winningDia1 ||
      winningDia2
    ) {
      setGameResult("win");
      navigate("/summary");
    } else if (
      losingRow1 &&
      losingRow2 &&
      losingRow3 &&
      losingCol1 &&
      losingCol2 &&
      losingCol3 &&
      losingDia1 &&
      losingDia2
    ) {
      setGameResult("lose");
      navigate("/summary");
    }
  };

  //useEffect-hook which depends on the update of the answers-array. Runs checkIfWon-function.
  useEffect(checkIfWon, [answers, navigate, setGameResult]);

  return (
    <>
      <div className="board-container">
        {questions.map((question) => {
          const hasAnswer = answers.some(
            (answer) => answer.questionId === question.id
          );

          return (
            <Link
              key={question.id}
              to={`/quest/${question.id}`}
              style={{ pointerEvents: hasAnswer ? "none" : "" }}
            >
              <div className="a-question" key={question.id}>
                {!hasAnswer && <p>{question.id}</p>}

                {answers.length > 0 &&
                  answers.map((answer) =>
                    answer.questionId === question.id ? (
                      answer.isCorrect === true ? (
                        <div className="circle" key={answer.questionId}></div>
                      ) : (
                        <div className="x" key={answer.questionId}>
                          ❌
                        </div>
                      )
                    ) : null
                  )}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
