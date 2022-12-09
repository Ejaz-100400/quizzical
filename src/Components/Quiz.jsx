import React from 'react'
import {decode} from 'html-entities'

export default function Quiz(props) {

    const [randomIndexState,setRandomIndexState]=React.useState(0)
    React.useEffect(()=>{
        // console.log("Quiz useEffect called")

        setRandomIndexState(getRandomIndex())
    },[props.apiCall])
    // console.log("Quiz comp rendered")
    
    function getRandomIndex(){
        const randomIndex=Math.floor(Math.random()*(props.incorrect_answers.length+1))
        return randomIndex
    }

    function getAnswers(){
        const answers=props.incorrect_answers
        const correctAnswer=props.correct_answer
        const randomIndex=randomIndexState%(answers.length+1)
        // console.log(correctAnswer,randomIndex,answers.length)
        // const randomIndex=0
        // console.log(randomIndex)
        const newAnswers=[]
        let idx=0;
        for(let i=0;i<answers.length+1;i++){
            if(i!=randomIndex){
                newAnswers.push(decode(answers[idx++]))
            }else{
                newAnswers.push(decode(correctAnswer))
            }
        }
        // console.log(newAnswers)
        return newAnswers
    }

    function handleAnswerClick(answer){
        props.selectAnswer(props.id,answer)

    }
    const answerE=getAnswers()
    // console.log(answerE)
    const answerElements=answerE.map((answer,index)=>{
        const dynamicClass=decode(props.selectedAnswer)===answer?"answer-btn-selected" : "answer-btn"
        let showAnswerClass=""
        if(props.showAnswer){
            // showAnswerClass=decode(props.selectedAnswer)===answer?decode(props.selectedAnswer)===decode(props.correct_answer)?"answer-correct" : "answer-incorrect":answer===decode(props.correct_answer)?"answer-correct":"answer-btn"
            showAnswerClass=answer===decode(props.correct_answer)?"answer-correct":decode(props.selectedAnswer)===answer?"answer-incorrect":"answer-btn"
        }
        return <button className={`${dynamicClass} ${showAnswerClass}`} key={index} onClick={()=>handleAnswerClick(answer)}>{answer}</button>
    })
    // console.log(answerElements)
  return (
    <div className='quiz'>
        <h3>{decode(props.question)}</h3>
        <div className="quiz--options">
            {answerElements}
        </div>
    </div>
  )
}