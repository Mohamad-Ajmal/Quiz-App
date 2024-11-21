import axios from "axios";
import { createContext, useContext, useState } from "react";

const API_ENDPOINT = "https://opentdb.com/api.php?";
// eslint-disable-next-line no-unused-vars
const url = "";
const QuizContext = createContext();

// eslint-disable-next-line react/prop-types
function QuizProvider({ children }){

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const {index, setIndex} = useState(0);
    const [correct, setCorrect] = useState(0);


    const [quiz, setQuiz] = useState({
        amount: 10,
        category: "sports",
        difficulty: "easy",
    })
    const fetchQuestions = async (url) =>{
        setIsLoading(true);
        const res = await axios(url).catch((error)=> console.log(error));
        console.log(res);
        if(res) {
            const data = await res.data.results;
            if(data.length >0){
                setQuestions(data);
                setIsLoading(false);
                setWaiting(false);
                setError(false);

            }else{
                setWaiting(false);
                setError(true);
            }
        }else{
            setWaiting(false);
        }

    }
    
    function nextQuestion() {
        setIndex((oldIndex) => {
        const index = oldIndex + 1;
        if (index > questions.length - 1) {
            openModal();
            return 0;
        } else {
            return index;
        }
        });
    };
    function checkAnswer (value) {
        if (value) {
          setCorrect((oldState) => oldState + 1);
        }
    };
    const openModal = () => {
        setIsModelOpen(true);
      };
    
      const closeModal = () => {
        setWaiting(true);
        setCorrect(0);
        setIsModelOpen(false);
      };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuiz({ ...quiz, [name]: value });
      };

    function handleSubmit(e){
        e.preventDefault();

        const {amount, category, difficulty} = quiz;

        const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple`;
        fetchQuestions(url);
    }



    return (
        <QuizContext.Provider 
        value={{
            waiting,
            isLoading,
            questions,
            index,
            correct,
            error,
            isModelOpen,
            checkAnswer,
            nextQuestion,
            quiz,
            openModal,
            closeModal,
            handleChange,
            handleSubmit
        }}>
        {children}
        </QuizContext.Provider>
    )
}

function useQuiz(){
    const context = useContext(QuizContext);
    if(context === undefined) throw new Error("QuizContext was used outside the QuizProvider");
    return context;
}

export {QuizProvider, useQuiz}