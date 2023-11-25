import { useState, useEffect } from "react";

export const Timer = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState(time);

  const calculateTimeLeft = () => {
    return timeLeft - 1000;
  };

  const displayTimeLeft = (remainingTime) => {
    let showTimeLeft = {};

    if (remainingTime > 0) {
      showTimeLeft = {
        minutes: Math.floor((remainingTime / (1000 * 60)) % 60),
        seconds: (remainingTime / 1000) % 60,
      };

      return showTimeLeft;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  let displayTime = displayTimeLeft(timeLeft);

  if(displayTime.seconds !== null){
    let minutes = displayTime.minutes.toString().padStart(2, "0");
    let seconds = displayTime.seconds.toString().padStart(2, "0");

    return <p className="timer-display">{`⏱️ ${minutes}:${seconds}`}</p>;
  }
};
