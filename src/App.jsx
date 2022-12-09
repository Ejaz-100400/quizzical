import React from 'react';
import './App.css'
import Main from './Components/Main'
import Quizlist from './Components/Quizlist'
function App() {
  const[isQuizstarted,setisQuizstarted]=React.useState(false)
  const[quizcategories,setquizcategories]=React.useState([])
  const[formData,setformData]=React.useState(
    {
      categoryId:'',
      difficulty:'',
      type:'',
    }
  )
  // fetching the api data 
  React.useEffect(()=>{
    fetch('https://opentdb.com/api_category.php')
      .then(res=>res.json())
      .then(data=>setquizcategories(data.trivia_categories))
  },[])
  
  // initializing the quiz
  function quizstart(){
    setisQuizstarted(prev=>!prev)
  }
  
  // handling the form input from the quiz category
  function handlequizform(e){
    const{name,value}=e.target
    setformData(prevform=>(
      {
        ...prevform,
        [name]:value,
      }
    ))
  }
  console.log(quizcategories)
  return (
    <div className="App">
      {isQuizstarted?
      <Quizlist formData={formData}/>:  
      <Main formData={formData} handlequizform={handlequizform} quizstart={quizstart} quizcategories={quizcategories}/>
      }
    </div>
  )
}

export default App
