import { useQuiz } from "./contexts/QuizContext"

import SubmitForm from "./components/SetupForm";
import Loding from "./components/Loding";
import Model from "./components/Model";


function App() {
  const {
    waiting,
    isLoading, 
    questions, 
    index, 
    correct, 
    nextQuestion, 
    checkAnswer, 
  } = useQuiz();

  

  if(!waiting) return <SubmitForm />;
  if(!isLoading) return <Loding />;

  const { question, incorrect_answers, correct_answer } = questions[index];
  
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer)
  }
  else{
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }

  return (
    <main>
      <Model />
      <section className="quiz">
          <p className="correct-answers">
            Correct Answers :  {correct}/{index}
          </p> 
          <article className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                  key={index}
                  className="answer-btn"
                  onClick={()=> checkAnswer(correct_answer === answer)}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
          </article> 
          <button className="next-question" onClick={nextQuestion}>
          next question
        </button>         
      </section>
    </main>
  )
}

export default App
