const startButton = document.querySelector('#startButton');
const cells = document.querySelectorAll('.cell');
const title = document.querySelector('.title');
const currentPlayerText = document.querySelector('.currentPlayer')

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

let gameActive = false; //variable to track if the game has starter
let currentPlayer = 1; //starts with player 1 by default
let winner;

let board = [ //board matrix with all values set to 0, empty
    0,0,0,
    0,0,0,
    0,0,0
];

startButton.addEventListener('click', () => { //on click
    gameActive = true; //the game becomes active

    for(let i = 0; i < 9; i++){
        board[i] = 0;
    }
    cells.forEach(cell => cell.textContent = '');

    currentPlayerText.textContent = `Current Player: ${currentPlayer}`; //text

    startButton.textContent = "Playing"; //the button displays the text playing
    startButton.disabled = true; //the button cannot be clicked again

    currentPlayerText.classList.remove('hidden'); 
    title.classList.add('hidden');
} )

cells.forEach((cells, index) => {
    cells.addEventListener('click', () =>{
        if(!gameActive){
            return;
        } //
        
        if(board[index] === 0){
            board[index] = currentPlayer;
            cells.textContent = currentPlayer === 1 ? 'X' : 'O'

            let someoneWon = false;

            for (let i = 0; i < winningCombinations.length; i++) {
                const [a, b, c] = winningCombinations[i];
    
                // Controlla se le tre celle hanno lo stesso valore e NON sono vuote (0)
                if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
                    someoneWon = true;
                    winner = board[a]; 
                    break;
                }
            }

            if (someoneWon) {
                currentPlayerText.textContent = `Winner: Player ${winner === 1 ? '1' : '2'}`;
                gameActive = false;
                
                startButton.textContent = 'Start Game';
                startButton.disabled = false;
                return;

            }else{
                let allFull = true;
                for(let i=0; i<9; i++){
                    if(board[i] === 0){
                        allFull = false;
                        break;
                    }
                }
                if(allFull === true && someoneWon === false){
                    currentPlayerText.textContent = `It's a tie!`;
                    gameActive = false;
                
                    startButton.textContent = 'Start Game';
                    startButton.disabled = false;
                    return;
                }
            } 

            if(currentPlayer === 1){
                currentPlayer = 2;
            }else{
             currentPlayer = 1;
            } 
            
            currentPlayerText.textContent = `Current Player: ${currentPlayer}`;
        }
    })
})