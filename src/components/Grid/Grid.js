import React from "react";

export default (props)=>{
    let cellstyle = 'cell';

    if(props.n.active)
        cellstyle+=' active';
    
    return(
        <td className={props.n.prefilled ? 'inactive' : ''} key={`${props.n.row}${props.n.column}`}>
            <div className={cellstyle} onClick={()=>props.toggleClass(props.n)}>
                {props.n.prefilled && props.n.digit}
                {props.n.guess!==0 && props.n.guess}
            </div>
        </td>
    );
};