alert('Still In Progress. An alert/prompt will be use for interactivity.');

const GameBoard = (() => {
  //   const boardArray = [
  //     ['', 'O', 'X'],
  //     ['O', 'X', 'O'],
  //     ['O', 'X', 'O'],
  //   ];

  const boardArray = Array.from({ length: 3 }, () => Array(3).fill(''));

  const getBoard = () => boardArray;

  const setBoardCellValue = (row, col, mark) => {
    boardArray[row][col] = mark;
  };

  const isCellEmpty = (row, col) => boardArray[row][col] === '';

  const isBoardFull = () =>
    !boardArray.some((row) => row.some((cell) => cell === ''));

  return { getBoard, setBoardCellValue, isCellEmpty, isBoardFull };
})();

const Player = (name, mark) => ({ name, mark });

const GameController = (() => {
  let isGameOver = false;
  let playerOne = Player('Player 1', 'X');
  let playerTwo = Player('Player 2', 'O');
  let currentPlayer = playerOne;

  //   const getCurrentPlayer = () => currentPlayer;

  //   const getPlayerOne = () => playerOne;
  //   const getPlayerTwo = () => playerTwo;

  const switchPlayer = () => {
    currentPlayer.name === playerOne.name
      ? (currentPlayer = playerTwo)
      : (currentPlayer = playerOne);
  };

  const startGame = () => {
    const player1Input = prompt('Enter Player 1 Name').trim();
    const player2Input = prompt('Enter Player 2 Name').trim();
    playerOne.name = player1Input || 'Player 1';
    playerTwo.name = player2Input || 'Player 2';
    alert(`Player 1: ${playerOne.name} (X)\nPlayer 2: ${playerTwo.name} (O)`);
    playTurn();
  };

  /*
    ['', '', '']
    ['', '', '']
    ['', '', '']
  */
  const checkWinner = (board) => {
    const winConditions = [
      // Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    return winConditions.some((condition) => {
      return condition.every(
        ([row, col]) => board[row][col] === currentPlayer.mark
      );
    });
  };

  const playTurn = () => {
    while (!isGameOver) {
      let rowInput = parseInt(
        prompt(`${currentPlayer.name}, enter row (0, 1, 2): `).trim()
      );
      let colInput = parseInt(
        prompt(`${currentPlayer.name}, enter col (0, 1, 2): `).trim()
      );

      if (GameBoard.isCellEmpty(rowInput, colInput)) {
        GameBoard.setBoardCellValue(rowInput, colInput, currentPlayer.mark);

        if (checkWinner(GameBoard.getBoard())) {
          alert(
            `${
              currentPlayer.name
            } wins the game!\n${GameBoard.getBoard()[0].join(
              ' | '
            )}\n${GameBoard.getBoard()[1].join(
              ' | '
            )}\n${GameBoard.getBoard()[2].join(' | ')}`
          );
          //   console.log(GameBoard.getBoard());
          isGameOver = true;
        } else if (GameBoard.isBoardFull()) {
          alert(
            `It's a draw!\n${GameBoard.getBoard()[0].join(
              ' | '
            )}\n${GameBoard.getBoard()[1].join(
              ' | '
            )}\n${GameBoard.getBoard()[2].join(' | ')}`
          );
          //   console.log(GameBoard.getBoard());
          isGameOver = true;
        } else {
          switchPlayer();
          alert(
            `Now it's ${
              currentPlayer.name
            }'s turn.\n${GameBoard.getBoard()[0].join(
              ' | '
            )}\n${GameBoard.getBoard()[1].join(
              ' | '
            )}\n${GameBoard.getBoard()[2].join(' | ')}`
          );
          //   console.log(GameBoard.getBoard());
        }
      } else {
        alert('Cell is already occupied. Choose a different cell.');
      }
    }
  };

  return { startGame };
})();

GameController.startGame();
