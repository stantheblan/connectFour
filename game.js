/**
 *  Making an empty array with the length 
 *  and width values provided below
 *
 */
function makeBoard() 
{
    for (let y = 0; y < tableHeight; y++) 
    {
        board.push(Array.from({ length: tableWidth }));
    }
}
 
/**
 *  Making the visual board visable on the DOM element by element
 *
 */
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

/**
 * Find where to place the piece
 *
 * @param {int} x
 * @return {value of smallest y} 
 */
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

/**
 *  Creates and places the piece on the table
 *
 * @param {int} x
 * @param {int} y
 */
function placeInTable(x, y) 
{
    let piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${cPlayer}`);
    piece.style.top = -50 * (y + 2);

    let cell = document.getElementById(`${y}-${x}`);
    cell.append(piece);
}


/**
 *  Handles the clicks
 *
 * @param {Click} e
 * @return {Possible winner} 
 */
function clickHandler(e) 
{
    if (!gameWon)
    {
        //change color of header
        if (cPlayer === 1) //blue
        {
            let x = document.getElementById("head1")
            x.style.color = "red"
        }
        if (cPlayer === 2) //red
        {
            let x = document.getElementById("head1")
            x.style.color = "blue"
        }
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
}

/**
 *  Checks for the directional win
 *
 * @return {bool} 
 */
function checkForWin() {
    for (let y = 0; y < tableHeight; y++) {
        for (let x = 0; x < tableWidth; x++) {
            //4 cells for each of the different directions starting at (0, 0)
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
    
            //find winner 
            if (inBoard(horiz) || inBoard(vert) || inBoard(diagDR) || inBoard(diagDL)) 
            {
                return true;
            }
        }
    }
}

/**
 *  Checks to see if the 4 possible winners are within the board bounds
 *
 * @param {*} cells
 * @return {bool} 
 */
function inBoard(cells) {
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
/**
 *  Reloads the page
 *
 */
function newGame()
{
    window.location.reload();
}
/**
 *  Ends the game and displays an alert
 *
 * @param {int} player
 */
function eGame(player)
{
    gameWon = true;
    alert("Player " + player + " wins;")
    console.log(board)
    //trying to get every cells bg to be grey after win
    // const arr = document.querySelectorAll(".test");
    // console.log(arr)
    // arr.forEach(e => {
    //     e.style.color = "grey"
    // });
}
/** @type {int} */
const tableWidth = 7;
/** @type {int} */
const tableHeight = 6;

/** @type {int} */
let cPlayer = 1;
/** @type {Array} */
let board = []; 
/** @type {bool} */
let gameWon = false;
makeBoard();
makeHtmlBoard();