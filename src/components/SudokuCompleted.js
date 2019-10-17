import React from "react";

export default (props)=>{
    return (
        <div id="sudokuCompleted">
            <div>
                <span>
                    <span role="img" aria-label="congratulations">&#127867;</span> 
                    Congratulations! You win! 
                    <span role="img" aria-label="congratulations">&#127867;</span>
                </span>
                <button className='newgame' onClick={()=>props.newGame()}>New game</button>
            </div>
        </div>
    );
}