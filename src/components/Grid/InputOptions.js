import React from "react";

export default (props) => {
    let inputNumClass = 'inputNum';

    if(props.currentActive.row === -1)
        inputNumClass += " inactive";

    let inputNums = [1,2,3,4,5,6,7,8,9];
    
    return (
        <div id="inputOptions">
            {inputNums.map(n=>(
                <div key={n} 
                    className={props.guess===n ? `${inputNumClass} entered` : inputNumClass} 
                    onClick={()=>props.handleInputNum(n)}>
                    {n}
                </div>
            ))}
        </div>
    );
}
