import { Board } from "../../components/board/Board";
import "../Home.css";

export const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to our quiz game!</h1>
      <Board />
    </div>
  );
};
