import React from "react";
// import sudokuGenerator from './sudokuGenerator';
import GameBoard from './components/GameBoard';
import Instruction from './components/Instruction';
import "./style/style.css";


// class Sudoku extends React.Component {
//     constructor(){
//         super();

//         // this.state = {
//         //     sudoku : []
//         // }
//     }

//     //componentDidMount(){
//     //     let sudoku = sudokuGenerator();
//     //     this.setState({sudoku});
//     //     console.log(this);
//     // }

//     render(){
//         return(
//             <div>
//                 <GameBoard />
//             </div>
//         );
//     }

// }

// export default Sudoku;

export default ()=>{
    return (
        <div id='app'>
            <Instruction />
            <GameBoard />
        </div>
    );
}