import React from "react";

export default (props)=>{
    return (
        <div id='toolbar'>
            <button onClick={()=>props.newGame()}>New Game</button>
            {!props.revealed && 
                <button onClick={()=>props.revealAll()}>Reveal All</button>
            }
            {props.revealed &&
                <button onClick={()=>props.backToYourAnswer()}>Go back to your answer</button>
            }
        </div>
    );
}