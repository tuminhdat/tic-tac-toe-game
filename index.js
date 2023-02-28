const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currnetPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => {
        cell.addEventListener("click", cellClicked);
    });
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currnetPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currnetPlayer;
    cell.textContent = currnetPlayer;
}

function changePlayer(){
    currnetPlayer = (currnetPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currnetPlayer}'s turn`;
    console.log(currnetPlayer);
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i <winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if (cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        statusText.textContent = `${currnetPlayer} WIN!`;
        running = false;
    } else if (!options.includes("")){
        statusText.textContent = `DRAW!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame(){
    currnetPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currnetPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}