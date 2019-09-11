import React from "react";
import Candidates from "./Candidates";

export default (props)=>{
    let cellstyle = 'cell';

    if(props.n.active)
        cellstyle+=' active';

    if(props.n.conflicts.length !== 0 && !props.revealed)
        cellstyle+=' conflict';

    if(props.n.prefilled || props.n.guess!==0 || props.revealed)
        cellstyle+=' digit';
    
    return(
        <td className={props.n.prefilled ? 'inactive' : ''} key={`${props.n.row}${props.n.column}`}>
            <div className={cellstyle} onClick={()=>props.toggleClass(props.n)}>
                {/* {props.n.prefilled && props.n.digit} */}
                {/* {!props.n.prefilled && props.n.guess!==0 && */}
                    <div className="entry">
                        {props.n.prefilled && props.n.digit}
                        {props.n.guess!==0 && !props.revealed && props.n.guess}
                        {!props.n.prefilled && props.revealed && props.n.digit}
                    </div>
                {/* } */}
                {/* {!props.n.prefilled && (props.n.guess === 0) && */}
                    <Candidates 
                        // gridPosition={`${props.n.row}${props.n.column}`}
                        guess={props.n.guess}
                        row={props.n.row}
                        column={props.n.column}
                        prefilled={props.n.prefilled}
                        // candidates={props.n.candidates}
                        display={props.n.guess === 0}
                        currentActive={props.currentActive}
                        candidateMode={props.candidateMode}
                        revealed={props.revealed}
                    />
                {/* } */}
            </div>
        </td>
    );
};