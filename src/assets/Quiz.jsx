import React, { useState } from 'react';
import{resultInitialState} from "./Constants"
import './quiz.css'
import AnswerTimer from './AnswerTimer';
export default function Quiz({questions}) {
    const[currentQuestion,setCurrentQuestion]=useState(0)
    const[answerIndex,setAnsweIndex]=useState(null);
    const[result,setResult]=useState(resultInitialState)
    const[answer,setAnswer]=useState(null);
    const[showResult,setShowResult]=useState(false);
    const[showAnswerLoader,setShowAnswerLoader]=useState(true)
    const{question, choices, correctAnswer}=questions[currentQuestion];

    const onAnswerClick=(answer,index)=>{
            setAnsweIndex(index);
            if(answer===correctAnswer){
                setAnswer(true)
            }
            else{
                setAnswer(false)
            }
    }
    const onclickNext=(finalAnswer)=>{
        setAnsweIndex(null);
        setShowAnswerLoader(false);
        setResult((previous)=>
        finalAnswer?{
        ...previous,
        score:previous.score+5,
        correctAnswers:previous.correctAnswers+1,
        }
        :{
            ...previous,
            wrongAnsewrs:previous.wrongAnsewrs+1,
        }
        );
        if(currentQuestion!==questions.length-1){
            setCurrentQuestion((prev)=>prev+1 );
        }else{
            setCurrentQuestion(0);
            setShowResult(true);
        }
        setTimeout(()=>{
            setShowAnswerLoader(true);

        });
    };
    const onTryAgain =()=>{
        setResult(resultInitialState);
        setShowResult(false);

    }
    const handelTimerUp=()=>{
        setAnswer(false);
        onclickNext(false)
    }
  return (

    <div className='container'>
        {!showResult?( 
        <>
        {showAnswerLoader &&  
      ( <AnswerTimer duration={5} onTimeUp={handelTimerUp}/>
    )}
       <span className='current-question'>{currentQuestion+1}</span>
       <span className='total-question'>/{questions.length}</span>
       <div className="questions">
        <h1>{question}</h1>
       </div>
       <div className="options">
      <ul>
        {
     choices.map((answer,index)=>{
   return(
    <li key={answer}
    
    onClick={()=>onAnswerClick(answer,index)}
    className={answerIndex===index?'selected-answer':null}
    
    >
        {answer}
    </li>

   )
     })
        }
      </ul>
       </div>
       
        <div className="footer">
                <button
                onClick={()=>onclickNext(answer)}
                disabled={answerIndex===null}
                >
                    {currentQuestion===questions.length-1?"FINISH":"NEXT"}
                </button>
        </div>
       
       </>
        ):<div className='result'>
        <h3>RESULT</h3>
        <p>Total Questions:<span>{questions.length}</span></p>
        <p>Total Score:<span>{result.score}</span></p>
        <p>Total Correct Answer:<span>{result.correctAnswers}</span></p>
        <p>Total Wrong Answer:<span>{result.wrongAnsewrs}</span></p>
        <button onClick={onTryAgain}>TRY AGAIN</button>
        </div>}
      
    </div>
  )
}
