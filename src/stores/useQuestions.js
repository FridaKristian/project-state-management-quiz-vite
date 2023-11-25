import { create } from "zustand";

const questions = [
  {
    id: 1,
    qImage: "/bone.png",
    questionText: "What’s the smallest bone in the body?",
    options: ["Patella", "Stirrup", "Thigh", "Teeny Peeny"],
    correctAnswerIndex: 1,
  },
  {
    id: 2,
    qImage: "/sugar-apple.png",
    questionText: "What is this fruit called?",
    options: ["Seedbox", "Sugar Apple", "Papijaja", "Lotusicous"],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    qImage: "/greta.png",
    questionText: "Who is this person?",
    options: [
      "Solvik Hammar",
      "Petra Thumb",
      "Greta Thunberg",
      "Anita Wrinkle",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 4,
    qImage: "/poland.png",
    questionText: "What country is this?",
    options: ["Germany", "Spain", "Poland", "France"],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    qImage: "/kanelbulle.png",
    questionText: "What is this?",
    options: ["Crab Cake", "Shepherd's Pie", "Apple Pie", "Cinnamon Bun"],
    correctAnswerIndex: 3,
  },
  {
    id: 6,
    qImage: "/twarog.png",
    questionText: "What type of cheese do you see in the photo? ",
    options: ["Feta", "Twarog", "Camembert", "Paneer"],
    correctAnswerIndex: 1,
  },
  {
    id: 7,
    qImage: "/numbers.png",
    questionText: "How many zeros do you see?",
    options: ["0", "2", "4", "6"],
    correctAnswerIndex: 2,
  },
  {
    id: 8,
    qImage: "/stonehenge.png",
    questionText: "Where is Stonehenge located?",
    options: ["Wales", "England", "Scotland", "Sweden"],
    correctAnswerIndex: 1,
  },
  {
    id: 9,
    qImage: "/volvo.png",
    questionText: "What kind of car is this??",
    options: ["Volvo", "KIA", "Nissan", "Saab"],
    correctAnswerIndex: 0,
  },
];

const useQuizStore = create((set) => ({
  questions,
  answers: [],
  quizOver: false,
  gameResult: "",

  submitAnswer: (questionId, answerIndex) => {
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      throw new Error(
        "Could not find question! Check to make sure you are passing the question id correctly."
      );
    }

    if (question.options[answerIndex] === undefined) {
      throw new Error(
        `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
      );
    }

    set((state) => ({
      answers: [
        ...state.answers,
        {
          questionId,
          answerIndex,
          question,
          answer: question.options[answerIndex],
          isCorrect: question.correctAnswerIndex === answerIndex,
        },
      ],
    }));
  },

  restart: () => {
    set({
      answers: [],
      quizOver: false,
      gameResult: 0,
    });
  },

  setGameResult: (result) => set({ gameResult: result }),
}));

export default useQuizStore;
