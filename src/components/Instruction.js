import React from "react";

export default (props) => {
    return (
        <div id='instruction'>
            <h3><u>Classic Sudoku Rules</u></h3>
            <p>
                There are 9 rows, 9 columns, and 9 3x3 blocks. 
                Fill in the empty cells with the numbers 1-9, without repeating any numbers within the row, column, or block.
            </p>
            <h3><u>How to Play</u></h3>
            <p>
                Click on each empty cell, enter digit with keyboard or number bar that's provided. 
                Use Backspace or Delete to clear entries.
            </p>
        </div>
    );
}