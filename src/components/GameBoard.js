import React from "react";
import sudokuGenerator from '../sudokuGenerator';
import Grid from "./Grid/Grid";
import InputOptions from './Grid/InputOptions';


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
            currentActive : null
        };
    }

    componentDidMount(){
        document.addEventListener('keydown', this.handleInputKeyPress);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleInputKeyPress);
    }

    toggleClass = (cell) =>{
        if(cell.prefilled)
            return;

        let sudoku = [...this.state.sudoku];
        sudoku[cell.row][cell.column].active = true;

        if(this.state.currentActive === null){
            this.setState({
                currentActive: [cell.row, cell.column],
                sudoku
            });
        }
        else if(cell.row === this.state.currentActive[0] && cell.column === this.state.currentActive[1])
            return;
        else{
            sudoku[this.state.currentActive[0]][this.state.currentActive[1]].active = false;
            this.setState({
                currentActive: [cell.row, cell.column],
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

    handleInputNumClick = (inputNum) => {
        if(this.state.currentActive === null)
            return;

        let sudoku = [...this.state.sudoku];

        sudoku[this.state.currentActive[0]][this.state.currentActive[1]].guess = inputNum;

        this.setState({sudoku});
    }

    handleInputKeyPress = (event)=>{
        if(this.state.currentActive === null)
            return;

        if(event.keyCode >= 49 && event.keyCode <= 57){
            let sudoku = [...this.state.sudoku];
            sudoku[this.state.currentActive[0]][this.state.currentActive[1]].guess = parseInt(String.fromCharCode(event.keyCode));
            this.setState({sudoku});
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
                                    <Grid 
                                        key={`${n.row}${n.column}`} 
                                        n={n} 
                                        toggleClass={this.toggleClass}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <InputOptions 
                    guess={this.state.currentActive!==null && 
                        this.state.sudoku[this.state.currentActive[0]][this.state.currentActive[1]].guess}
                    currentActive={this.state.currentActive} 
                    handleInputNum={this.handleInputNumClick}
                />
            </div>
        );
    }
}

export default GameBoard;