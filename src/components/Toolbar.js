import React from "react";

export default (props)=>{
    return (
        <div id='toolbar'>
            <button onClick={()=>props.newGame()}>New Game</button>
            <button onClick={()=>props.revealAll()}>Reveal All</button>
        </div>
    );
}