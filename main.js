var game = new Game();
game.startNewGame();

var gameBoard = document.querySelector('.game-board');
var turnAndWinnerDisplay = document.querySelector('.turn-and-winner-display');
var babyYodaNumberOfWinsDisplay = document.querySelector('.player-1-number-of-wins');
var mandoNumberOfWinsDisplay = document.querySelector('.player-2-number-of-wins');

gameBoard.addEventListener('click', handleSquareClicks);


function handleSquareClicks(event) {
  var selectedSquareId = Number(event.target.closest('.game-board-square').id);
  var openSquareIndices = game.getOpenSquareIndices();
  
  if (openSquareIndices.length !== 0) {
    for (var i = 0; i < openSquareIndices.length; i++) {
      if (selectedSquareId === openSquareIndices[i]) {
        game.selectSquare(selectedSquareId);
        displayTokens();
        if (game.checkForWin()) {
          gameBoard.classList.add('disable-click'); //doesn't allow players to select a square
          displayWinner();
          game.incrementPlayerWins();
          //store player wins ~ should we just save the wins of the player who won or both?
          //storing the wins for the player that won
          game.players[game.activePlayerIndex].saveWinsToStorage();
          displayUpdatedPlayerWins();
          timeOut();
          game.startNewGame();
        }
      }
    }
  } else if (!openSquareIndices.length) {
    //update the DOM to say it's a draw, reset the game/start it over
//     updateDomToSayThereWasADraw();
//     waitACoupleOfSeconds();
//     startNewGame();
  }
  game.switchActivePlayer();
  //displayNewActivePlayer();
};

  function displayTokens() {
    var squares = document.querySelectorAll('.game-board-square');
    var alt;
    for (var i = 0; i < squares.length; i++) {
      if (game.gameBoard[i] !== null) {
        if (game.gameBoard[i] === "./assets/baby-yoda.jpg") {
          alt = "baby yoda picture";
        } else {
          alt = "mando picture";
        }
        squares[i].innerHTML = `
          <img src="${game.gameBoard[i]}" alt="${alt}" class="player-image">
        `;
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

  function displayUpdatedPlayerWins() {
      babyYodaNumberOfWinsDisplay.innerText = `Number of Wins: ${game.players[0].wins}`;
      mandoNumberOfWinsDisplay.innerText = `Number of Wins: ${game.players[1].wins}`;
  }

  function timeOut() {
    setTimeout(clearTheGameBoard, 2000);
  }

  function clearTheGameBoard() {
    var squares = document.querySelectorAll('.game-board-square');
    for (var i = 0; i < game.gameBoard.length; i++) {
      squares[i].innerHTML = ``;
    }
    gameBoard.classList.remove('disable-click');//allows players to select a square
  }


// if event square is in opensquares {
//   selectSquare(eventSquare)
//   if (checkForWin()) {
//   //update DOM to say who won, update their total number of wins and display it, reset the game/start it over
//     updateDomToSayWhoWon();
//     incrementPlayerWins();
//     updateDomToDisplayPlayerWins();
//     waitACoupleOfSeconds();
//     startNewGame();
//   } else if (!getOpenSquares()) {
//     //update the DOM to say it's a draw, reset the game/start it over
//     updateDomToSayThereWasADraw();
//     waitACoupleOfSeconds();
//     startNewGame();
//   } 
//   switchActivePlayer();
//   updateDomToSayWhosTurnItIs();
// }