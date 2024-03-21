import { useState,useRef } from "react";
import ResultModal from "./ResultModal";
// let timer;
export default function TimerChallenge({title,targetTime})
{
    const timer=useRef();
    const dialog=useRef();
    // const [timerStarted,setTimerStarted]=useState(false);
    // const [timerExpired,setTimerExpired]=useState(false);
    const [timeRemaining,setTimeRemaining]=useState(targetTime*1000);

    const timerActive=timeRemaining>0 && timeRemaining<targetTime*1000;

    if(timeRemaining<=0 )
    {
        clearInterval(timer.current);
        dialog.current.open();
    }
    function handleReset()
    {
        setTimeRemaining(targetTime*1000);
    }
    // let timer;
    function handleStart(){
       
        timer.current=setInterval(()=>{
           setTimeRemaining(prevTime=>prevTime-10); 
        },10);
        
    }
    function handleStop()
    {
        dialog.current.open();
        clearInterval(timer.current);
        
    }
    return(
        <>
    <ResultModal onReset={handleReset} ref={dialog} targetTime={targetTime} result={timeRemaining}/>
        <section className="challenge">
            <h2>{title}</h2>
            {!timerActive && <p>You lost!</p>}
            <p className="challenge-time">{targetTime} second{targetTime>1?"s":" "}</p>
            <p>
                <button onClick={timerActive?handleStop:handleStart}>
                    {timerActive?"Stop":"Start"} Challenge
                </button>
            </p>
            <p className={timerActive?'active':undefined}>
                {timerActive?"Time is runing..":"Time inactive"} 
            </p>
        </section>
        </>
    )
}