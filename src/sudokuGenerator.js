function generateSeed(){
    let n = [1,2,3,4,5,6,7,8,9];
    let seed = [];

    while(n.length > 1){
        let index = Math.floor(Math.random()*n.length);
        seed.push(n[index]);
        n.splice(index, 1);
    }

    seed.push(n[0]);

    return seed;
}

function generateThreeRows(seed){
    let result = [seed];
    for(let i = 0; i < 2; i++){
        let currentRow = result[result.length - 1];
        let row = [];

        for(let j = 0; j < 9; j = j+3){
            if(j <= 5){
                row.push(currentRow[j + 3]);
                row.push(currentRow[j + 4]);
                row.push(currentRow[j + 5]);
            }
            else{
                row.push(currentRow[0]);
                row.push(currentRow[1]);
                row.push(currentRow[2]);
            }
        }
        result.push(row);
    }

    return result;
}

function generateMatrix(){
    let seed = generateSeed();    
    let matrix = [];

    let lastSeed = [...seed];
    let currentSeed = [...seed];
    for(let i = 0; i < 3; i++){
        if(i > 0){
            let temp = [...lastSeed];
            temp.shift();
            currentSeed = [...temp, lastSeed[0]];
        }

        let section = generateThreeRows(currentSeed);
        matrix.push(section[0], section[1], section[2]);
        lastSeed = [...currentSeed];
    }

    return matrix;
}

function mixRows(m){
    let result = [];
    let orders = [
        [0,1,2],
        [0,2,1],
        [1,0,2],
        [1,2,0],
        [2,0,1],
        [2,1,0]
    ];

    for(let i = 0; i < 9; i+=3){
        let randomOrder = orders[Math.floor(Math.random()*orders.length)];

        result.push(m[i + randomOrder[0]]);
        result.push(m[i + randomOrder[1]]);
        result.push(m[i + randomOrder[2]]);
    }

    return result;
}

function flipMatrix(m){
    let result = [];
    for(let i = 0; i < 9; i++){
        let row = [];

        for(let j = 0; j < 9; j++){
            row.push(m[j][i]);
        }
        result.push(row);
    }

    return result;
}

function generateSolvedSudoku(){
    let matrix = generateMatrix();
    // console.log("Original Matrix:\n",matrix);

    matrix = mixRows(matrix);
    // console.log("Mixed Rows Matrix:\n",matrix);

    matrix = flipMatrix(matrix);
    // console.log("Flipped Matrix:\n",matrix);

    matrix = mixRows(matrix);
    // console.log("Mixed Rows Again Matrix:\n",matrix);

    return matrix;
}

export default generateSolvedSudoku;
