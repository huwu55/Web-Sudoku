import React from "react";
// import sudokuGenerator from './sudokuGenerator';
import GameBoard from './components/GameBoard';
import Instruction from './components/Instruction';
// import Toolbar from './components/Toolbar';
import "./style/style.css";


// class Sudoku extends React.Component {
//     constructor(){
//         super();

//         // let solvedSudoku = sudokuGenerator();

//         // this.state = {
//         //     solvedSudoku,
//         //     revealAll: false
//         // }
//     }

//     // newGame = ()=>{
//     //     // console.log("hello");
//     //     let solvedSudoku = sudokuGenerator();
//     //     this.setState({solvedSudoku});
//     //     console.log(solvedSudoku);
//     // }

//     // revealAll = ()=>{}

//     render(){
//         return(
//             <div id='app'>
//                 <Instruction />
//                 <GameBoard />
//                 {/* <Toolbar newGame={this.newGame} /> */}
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