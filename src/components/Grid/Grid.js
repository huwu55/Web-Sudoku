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
    let cellstyle = 'grid';

    if(props.n.active)
        cellstyle+=' active';
    
    if(props.n.prefilled)
        cellstyle+=' prefilled';

    return(
        <td className={cellstyle} onClick={()=>props.toggleClass(props.n)}>
            <div className='cell'>
                {props.n.digit}
            </div>
        </td>
    );
};