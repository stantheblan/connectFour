function makeBoard() 
{
    for (let y = 0; y < tableHeight; y++) 
    {
        board.push(Array.from({ length: tableWidth }));
    }
}
 
function makeHtmlBoard() 
{
    const board = document.getElementById('board');
    
    // make top row 
    const topR = document.createElement('tr');
    topR.setAttribute('id', 'column-top');
    topR.addEventListener('click', clickHandler);
    for (let x = 0; x < tableWidth; x++) 
    {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        topR.append(headCell);
    }
    board.append(topR);

    // make main part of board
    for (let y = 0; y < tableHeight; y++) 
    {
        const row = document.createElement('tr');
        for (let x = 0; x < tableWidth; x++) 
        {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
        }
        board.append(row);
    }
}

function findCellforCol(x) 
{
    for (let y = tableHeight - 1; y >= 0; y--) 
    {
        if (!board[y][x]) 
        {
            return y;
        }
    }
    return null;
}

function placeInTable(y, x) 
{
    let piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);

    let cell = document.getElementById(`${y}-${x}`);
    cell.append(piece);
}

function clickHandler(e) {
    //get x from id of clicked cell
    const x = e.target.id;

    //get next spot in column, ignore if none
    let y = findCellforCol(x);
    if (y === null) {return;}

    //place piece in board and add to HTML table
    board[y][x] = currPlayer;
    placeInTable(y, x);

    //switch
    currPlayer = currPlayer === 1 ? 2 : 1;
}

const tableWidth = 7;
const tableHeight = 6;

let currPlayer = 1;
let board = []; 

makeBoard();
makeHtmlBoard();