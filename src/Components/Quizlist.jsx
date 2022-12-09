import React from 'react'
import Quiz from './Quiz'
import bob1 from '../assets/bob1.svg'
import bob2 from '../assets/bob2.svg'
import {ThreeDots} from 'react-loader-spinner'

export default function Quizlist(props){
    const [quizData,setQuizData]=React.useState([])
    const [showAnswer,setShowAnswer]=React.useState(false)
    const [apiCall,setApiCall]=React.useState(true)
    const [countCorrectAnswers, setCountCorrectAnswers] = React.useState(0);
    const [isLoading,setIsLoading]=React.useState(true)
    
React.useEffect(()=>{
    setIsLoading(true)
    const url=`https://opentdb.com/api.php?amount=5&category=${props.formData.categoryId}&difficulty=${props.formData.difficulty}&type=${props.formData.type}`
    fetch(url).then(res=>res.json())
        .then(data=>{
    setIsLoading(false)
    setQuizData(data.results.map((quiz,index)=>{
    return {
            ...quiz,
            id:`quiz-${index}`,
            selectedAnswer:""
            }
        }))
    })
},[apiCall])

React.useEffect(() => {
  let correctAnswers = 0;
  quizData.forEach((quiz) => {
    if (quiz.selectedAnswer === quiz.correct_answer) {
      correctAnswers++;
    }
  });
  setCountCorrectAnswers(correctAnswers);
}, [quizData]);


function selectAnswer(id,answer){

  if(!showAnswer){
    // console.log(id,answer)
    setQuizData(prevState=>(
      prevState.map(quiz=>{
        return quiz.id===id?{...quiz,selectedAnswer:answer}:quiz
      })
    ))
  }
}

function check(){
  setShowAnswer(prevState=>!prevState)
}

function reset(){
  setApiCall(prevState=>!prevState)
  setShowAnswer(prevState=>!prevState)
}

// console.log(quizData)
function handleLoadStartPage(){
  // ReactDOM.render(<Start/>)
  window.location.reload(false);
}
    return(
        <>
        {!isLoading?
            quizData.length>0?
              (<div className='quiz--list'>
                  <div>
                    {
                      quizData.map(quiz=>{
                        return <Quiz key={quiz.id} {...quiz} selectAnswer={selectAnswer} showAnswer={showAnswer} apiCall={apiCall}/>
                      })
                    }
                  </div>
                  <div className='quiz--info'>
                    {showAnswer && <h5>You scored {countCorrectAnswers}/{quizData.length} correct answers</h5>}
                    <button onClick={showAnswer?reset:check} className='quiz--check--btn'>{showAnswer ? "Play Again" : "Check Answers"}</button>
                  </div>
              </div>)
              :
              <div className='quiz--list quiz--list--modifier'>
                <h3>No questions found! </h3>
                <button className='quiz--check--btn' onClick={handleLoadStartPage}>Refresh</button>
              </div>
            
        :   
        <div className='loader--container'>
          <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#4D5B9E" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
        </div>
      } 
      </>  
    )

}