import React from "react";
import sudokuGenerator from '../sudokuGenerator';
import Grid from "./Grid/Grid";
import Instruction from './Instruction';
import InputOptions from './Grid/InputOptions';
import Toolbar from './Toolbar';
import SudokuCompleted from './SudokuCompleted';

class GameBoard extends React.Component{
    constructor(props){
        super(props);

        let solvedSudoku = sudokuGenerator();
        let sudoku = solvedSudoku.map((row, r)=>{
            return row.map((n, c)=>{
                return {
                    digit: n,
                    guess: 0,
                    // candidates: [],
                    prefilled: true,
                    conflicts: [],
                    active: false,
                    row: r,
                    column: c
                };
            });
        });

        let {sudoku_new, numPrefilled} = this.removeNumbers(sudoku);

        this.state = {
            sudoku: sudoku_new,
            //currentActive : null
            currentActive : {
                row: -1,
                column: -1
            },
            revealed: false,
            candidateMode: false,
            numPrefilled,
            numGuessed: 0,
            completed: false
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
        let num_prefilled = 81;

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(num_prefilled > 23 && Math.random() > (23/81)){
                    sudoku[i][j].prefilled = false;
                    num_prefilled--;
                }

                if(num_prefilled <= 17)
                    break;
            }
            if(num_prefilled <= 17)
                break;
        }

        return {sudoku_new: sudoku, numPrefilled: num_prefilled};
    }

    // for number pad, but now it's not available
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

        if((event.keyCode >= 49 && event.keyCode <= 57) || event.keyCode === 8 || event.keyCode === 46){
            let sudoku = [...this.state.sudoku];
            let inputNum = parseInt(String.fromCharCode(event.keyCode));
            let currentActiveCell = sudoku[this.state.currentActive.row][this.state.currentActive.column];
            let numGuessed = this.state.numGuessed;

            if(this.state.candidateMode){
                if(currentActiveCell.guess !== 0){
                    currentActiveCell.guess = 0;
                    numGuessed--;
                }
            }
            else{
                if(currentActiveCell.guess === inputNum)
                    return;

                if(event.keyCode === 8 || event.keyCode === 46){
                    if(currentActiveCell.guess !== 0){
                        currentActiveCell.guess = 0;
                        numGuessed--;
                    }
                }
                else {
                    currentActiveCell.guess = inputNum;
                    numGuessed++;
                }
            }

            sudoku[this.state.currentActive.row][this.state.currentActive.column] = currentActiveCell;
            this.setState({sudoku, numGuessed}, ()=> {
                let conflict = this.checkConflict();
                if(conflict)
                    return;

                if(this.state.numPrefilled+this.state.numGuessed === 81)
                    this.checkIfCompletedSudoku();
            });
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
        return currentGrid.conflicts.length === 0;
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

        // sudoku = this.removeNumbers(sudoku);
        let {sudoku_new, numPrefilled} = this.removeNumbers(sudoku);

        this.setState({
            sudoku: sudoku_new, 
            currentActive : {
                row: -1,
                column: -1
            },
            revealed: false,
            candidateMode: false,
            numPrefilled,
            numGuessed: 0,
            completed: false
        });
    }

    revealAll = ()=>{
        this.setState({revealed: true});
    }

    backToYourAnswer = ()=>{
        this.setState({revealed: false});
    }

    // restart = ()=>{
    //     let sudoku = [...this.state.sudoku];

    //     sudoku = sudoku.map(r=>{
    //         return r.map(n=>{
    //             n.conflicts = [];
    //             n.guess = 0;
    //             return n;
    //         });
    //     });
        
    //     this.setState({sudoku});
    // }

    switchMode = ()=> {
        let candidateMode = this.state.candidateMode;

        this.setState({candidateMode: !candidateMode});
    }

    checkIfCompletedSudoku = () => {
        let sudoku = this.state.sudoku;
        let completed = true;

        for(let r = 0; r < sudoku.length; r++){
            for(let c = 0; c < sudoku[r].length; c++){
                if(sudoku[r][c].guess !== sudoku[r][c].digit){
                    completed = false;
                    break;
                }
            }
            if (!completed)
                break;
        }
        
        this.setState({completed});
    }

    render(){
        return(
            <div id='game'>
                <Instruction />
                <Toolbar 
                    candidateMode={this.state.candidateMode}
                    switchMode={this.switchMode}
                    newGame={this.newGame} 
                    revealAll={this.revealAll} 
                    backToYourAnswer={this.backToYourAnswer}
                    revealed={this.state.revealed}
                    restart={this.restart}
                />
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
                                            candidateMode={this.state.candidateMode}
                                            currentActive={this.state.currentActive}
                                            // revealed={this.state.revealed}
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

                {this.state.completed && 
                    <SudokuCompleted newGame={this.newGame} />
                }
            </div>
        );
    }
}

export default GameBoard;