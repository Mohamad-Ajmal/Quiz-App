import { useQuiz } from "./contexts/QuizContext"

import SubmitForm from "./components/SetupForm";
import Loding from "./components/Loding";
import Model from "./components/Model";



function App() {
  console.log("App")
  const {
    wating,
    isLoading, 
    // questions, 
    // index, 
    // correct, 
    // error, 
    // isModelOpen, 
    // nextQuestion, 
    // checkAnswer, 
  } = useQuiz();

  if(!wating) return <SubmitForm />;
  if(!isLoading) return <Loding />;
  

  return (
    <main>
      <Model />
      <section className="quiz">
          <p className="correct-answers">
            Correct Answers : X
          </p> 
          <article className="container">
            <h2></h2>
            <div className="btn-container">

            </div>
          </article>          
      </section>
    </main>
  )
}

export default App
