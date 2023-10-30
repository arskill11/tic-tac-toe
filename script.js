function Player (playerName, marker) {
    const choice  = document.querySelector('.choose');

    return {playerName, marker}
}

const game =  (() => {

    

    const playerOne = Player('Player One', 'X');
    const playerTwo = Player('Player Two', 'O');

    let currentPlayer = playerOne;
    let freeCells = 9;
    let winnerClaimed = false;

    const winnigPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8],
    ];

    const winnerHeading = document.querySelector('.winHead');

    function checkWinner () {
        winnigPattern.forEach(pattern => {
            if (gameBoard.board[pattern[0]] === '' ||
                gameBoard.board[pattern[1]]  === '' ||
                gameBoard.board[pattern[2]]  === '' ) { 
                    return;
                }

            if (gameBoard.board[pattern[0]]  === this.currentPlayer.marker &&
                gameBoard.board[pattern[1]] === this.currentPlayer.marker &&
                gameBoard.board[pattern[2]]  === this.currentPlayer.marker) {
                    winnerHeading.textContent = `The winner is ${this.currentPlayer.playerName}`;
                    this.winnerClaimed = true;
                    markWinLine(pattern);
                }
        })
    }

    function markWinLine (pattern) {
        let ind;
        for (let i = 0; i < pattern.length; i++) {
            gameBoard.cells.forEach(elem => {
                ind = elem.getAttribute('data-ind');
                if (ind == pattern[i]) {
                    elem.style.background = '#90EE90';
                }
            })
        }
    }


    function botPlay () {

    }

    function switchPlayer () {
        this.currentPlayer === playerOne ? this.currentPlayer = playerTwo : this.currentPlayer = playerOne;
        gameBoard.player.textContent === '1st Player\'s turn' ? gameBoard.player.textContent = '2nd Player\s turn' : 
            gameBoard.player.textContent = '1st Player\'s turn';

        gameBoard.playerMark.textContent === 'marker: X' ? gameBoard.playerMark.textContent = 'marker: O': 
            gameBoard.playerMark.textContent = 'marker: X';
    }

    function claimTie () {
        winnerHeading.textContent = 'That\' a tie';
    }
    return {
        currentPlayer,
        freeCells,
        winnerClaimed,
        checkWinner,
        switchPlayer,
        claimTie,
    }
})();


const gameBoard = (() => {
    const gameField = document.querySelector('.field');
    const player = document.querySelector('.player');
    const playerMark = document.querySelector('.mark');
    player.textContent = '1st Player\'s turn';
    playerMark.textContent = 'marker: X';

    let board = [];
    for (let i = 0; i < 9; i++){
        board.push('');
    }

    /*board.forEach(elem => {
        console.log(elem.indexOf());
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-ind', 1);
        gameField.appendChild(cell);
    })*/

    for (let i = 0; i < board.length; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-ind', i);
        gameField.appendChild(cell);

    }

    let cells = document.querySelectorAll('.cell');
    

    for (let i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', function onClick () {
            cells[i].textContent = game.currentPlayer.marker;
            board[i] = game.currentPlayer.marker;
            game.freeCells--;
            
            cells[i].removeEventListener('click', onClick);
            game.checkWinner();
            console.log(game.winnerClaimed);

            if (game.winnerClaimed){
                game.currentPlayer.marker = '';
                
            }

            if (!game.winnerClaimed) {
                if (game.freeCells > 0){
                    game.switchPlayer();
                }
                else if (game.freeCells == 0){
                    game.claimTie();
                }    
            }
            console.log(board);
        })
    }
    return { player, playerMark, cells, board };
})();


/*const game =  (() => {
    const playerOne = Player('Player One', 'X');
    const playerTwo = Player('Player Two', 'O');

    let currentPlayer = playerOne;
    let freeCells = 9;
    let winnerClaimed = false;

    const winnigPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8],
    ];

    const winnerHeading = document.querySelector('.winHead');

    function checkWinner () {
        winnigPattern.forEach(pattern => {
            if (gameBoard.board[pattern[0]] === '' ||
                gameBoard.board[pattern[1]]  === '' ||
                gameBoard.board[pattern[2]]  === '' ) { 
                    return;
                }

            if (gameBoard.board[pattern[0]]  === this.currentPlayer.marker &&
                gameBoard.board[pattern[1]] === this.currentPlayer.marker &&
                gameBoard.board[pattern[2]]  === this.currentPlayer.marker) {
                    winnerHeading.textContent = `The winner is ${this.currentPlayer.playerName}`;
                    this.winnerClaimed = true;
                    
                }
        })
    }

    function botPlay () {

    }

    function switchPlayer () {
        this.currentPlayer === playerOne ? this.currentPlayer = playerTwo : this.currentPlayer = playerOne;
        gameBoard.player.textContent === '1st Player\'s turn' ? gameBoard.player.textContent = '2nd Player\s turn' : 
            gameBoard.player.textContent = '1st Player\'s turn';

        gameBoard.playerMark.textContent === 'marker: X' ? gameBoard.playerMark.textContent = 'marker: O': 
            gameBoard.playerMark.textContent = 'marker: X';
    }

    function claimTie () {
        winnerHeading.textContent = 'That\' a tie';
    }
    return {
        currentPlayer,
        freeCells,
        winnerClaimed,
        checkWinner,
        switchPlayer,
        claimTie,
    }
})();*/

