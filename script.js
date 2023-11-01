function Player (playerName, marker) {
    return {playerName, marker}
}

const game = (() => {
    const clickToStart = document.createElement('div');
    const container = document.querySelector('.container');
    const playerOneName = document.querySelector('.playerOneName');
    const playerTwoName = document.querySelector('.playerTwoName');
    const inputNameOne = document.querySelector('#nameOne');
    const inputNameTwo = document.querySelector('#nameTwo');
    const dialog = document.querySelector('.dialog');
    const congratsOnWin = document.querySelector('.congrats');
    const dialogCloseBtn = document.querySelector('.close')
    .addEventListener('click', () => {
        dialog.close();
    })

    clickToStart.textContent = "CLICK THE START BUTTON TO START THE GAME";
    clickToStart.setAttribute('style', 'font-size: 30px; color:black; position: absolute; top:45%; left: 35%; right: 35%; text-align:center;');
    container.appendChild(clickToStart);

    let playerOne;
    let playerTwo;
    let currentPlayer;
    let freeCells;
    let winnerClaimed;

    function start () {
        playerOne = Player (inputNameOne.value || 'Player One', 'X');
        playerTwo = Player (inputNameTwo.value || 'Player Two', 'O');

        playerOneName.textContent = playerOne.playerName;
        playerTwoName.textContent = playerTwo.playerName;
        playerOneName.classList.add('green');

        inputNameOne.value = '';
        inputNameTwo.value = '';

        currentPlayer = playerOne;
        freeCells = 9;
        winnerClaimed = false;

        if (container.contains(clickToStart)){
            container.removeChild(container.lastChild);
        }

        gameBoard.render();
    }

    function restart() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i] = '';
        }

        while(gameBoard.gameField.hasChildNodes()){
            gameBoard.gameField.removeChild(gameBoard.gameField.lastChild);
        }    

        playerOneName.classList.remove('green');
        playerTwoName.classList.remove('green');
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
                    winnerClaimed = true;
                    markWinLine(pattern);
                    congratsOnWin.textContent = `${currentPlayer.playerName} is the winner!`;
                    setTimeout(() => {dialog.showModal()}, 1000);
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
        if (currentPlayer == playerOne) {
            playerOneName.classList.remove('green');
            playerTwoName.classList.add('green');
        } else if (currentPlayer == playerTwo) {
            playerTwoName.classList.remove('green');
            playerOneName.classList.add('green');
        }
        currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
    }

    function claimTie () {
        winnerClaimed = true;
        congratsOnWin.textContent = `It's a tie`;
        setTimeout(() => {dialog.showModal()}, 1000);
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

const btnStart = document.querySelector('.start');
btnStart.addEventListener('click', handleStart);
function handleStart (e) {
    game.start();
    e.target.removeEventListener('click', handleStart);
}

const btnRestart = document.querySelector('.restart')
    .addEventListener('click', () => {
        game.restart();
})


