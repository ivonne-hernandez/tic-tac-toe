class Game {
  constructor() {
    this.players = [];
    this.activePlayerIndex = 0;
    this.gameBoard = [null, null, null, null, null, null, null, null, null];
  }

  startNewGame() {
    var id0 = `zero`;
    var id1 = `one`;
    var babyYodaToken = "./assets/baby-yoda.jpg";
    var mandoToken = "./assets/mando.jpg";
    var wins0 = 0;
    var wins1 = 0; 
    var player1 = new Player(id0, babyYodaToken, wins0);
    var player2 = new Player(id1, mandoToken, wins1);
    this.gameBoard = [null, null, null, null, null, null, null, null, null];
    this.players = [player1, player2];
    if (this.players[0].retrieveWinsFromStorage()) {
      var retrievedWinsFromStorage = this.players[0].retrieveWinsFromStorage();
      this.players[0].wins = retrievedWinsFromStorage[0].wins;
      this.players[1].wins = retrievedWinsFromStorage[1].wins;
    }
  }

  getOpenSquareIndices() {
    var openSquareIndices = [];

    for (var i = 0; i < this.gameBoard.length; i++) {
      if (!this.gameBoard[i]) {
        openSquareIndices.push(i);
      }
    }
    return openSquareIndices;
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

    return Boolean(winByColumn || winByRow || winByDiagonal);
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

    return Boolean(column1Win || column2Win || column3Win);
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

    return Boolean(row1Win || row2Win || row3Win);
  }

  checkForDiagonals () {
    var zero = this.gameBoard[0];
    var two = this.gameBoard[2];
    var four = this.gameBoard[4];
    var six = this.gameBoard[6];
    var eight = this.gameBoard[8];

    var diagonal1Win = zero === four && four === eight && zero;
    var diagonal2Win = six === four && four === two && six;

    return Boolean(diagonal1Win || diagonal2Win);
  }

  incrementPlayerWins() {
    var winnerOfGame = this.players[this.activePlayerIndex];
    winnerOfGame.wins += 1;
    winnerOfGame.saveWinsToStorage();
  }
}