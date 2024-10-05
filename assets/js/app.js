// alert('In Progress');

const GameBoard = (() => {
  const boardArray = Array.from({ length: 3 }, () => Array(3).fill(''));

  const getBoard = () => console.log(boardArray);

  const setBoardCellValue = (row, col, mark) => {
    boardArray[row][col] = mark;
    getBoard();
  };

  return { getBoard, setBoardCellValue };
})();

const Player = (name, mark) => ({ name, mark });

const GameController = (() => {
  let isGameOver = false;
  let playerOne;
  let playerTwo;
  let currentPlayer;

  const startGame = () => {
    const player1Input = prompt('Enter Player 1 Name');
    const player2Input = prompt('Enter Player 2 Name');
    playerOne = Player(`${player1Input ? player1Input : 'Player 1'}`, 'X');
    playerTwo = Player(`${player2Input ? player2Input : 'Player 2'}`, 'O');
    console.log(
      `Player 1 name is ${playerOne.name}\nPlayer 2 name is ${playerTwo.name}`
    );

    console.log(GameBoard.getBoard());
  };

  const playTurn = () => {};

  const getPlayerOne = () => playerOne;
  const getPlayerTwo = () => playerTwo;

  return { startGame, getPlayerOne, getPlayerTwo };
})();
