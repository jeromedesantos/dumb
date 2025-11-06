import { useEffect, useState } from "react";
import "../styles/globals.css";

export function App() {
  const [hideQuiz, setHideQuiz] = useState(true);
  const [hideSubmit, setHideSubmit] = useState(true);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        "Kata kunci manakah yang digunakan untuk mendefinisikan variabel dalam JavaScript?",
      answer: "A",
      hidden: true,
    },
    {
      id: 2,
      question:
        "Metode manakah yang digunakan untuk mendapatkan elemen HTML berdasarkan id dalam JavaScript?",
      answer: "A",
      hidden: true,
    },
    {
      id: 3,
      question:
        "Manakah di antara berikut ini yang bukan merupakan framework JavaScript?",
      answer: "B",
      hidden: true,
    },
    {
      id: 4,
      question:
        "Apa yang akan terjadi ketika kita menjalankan kode alert('Hello')",
      answer: "B",
      hidden: true,
    },
    {
      id: 5,
      question:
        "Dalam pernyataan switch, kata kunci apa yang digunakan untuk mengakhiri suatu case?",
      answer: "A",
      hidden: true,
    },
  ]);
  const [choices, setChoices] = useState([
    {
      id: 1,
      choice: [
        {
          id: "A",
          choice: "const",
        },
        {
          id: "B",
          choice: "$",
        },
      ],
    },
    {
      id: 2,
      choice: [
        {
          id: "A",
          choice: "getElementById()",
        },
        {
          id: "B",
          choice: "querySelector()",
        },
      ],
    },
    {
      id: 3,
      choice: [
        {
          id: "A",
          choice: "React",
        },
        {
          id: "B",
          choice: "Node.js",
        },
      ],
    },
    {
      id: 4,
      choice: [
        {
          id: "A",
          choice: "Popup pesan dengan tulisan 'Hello' akan muncul di konsol",
        },
        {
          id: "B",
          choice:
            "Sebuah popup pesan dengan tulisan 'Hello' akan muncul di layar",
        },
      ],
    },
    {
      id: 5,
      choice: [
        {
          id: "A",
          choice: "break",
        },
        {
          id: "B",
          choice: "exit",
        },
      ],
    },
  ]);
  const [answers, setAnswers] = useState<{ id: number; answer: string }[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => {
      const otherAnswers = prevAnswers.filter((ans) => ans.id !== questionId);
      return [...otherAnswers, { id: questionId, answer: answer }];
    });
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionId - 1]!.hidden = true;
      if (questionId < newQuestions.length) {
        newQuestions[questionId]!.hidden = false;
      } else {
        setHideSubmit(!hideSubmit);
      }
      return newQuestions;
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question) => {
      const userAnswer = answers.find((ans) => ans.id === question.id);
      if (userAnswer && userAnswer.answer === question.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    alert(`Your score is: ${newScore}/${questions.length}`);
    setHideSubmit(!hideSubmit);
    setHideQuiz(!hideQuiz);
  };

  const handleStart = () => {
    setHideQuiz(!hideQuiz);
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      if (newQuestions.length > 0) newQuestions[0]!.hidden = false;
      return newQuestions;
    });
  };

  return (
    <main>
      <section
        hidden={hideQuiz === false}
        onClick={handleStart}
        className="flex flex-col gap-2 justify-center min-h-screen text-5xl max-w-6xl mx-auto p-30 items-center font-bold cursor-pointer"
      >
        Start Quiz
      </section>
      <section hidden={hideQuiz}>
        {questions.map((question) => {
          return (
            <div
              key={question.id}
              hidden={question.hidden}
              className="flex flex-col gap-2 justify-center min-h-screen text-lg max-w-6xl mx-auto p-30"
            >
              <h2 className="text-xl py-2 font-bold">{question.question}</h2>
              <button
                onClick={() => handleAnswer(question.id, "A")}
                className="flex gap-2 cursor-pointer hover:bg-accent p-2"
              >
                <p>{choices[question.id - 1]?.choice[0]?.id}.</p>
                <p>{choices[question.id - 1]?.choice[0]?.choice}</p>
              </button>
              <button
                onClick={() => handleAnswer(question.id, "B")}
                className="flex gap-2 cursor-pointer hover:bg-accent p-2"
              >
                <p>{choices[question.id - 1]?.choice[1]?.id}.</p>
                <p>{choices[question.id - 1]?.choice[1]?.choice}</p>
              </button>
            </div>
          );
        })}
      </section>
      <section
        hidden={hideSubmit}
        className="flex justify-center min-h-screen text-5xl max-w-6xl mx-auto p-30 items-center font-bold cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </section>
    </main>
  );
}

export default App;
