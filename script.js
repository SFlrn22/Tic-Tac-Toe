const createPlayer = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  const boardInit = document.getElementById('board');
  let board = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('index', `${i}`);
    boardInit.appendChild(cell);
    board.push('');
  }

  function setElement(index, element) {
    board[index] = element;
  }

  return { board, setElement };
})();

const game = (() => {
  const player1 = createPlayer('player1', 'X');
  const player2 = createPlayer('player2', 'O');
  let running = false;
  let currentPlayer = player1;

  const winPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [3, 4, 6],
  ];

  const cells = document.querySelectorAll('.cell');
  const status = document.getElementById('status');

  function initializeGame() {
    running = true;
    cells.forEach((cell) => cell.addEventListener('click', clickHandler));
    status.textContent = `${currentPlayer.name}'s turn`;
  }

  function clickHandler() {
    const cellIndex = this.getAttribute('index');

    if (gameBoard.board[cellIndex] != '' || !running) {
      return;
    }

    gameBoard.board[cellIndex] = currentPlayer.marker;
    this.classList.add(`${currentPlayer.marker}`);
    this.textContent = currentPlayer.marker;
    winnerCheck();
  }

  function swapPlayers() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
    status.textContent = `${currentPlayer.name}'s turn`;
  }

  function winnerCheck() {
    let won = false;
    for (let i = 0; i < winPossibilities.length; i += 1) {
      if (
        gameBoard.board[winPossibilities[i][0]] == '' ||
        gameBoard.board[winPossibilities[i][1]] == '' ||
        gameBoard.board[winPossibilities[i][2]] == ''
      ) {
        continue;
      } else if (
        gameBoard.board[winPossibilities[i][0]] ==
          gameBoard.board[winPossibilities[i][1]] &&
        gameBoard.board[winPossibilities[i][1]] ==
          gameBoard.board[winPossibilities[i][2]]
      ) {
        won = true;
        break;
      }
    }

    if (won === true) {
      status.textContent = `${currentPlayer.name} won!!!`;
      running = false;
    } else if (!gameBoard.board.includes('')) {
      status.textContent = 'DRAW!!!';
      running = false;
    } else {
      swapPlayers();
    }
  }

  return { initializeGame };
})();

const gameRender = (() => {
  game.initializeGame();
})();
