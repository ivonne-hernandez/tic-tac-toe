var game = new Game();
game.startNewGame();

var gameBoard = document.querySelector('.game-board');
gameBoard.addEventListener('click', handleSquareClicks);
function handleSquareClicks(event) {
  var selectedSquareId = Number(event.target.closest('.align-player-icon').id);
  var openSquareIndices = game.getOpenSquareIndices();

  if (openSquareIndices.length !== 0) {
    for (var i = 0; i < openSquareIndices.length; i++) {
      if (selectedSquareId === openSquareIndices[i]) {
        game.selectSquare(selectedSquareId);
        displayTokens();
        game.checkForWin();
      }
      if (game.checkForWin()) {
        displayWinner();
        game.incrementPlayerWins();
        displayUpdatedPlayerWins();
        //setTimeout(game.startNewGame(), 5000);
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
