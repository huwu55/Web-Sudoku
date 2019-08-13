import React from "react";

export default (props)=>{
    let cellstyle = 'cell';

    if(props.n.active)
        cellstyle+=' active';

    if(props.n.conflicts.length !== 0 && !props.revealed)
        cellstyle+=' conflict';
    
    return(
        <td className={props.n.prefilled ? 'inactive' : ''} key={`${props.n.row}${props.n.column}`}>
            <div className={cellstyle} onClick={()=>props.toggleClass(props.n)}>
                {props.n.prefilled && props.n.digit}
                {props.n.guess!==0 && !props.revealed && props.n.guess}
                {!props.n.prefilled && props.revealed && props.n.digit}
            </div>
        </td>
    );
};