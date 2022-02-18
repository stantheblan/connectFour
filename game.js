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
        headCell.setAttribute('class', 'test');
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
            cell.setAttribute('class', `test`);
            row.append(cell);
        }
        board.append(row);
    }

    // //make reset button
    // const rButton = document.createElement("button");
    // rButton.setAttribute('class', 'resett');
    // let t = document.createTextNode("Resettttt");
    // rButton.appendChild(t);
    
    // board.append(rButton)
}

function findCellforCol(x) 
{
    for (let y = tableHeight - 1; y >= 0; y--) 
    {
        //if not empty then drop in
        if (!board[y][x]) 
        {
            return y;
        }
    }
    return null;
}

function placeInTable(x, y) 
{
    let piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${cPlayer}`);
    piece.style.top = -50 * (y + 2);

    let cell = document.getElementById(`${y}-${x}`);
    cell.append(piece);
}

function boardReset()
{
    board.forEach(e => {
        e = null;
    });
}

function clickHandler(e) 
{
    //get x from id of clicked cell
    const x = e.target.id;

    //get next spot in column, ignore if none
    let y = findCellforCol(x);
    if (y === null) {return;}

    //place piece in board and add to HTML table
    board[y][x] = cPlayer;
    placeInTable(x, y);
    
    // check win
    if (checkForWin()) 
    {
        return eGame(cPlayer);
    }
    
    // check tie
    if (board.every(row => row.every(cell => cell))) 
    {
        return eGame('Tie!');
    }
    //switch player
    cPlayer = cPlayer === 1 ? 2 : 1;
}

function checkForWin() {
    for (let y = 0; y < tableHeight; y++) {
        for (let x = 0; x < tableWidth; x++) {
            //4 cells for each of the different directions starting at 0, 0
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
            //find winner 
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) 
            {
                return true;
            }
        }
    }
}

function _win(cells) {
    //check four cells to see if they're all color of current player
    //cells: list of four (y, x) cells
    //returns true if all coordinates are on board & all equal cPlayer
      return cells.every(
          ([y, x]) =>
              y >= 0 &&
              y < tableHeight &&
              x >= 0 &&
              x < tableWidth &&
              board[y][x] === cPlayer
          );
  }

function eGame(player)
{
    alert("Player " + player + " wins;")
    console.log("Player " + player + " wins;")
    console.log(board)
    boardReset()
    console.log(board)

    //trying to get every cells bg to be grey after win
    // const arr = document.querySelectorAll(".test");
    // console.log(arr)
    // arr.forEach(e => {
    //     e.style.color = "grey"
    // });
}

const tableWidth = 7;
const tableHeight = 6;

let cPlayer = 1;
let board = []; 

makeBoard();
makeHtmlBoard();