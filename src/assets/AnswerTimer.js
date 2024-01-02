import React, { useEffect, useRef, useState } from 'react'
import "./answer.css"
export default function AnswerTimer({duration,onTimeUp}) {
const [counter,setCounter]=useState(0);
const [progressLoader,setProgressLoader]=useState(0);
const IntervalForRef=useRef(0)
  useEffect(()=>{
   IntervalForRef.current= setInterval(()=>{
     setCounter((item)=>item+1)
    },1000)
    return ()=>clearInterval(IntervalForRef.current)
  },[])
useEffect(()=>{
setProgressLoader(100*(counter/duration));
if(counter===duration){
    clearInterval(IntervalForRef.current);
    setTimeout(()=>{
            onTimeUp();
    },1000)
}
},[counter])
  return (
  <div className="answer-timer">
    <div 
    style={{
        width:`${progressLoader}%`,
        backgroundColor:`${
            progressLoader<40?'blue':progressLoader<70?'green':'red'
        }`
    }}
    className="progress"></div>
  </div>
  )
}
