import React from "react";

export default (props)=>{
    return (
        <div id='toolbar'>
            {props.candidateMode && 
                <div className='entryMode' title='Switch to Entry Mode' onClick={()=>props.switchMode()}>
                    <i className="material-icons">looks_one</i>
                    <div>Switch to Entry Mode</div>
                </div>
            }
            {!props.candidateMode && 
                <div className='entryMode' title='Switch to Candidate Mode' onClick={()=>props.switchMode()}>
                    <i className="material-icons">grid_on</i>
                    <div>
                        Switch to Candidate Mode
                    </div>
                </div>
            }
            {/* <button className='restart' onClick={()=>{props.restart()}}>Restart</button> */}
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