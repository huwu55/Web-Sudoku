import React from "react";

export default (props)=>{
    return (
        <div id='toolbar'>
            {props.candidateMode && 
                <button className='entryMode' onClick={()=>props.switchMode()}>Switch to Entry Mode</button>
            }
            {!props.candidateMode && 
                <button className='entryMode' onClick={()=>props.switchMode()}>Switch to Candidate Mode</button>
            }
            <button className='restart' onClick={()=>{props.restart()}}>Restart</button>
            {!props.revealed && 
                <button className='revealall' onClick={()=>props.revealAll()}>Reveal all</button>
            }
            {props.revealed &&
                <button className='back2answer' onClick={()=>props.backToYourAnswer()}>Go back to your answer</button>
            }
            <button className='newgame' onClick={()=>props.newGame()}>New game</button>
        </div>
    );
}