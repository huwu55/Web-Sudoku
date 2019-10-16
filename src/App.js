import React from "react";
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';
import "./style/style.css";
import './style/grid.css';


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
        <div id='app' className='wrapper'>
            <h1 id='sudokuTitle'>SUDOKU</h1>
            <GameBoard />
            <Footer/>
        </div>
    );
}