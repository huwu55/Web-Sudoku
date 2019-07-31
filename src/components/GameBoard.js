import React from "react";
// import update from 'immutability-helper';
import sudokuGenerator from '../sudokuGenerator';
import Grid from "./Grid/Grid";



class GameBoard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            sudoku : [],
            lastActive : null
        };
    }

    componentDidMount(){
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

        console.log(sudoku);
        this.setState({sudoku});
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

    render(){
        return(
            <div id="gameboard">
                <table>
                    <tbody>
                        {this.state.sudoku.map((row, i)=>(
                            <tr key={i}>
                                {row.map((n)=>(
                                    <Grid n={n} toggleClass={this.toggleClass}/>
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