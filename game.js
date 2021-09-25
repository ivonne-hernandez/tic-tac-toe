class Game {
  constructor() {
    this.players = [];
    this.activePlayerIndex = 0;
    this.gameBoard = [null, null, null, null, null, null, null, null, null];
  }

  startNewGame() {
    //Once we have saveWinsToStorage, create a conditional that allows us to
    //retrieveWinsFromStorage and reinstantiate the players, else if saveWinsToStorage is null 
    //then we just want to create brand new player instances instead of using the old ones
    var id0 = `zero`;
    var id1 = `one`;
    var babyYodaToken = "./assets/baby-yoda.jpg";
    var mandoToken = "./assets/mando.jpg";
    var wins0 = 0; //will be different if we have something saved in storage
    var wins1 = 0; //will be different if we have something saved in storage
    var player1 = new Player(id0, babyYodaToken, wins0);
    var player2 = new Player(id1, mandoToken, wins1);
    this.gameBoard = [null, null, null, null, null, null, null, null, null];
    this.players = [player1, player2];
  }

  getOpenSquares() {
    var openSquares = [];

    for (var i = 0; i < this.gameBoard.length; i++) {
      if (!this.gameBoard[i]) {
        openSquares.push(i);
      }
    }
    return openSquares;
  }

  selectSquare(indexOfSquare) {
    this.gameBoard[indexOfSquare] = this.players[this.activePlayerIndex].token;
  }

  switchActivePlayer() {
    this.activePlayerIndex = (this.activePlayerIndex + 1) % 2;
  }

  checkForWin() {
    var winByColumn = this.checkForColumns();
    var winByRow = this.checkForRows(); 
    var winByDiagonal = this.checkForDiagonals();

    return winByColumn || winByRow || winByDiagonal;
  }

  checkForColumns() {
    var zero = this.gameBoard[0];
    var one = this.gameBoard[1];
    var two = this.gameBoard[2];
    var three = this.gameBoard[3];
    var four = this.gameBoard[4];
    var five = this.gameBoard[5];
    var six = this.gameBoard[6];
    var seven = this.gameBoard[7];
    var eight = this.gameBoard[8];

    var column1Win = zero === three && three === six && zero;
    var column2Win = one === four && four === seven && one;
    var column3Win = two === five && five === eight && two;

    return column1Win || column2Win || column3Win;
  }

  checkForRows() {
    var zero = this.gameBoard[0];
    var one = this.gameBoard[1];
    var two = this.gameBoard[2];
    var three = this.gameBoard[3];
    var four = this.gameBoard[4];
    var five = this.gameBoard[5];
    var six = this.gameBoard[6];
    var seven = this.gameBoard[7];
    var eight = this.gameBoard[8];

    var row1Win = zero === one && one === two && zero;
    var row2Win = three === four && four === five && three;
    var row3Win = six === seven && seven === eight && six;

    return row1Win || row2Win || row3Win;
  }

  checkForDiagonals () {
    var zero = this.gameBoard[0];
    var two = this.gameBoard[2];
    var four = this.gameBoard[4];
    var six = this.gameBoard[6];
    var eight = this.gameBoard[8];

    var diagonal1Win = zero === four && four === eight && zero;
    var diagonal2Win = six === four && four === two && six;

    return diagonal1Win || diagonal2Win;
  }

  incrementPlayerWins() {
    var winnerOfGame = this.players[this.activePlayerIndex];
    winnerOfGame.wins += 1;
    //saveWinsToStorage so that they'll show up when you start a new game
  }
}