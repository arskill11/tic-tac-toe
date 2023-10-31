function Player (playerName, marker) {
    return {playerName, marker}
}

const game = (() => {
    const winnerHeading = document.querySelector('.winHead');
    const player = document.querySelector('.player');
    const playerMark = document.querySelector('.mark');

    let playerOne;
    let playerTwo;
    let currentPlayer;
    let freeCells;
    let winnerClaimed;

    function start () {
        playerOne = Player ('Player One', 'X');
        playerTwo = Player ('Player Two', 'O');

        currentPlayer = playerOne;
        freeCells = 9;
        winnerClaimed = false;

        gameBoard.render();
    }

    function restart() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i] = '';
        }

        while(gameBoard.gameField.hasChildNodes()){
            gameBoard.gameField.removeChild(gameBoard.gameField.lastChild);
        }    

        start();
    }

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

    function checkWinner () {
        winnigPattern.forEach(pattern => {
            if (gameBoard.board[pattern[0]] === '' ||
                gameBoard.board[pattern[1]]  === '' ||
                gameBoard.board[pattern[2]]  === '' ) { 
                    return;
                }

            if (gameBoard.board[pattern[0]]  === currentPlayer.marker &&
                gameBoard.board[pattern[1]] === currentPlayer.marker &&
                gameBoard.board[pattern[2]]  === currentPlayer.marker) {
                    winnerHeading.textContent = `The winner is ${currentPlayer.playerName}`;
                    winnerClaimed = true;
                    markWinLine(pattern);
                }
        })
    }

    function markWinLine (pattern) {
        let ind;
        let cells = document.querySelectorAll('.cell');
        for (let i = 0; i < pattern.length; i++) {
            cells.forEach(elem => {
                ind = elem.getAttribute('data-ind');
                if (ind == pattern[i]) {
                    elem.style.background = '#90EE90';
                }
            })
        }
    }

    function switchPlayer () {
        currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
        player.textContent = `${currentPlayer.playerName}, it's your turn!`;
        playerMark.textContent = `Your mark: ${currentPlayer.marker}`;
    }

    function claimTie () {
        winnerHeading.textContent = 'That\' a tie';
        winnerClaimed = true;
    }

    function handleCLick(event) {
        let ind = event.target.getAttribute('data-ind');

        event.target.textContent = currentPlayer.marker;
        gameBoard.board[ind] = currentPlayer.marker;
        freeCells--;

        event.target.removeEventListener('click', handleCLick);
        checkWinner();

        if (winnerClaimed){
            currentPlayer.marker = '';
        }

        if (!winnerClaimed) {
            if (freeCells > 0){
                switchPlayer();
            }
            else if (freeCells == 0){
                claimTie();
            }    
        }
    }

    return {
        checkWinner,
        switchPlayer,
        claimTie,
        start,
        currentPlayer,
        freeCells,
        winnerClaimed,
        handleCLick,
        restart,
    }
})();


const gameBoard = (() => {
    const gameField = document.querySelector('.field');

    let board = [];
    for (let i = 0; i < 9; i++){
        board.push('');
    }

    function render() {
    
        board.forEach((cell, index) => {
            cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-ind', index);
            gameField.appendChild(cell);
        })

        const cells = document.querySelectorAll('.cell');
    
        cells.forEach(cell => {
            cell.addEventListener('click', game.handleCLick);
        })
    }

    return {
        board,
        render,
        gameField,
    };
})();


const btnStart = document.querySelector('.hi');
btnStart.addEventListener('click', handleStart);
function handleStart (e) {
    game.start();
    e.target.removeEventListener('click', handleStart);
}

const btnRestart = document.querySelector('.rr')
    .addEventListener('click', () => {
        game.restart();
})


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

