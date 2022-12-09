import React from 'react'
import bob1 from '../assets/bob1.svg'
import bob2 from '../assets/bob2.svg'
export default function Main(props){
    
    const optionElements=props.quizcategories.map(category=>{
        return <option key={category.id} value={category.id}>{category.name}</option>
    })
    return(
        <div className="quiz-main-part">
            <img src={bob1} className='bob1 position-absolute'></img>
            <img src={bob2} className='bob2 position-absolute'></img>
            <div className="quiz-home-part position-absolute text-center">
                <h2 className="quiz-title">Quizzical</h2>
                <span className="p-4">Everyone loves sport and Everyone loves quiz</span>
                <br></br>
                <form className="start--form d-flex p-5">
                    <label htmlFor='category' className='p-2'>Select Category</label>
                    <select value={props.formData.categoryId} onChange={props.handlequizform} id='categoryId' name='categoryId' className='p-2'>
                    <option>Any category</option>
                    {optionElements}
                    </select>
                    <label htmlFor="difficulty" className='p-2'>Select Difficulty:</label>
                    <select value={props.formData.difficulty} onChange={props.handlequizform} id='difficulty' name='difficulty' className='p-2'>
                        <option value="" className='p-2'>Any Difficulty</option>
                        <option value="easy" className='p-2'>Easy</option>
                        <option value="medium" className='p-2'>Medium</option>
                        <option value="hard" className='p-2'>Hard</option>
                    </select>
                    <label htmlFor="type" className='p-2'>Select Type:</label>
                    <select value={props.formData.type} onChange={props.handlequizform} id="type" name="type" className='p-2'>
                        <option value="" className='p-2'>Any Type</option>
                        <option value="multiple" className='p-2'>Multiple Choice</option>
                        <option value="boolean" className='p-2'>True / False</option>
                    </select>
                </form>
                <button onClick={props.quizstart} className="btn  quiz-start-btn">Start Quiz</button>
            </div>
        </div>
    )
}