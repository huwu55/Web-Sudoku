import React from "react";

export default (props) => {
    return (
        <div id='instruction'>
            <h3>Classic Sudoku Rules</h3>
            <p>
                There are 9 rows, 9 columns, and 9 blocks. 
                Fill in the empty cells with the numbers 1-9, without repeating any numbers within the row, column, or block.
            </p>
        </div>
    );
}