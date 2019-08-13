import React from "react";
import sudokuGenerator from '../sudokuGenerator';
import Grid from "./Grid/Grid";
import InputOptions from './Grid/InputOptions';
import Toolbar from './Toolbar';

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
                    conflicts: [],
                    active: false,
                    row: r,
                    column: c
                };
            });
        });

        sudoku = this.removeNumbers(sudoku);

        this.state = {
            sudoku,
            //currentActive : null
            currentActive : {
                row: -1,
                column: -1
            },
            revealed: false
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

        if(this.state.currentActive.row === -1){
            this.setState({
                currentActive: {row: cell.row, column: cell.column},
                sudoku
            });
        }
        else if(cell.row === this.state.currentActive.row && cell.column === this.state.currentActive.column)
            return;
        else{
            sudoku[this.state.currentActive.row][this.state.currentActive.column].active = false;
            this.setState({
                currentActive: {row: cell.row, column: cell.column},
                sudoku
            });
        }
    }

    removeNumbers = (sudoku) => {
        // .21
        let num_prefilled = 81;

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(num_prefilled > 22 && Math.random() > (22/81)){
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
        if(this.state.currentActive.row === -1 || this.state.revealed)
            return;

        let sudoku = [...this.state.sudoku];

        if(sudoku[this.state.currentActive.row][this.state.currentActive.column].guess === inputNum)
            return;

        sudoku[this.state.currentActive.row][this.state.currentActive.column].guess = inputNum;

        this.setState({sudoku}, ()=>this.checkConflict());
    }

    handleInputKeyPress = (event)=>{
        if(this.state.currentActive.row === -1 || this.state.revealed)
            return;

        if(event.keyCode >= 49 && event.keyCode <= 57){
            let sudoku = [...this.state.sudoku];
            let inputNum = parseInt(String.fromCharCode(event.keyCode));

            if(sudoku[this.state.currentActive.row][this.state.currentActive.column].guess === inputNum)
                return;

            sudoku[this.state.currentActive.row][this.state.currentActive.column].guess = inputNum;
            this.setState({sudoku}, ()=>this.checkConflict());
        }
    }

    updateConflicts = (sudoku, currentActive, currentGrid) => {
        for(let i = 0; i < currentGrid.conflicts.length; i++){
            let conflictPosition = {...currentGrid.conflicts[i]};
            let conflictList = [...sudoku[conflictPosition.row][conflictPosition.column].conflicts];

            for(let j = 0; j < conflictList.length; j++){
                if(conflictList[j].row === currentActive.row && 
                    conflictList[j].column === currentActive.column){
                        conflictList.splice(j,1);
                        sudoku[conflictPosition.row][conflictPosition.column].conflicts = [...conflictList];
                        break;
                }
            }
        }

        return sudoku;
    }

    checkRowConflicts = (sudoku, currentActive, currentGrid) => {
        for(let c = 0; c < 9; c++){
            if(c === currentActive.column)
                continue;

            if((sudoku[currentActive.row][c].prefilled && sudoku[currentActive.row][c].digit === currentGrid.guess) || 
                (!sudoku[currentActive.row][c].prefilled && sudoku[currentActive.row][c].guess === currentGrid.guess)){
                    currentGrid.conflicts.push({row:currentActive.row, column:c});
                    sudoku[currentActive.row][c].conflicts.push(currentActive);
                }
        }

        return {sudoku, currentGrid};
    }

    checkColumnConflicts = (sudoku, currentActive, currentGrid) => {
        for(let r = 0; r < 9; r++){
            if(r === currentActive.row)
                continue;

            if((sudoku[r][currentActive.column].prefilled && 
                sudoku[r][currentActive.column].digit === currentGrid.guess) || 
                (!sudoku[r][currentActive.column].prefilled &&
                    sudoku[r][currentActive.column].guess === currentGrid.guess)){
                    currentGrid.conflicts.push({row: r, column:currentActive.column});
                    sudoku[r][currentActive.column].conflicts.push(currentActive);
                }
        }

        return {sudoku, currentGrid};
    }

    checkNonetConflicts = (sudoku, currentActive, currentGrid) => {
        let startRow, startColumn;

        switch (currentActive.row % 3){
            case 0:
                startRow = currentActive.row;
                break;
            case 1:
                startRow = currentActive.row - 1;
                break;
            case 2:
                startRow = currentActive.row - 2;
                break;
            default:
                startRow = -1;
                break;
        }

        switch (currentActive.column % 3){
            case 0:
                startColumn = currentActive.column;
                break;
            case 1:
                startColumn = currentActive.column - 1;
                break;
            case 2:
                startColumn = currentActive.column - 2;
                break;
            default:
                startColumn = -1;
                break;
        }

        for(let r = 0; r < 3; r++){
            for(let c = 0; c < 3; c++){
                let row = startRow + r;
                let column = startColumn + c;
                if(row === currentActive.row || column === currentActive.column)
                    continue;

                if((sudoku[row][column].prefilled && 
                    sudoku[row][column].digit === currentGrid.guess) || 
                    (!sudoku[row][column].prefilled &&
                        sudoku[row][column].guess === currentGrid.guess)){
                        currentGrid.conflicts.push({row, column});
                        sudoku[row][column].conflicts.push(currentActive);
                    }
            }
        }

        return {sudoku, currentGrid};
    }

    checkConflict = ()=>{
        let sudoku = [...this.state.sudoku];
        let currentActive = {...this.state.currentActive};
        let currentGrid = {...sudoku[currentActive.row][currentActive.column]};

        sudoku = this.updateConflicts(sudoku, currentActive, currentGrid);

        // reset conflicts for new input
        currentGrid.conflicts = [];

        //row
        ({sudoku, currentGrid} = this.checkRowConflicts(sudoku, currentActive, currentGrid));

        //column
        ({sudoku, currentGrid} = this.checkColumnConflicts(sudoku, currentActive, currentGrid));

        //nonet
        ({sudoku, currentGrid} = this.checkNonetConflicts(sudoku, currentActive, currentGrid));

        sudoku[currentActive.row][currentActive.column] = {...currentGrid};
        this.setState({sudoku});
    }

    newGame = ()=>{
        let solvedSudoku = sudokuGenerator();
        let sudoku = solvedSudoku.map((row, r)=>{
            return row.map((n, c)=>{
                return {
                    digit: n,
                    guess: 0,
                    prefilled: true,
                    conflicts: [],
                    active: false,
                    row: r,
                    column: c
                };
            });
        });

        sudoku = this.removeNumbers(sudoku);

        this.setState({
            sudoku, 
            currentActive : {
                row: -1,
                column: -1
            },
            revealed: false
        });
    }

    revealAll = ()=>{
        // let sudoku = [...this.state.sudoku];

        // sudoku = sudoku.map(r=>{
        //     return r.map(n=>{
        //         n.conflicts = [];
        //         return n;
        //     });
        // });

        this.setState({revealed: true});
    }

    backToYourAnswer = ()=>{
        this.setState({revealed: false});
    }

    render(){
        return(
            <div id='game'>
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
                                            revealed={this.state.revealed}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <InputOptions 
                        guess={this.state.currentActive.row!==-1 ? 
                            this.state.sudoku[this.state.currentActive.row][this.state.currentActive.column].guess : 0}
                        currentActive={this.state.currentActive} 
                        handleInputNum={this.handleInputNumClick}
                        revealed={this.state.revealed}
                    />
                </div>
                <Toolbar 
                    newGame={this.newGame} 
                    revealAll={this.revealAll} 
                    backToYourAnswer={this.backToYourAnswer}
                    revealed={this.state.revealed}
                />
            </div>
        );
    }
}

export default GameBoard;