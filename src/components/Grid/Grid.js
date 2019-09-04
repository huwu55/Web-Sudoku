import React from "react";
import Candidates from "./Candidates";

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
                {!props.candidateMode && 
                    <div className="entry">
                        {props.n.guess!==0 && !props.revealed && props.n.guess}
                        {!props.n.prefilled && props.revealed && props.n.digit}
                    </div>
                }
                {props.candidateMode && 
                    <Candidates 
                        gridPosition={`${props.n.row}${props.n.column}`}
                        prefilled={props.n.prefilled}
                    />
                }
            </div>
        </td>
    );
};