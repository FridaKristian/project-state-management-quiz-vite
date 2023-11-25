import { Questions } from "../../components/questions/Questions";
import { useParams } from "react-router-dom";
import "../../components/questions/Questions.css";

export const QuestionPage = () => {
  const { id } = useParams();
  return (
    <div className="question-container">
      <Questions param={id} />
    </div>
  );
};
