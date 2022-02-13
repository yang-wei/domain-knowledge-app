import Head from "next/head";
import { useState } from "react";
import { getQuestions } from "../lib/api"

const numberOfQuestions = 10;

export function getStaticProps(context) {
  return {
    props: {
      allQuestions: getQuestions(numberOfQuestions)
    }
  }
} 

export default function Home({ allQuestions }) {
  const questions = allQuestions
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleSubmitButton = () => {
    setShowScore(true);
  };

  return (
    <div className="flex flex-col w-screen px-5 h-screen justify-center items-center">
      <Head>
        <title>Domain Knowledge App</title>
      </Head>
      <div className="container mx-auto max-w-screen-md">
        {showScore ? (
          <>
            <h1 className="text-3xl font-semibold">
              Congratulations, you are done !
            </h1>
            <ul className="list-disc my-8">
              <li>Want to add more features? Great, open an issue at our <a className="text-blue-600" href="https://github.com/gaijineering/domain-knowledge-app">repository</a>.</li>
              <li>Want to add more contents? Great, submit a pull request at our <a className="text-blue-600" href="https://github.com/gaijineering/domain-knowledge-app">repository</a>.</li>
              <li>Any feedback? Let us know by filling out this <a className="text-blue-600" href="https://forms.gle/Z2rEXAewbPSCi6nN6">form</a>.</li>
            </ul>
          </>
        ) : (
          <>
            <div className="flex flex-col items-start">
              <h3 className="mt-10 text-xl">
                  {questions[currentQuestion].topic} ({currentQuestion + 1}/{questions.length})
              </h3>
              <div className="mt-4 text-2xl h-16 my-4">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="flex justify-between w-1/2 my-8">
              <button
                onClick={handlePrevious}
                  className="w-[49%] py-3 bg-slate-900 text-white"
              >
                Previous
              </button>
              <button
                onClick={
                  currentQuestion + 1 === questions.length
                    ? handleSubmitButton
                    : handleNext
                }
                className="w-[49%] py-3 bg-slate-900 text-white"
              >
                {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
