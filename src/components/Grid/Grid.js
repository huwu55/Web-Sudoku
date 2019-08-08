import React from "react";

// class Grid extends React.Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             active: false
//         };
//     }

//     toggleClass = ()=>{
//         const currentState = this.state.active;
//         this.setState({ active: !currentState });
//     }

//     render(){
//         return(
//             <td className={this.state.active ? 'grid active': 'grid'} onClick={this.toggleClass}>
//                 <div className='cell'>
//                     {this.props.n}
//                 </div>
//             </td>
//         );
//     }
// }

export default (props)=>{
    let cellstyle = 'cell';

    if(props.n.active)
        cellstyle+=' active';
    

    return(
        <td className={props.n.prefilled ? 'prefilled' : ''} key={`${props.n.row}${props.n.column}`}>
            <div className={cellstyle} onClick={()=>props.toggleClass(props.n)}>
                {props.n.prefilled && props.n.digit}
            </div>
        </td>
    );
};