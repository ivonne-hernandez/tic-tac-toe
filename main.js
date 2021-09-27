var game;
var gameBoard = document.querySelector('.game-board');
var turnAndWinnerDisplay = document.querySelector('.turn-and-winner-display');
var babyYodaNumberOfWinsDisplay = document.querySelector('.player-1-number-of-wins');
var mandoNumberOfWinsDisplay = document.querySelector('.player-2-number-of-wins');

gameBoard.addEventListener('click', handleSquareClicks);
window.addEventListener('load', loadGame);

function loadGame() {
  game = new Game();
  game.startNewGame();
  displayUpdatedPlayerWins();
}

function handleSquareClicks(event) {
  var selectedSquareId = Number(event.target.closest('.game-board-square').id);
  var openSquareIndices = game.getOpenSquareIndices();
  for (var i = 0; i < openSquareIndices.length; i++) {
    if (selectedSquareId === openSquareIndices[i]) {
      selectOpenSquare(selectedSquareId);
    }
  }
}

function selectOpenSquare(selectedSquareId) {
  game.selectSquare(selectedSquareId);
  displayTokens();
  if (game.checkForWin()) {
    handleWinCondition();
    return;
  } else if (!game.getOpenSquareIndices().length) {
    handleDrawCondition();
    return;
  }
  continueGame();
}

function handleWinCondition() {
  displayWinner();
  gameBoard.classList.add('disable-click');
  game.incrementPlayerWins();
  game.players[game.activePlayerIndex].saveWinsToStorage(game.players);
  displayUpdatedPlayerWins();
  timeOut();
}

function handleDrawCondition() {
  turnAndWinnerDisplay.innerHTML = `
    <p>
      It's a draw
    </p>
  `;
  gameBoard.classList.add('disable-click');
  timeOut();
}

function continueGame() {
  game.switchActivePlayer();
  displayNewActivePlayer();
}

function displayTokens() {
  var squares = document.querySelectorAll('.game-board-square');
  var alt;
  for (var i = 0; i < squares.length; i++) {
    if (game.gameBoard[i] === "./assets/baby-yoda.jpg") {
      alt = "baby yoda picture";
    } else {
      alt = "mando picture";
    }
    if (game.gameBoard[i] !== null) {
      squares[i].innerHTML = `
        <img src="${game.gameBoard[i]}" alt="${alt}" class="player-image">
      `;
    } else {
      squares[i].innerHTML = ``;
    }
  } 
}

function displayWinner() {
  var alt;
  if (game.players[game.activePlayerIndex].token === "./assets/baby-yoda.jpg") {
    alt = "baby yoda picture";
  } else {
    alt = "mando picture";
  }
  
  turnAndWinnerDisplay.innerHTML = `
    <img src="${game.players[game.activePlayerIndex].token}" alt="${alt}" class="winner-display player-image">
    <p> won! </p>
  `;
}

function displayNewActivePlayer() {
  var alt;
  if (game.players[game.activePlayerIndex].token === "./assets/baby-yoda.jpg") {
    alt = "baby yoda picture";
  } else {
    alt = "mando picture";
  }

  turnAndWinnerDisplay.innerHTML = `
    <p>It's </p>
    <img src="${game.players[game.activePlayerIndex].token}" alt="${alt}" class="winner-display player-image">
    <p>'s turn</p>
  `;
}

function displayUpdatedPlayerWins() {
  babyYodaNumberOfWinsDisplay.innerText = `Number of Wins: ${game.players[0].wins}`;
  mandoNumberOfWinsDisplay.innerText = `Number of Wins: ${game.players[1].wins}`;
}

function timeOut() {
  setTimeout(clearTheGameBoard, 2000);
}

function clearTheGameBoard() {
  game.startNewGame();
  displayTokens();
  gameBoard.classList.remove('disable-click');
  game.switchActivePlayer();
  displayNewActivePlayer();
}