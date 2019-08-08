import React from "react";
import sudokuGenerator from '../sudokuGenerator';
import Grid from "./Grid/Grid";



class GameBoard extends React.Component{
    constructor(props){
        super(props);

        let solvedSudoku = sudokuGenerator();
        let sudoku = solvedSudoku.map((row, r)=>{
            return row.map((n, c)=>{
                return {
                    digit: n,
                    guess: 0,
                    prefilled: true,
                    contradict: false,
                    active: false,
                    row: r,
                    column: c
                };
            });
        });

        sudoku = this.removeNumbers(sudoku);

        this.state = {
            sudoku,
            lastActive : null
        };
    }

    toggleClass = (cell) =>{
        if(cell.prefilled)
            return;

        let sudoku = [...this.state.sudoku];
        sudoku[cell.row][cell.column].active = true;

        if(this.state.lastActive === null){
            this.setState({
                lastActive: [cell.row, cell.column],
                sudoku
            });
        }
        else if(cell.row === this.state.lastActive[0] && cell.column === this.state.lastActive[1])
            return;
        else{
            sudoku[this.state.lastActive[0]][this.state.lastActive[1]].active = false;
            this.setState({
                lastActive: [cell.row, cell.column],
                sudoku
            });
        }
    }

    removeNumbers = (sudoku) => {
        // .21
        let num_prefilled = 81;

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(num_prefilled > 17 && Math.random() > 0.21){
                    sudoku[i][j].prefilled = false;
                    num_prefilled--;
                }

                if(num_prefilled <= 17)
                    break;
            }
            if(num_prefilled <= 17)
                break;
        }

        return sudoku;
    }

    render(){
        return(
            <div id="gameboard">
                <table>
                    <tbody>
                        {this.state.sudoku.map((row, i)=>(
                            <tr key={i}>
                                {row.map((n)=>(
                                    <Grid key={`${n.row}${n.column}`} n={n} toggleClass={this.toggleClass}/>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameBoard;