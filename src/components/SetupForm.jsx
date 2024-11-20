import {useQuiz} from "../contexts/QuizContext"
export default function SubmitForm() {
  const {handleSubmit, error} = useQuiz();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
            <h2>Setup your quiz</h2>
            <div className="form-control">
                <label htmlFor="amount">Number of questions</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={0}
                    className="form-input"
                    min={1}
                    max={50}
                    onChange={()=>{}}
                />
            </div>
            <div className="form-control">
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    className="form-input"
                    value={"category"}
                    onChange={()=>{}}
                >
                    <option value="sports">sports</option>
                    <option value="history">history</option>
                    <option value="politics">politics</option>
                </select>
            </div>
            <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={""}
              onChange={()=>{}}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can not generate questions, please try different options
            </p>
          )}
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            start
          </button>
        </form>
      </section>
    </main>
  )
}