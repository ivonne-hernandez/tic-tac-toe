class Player {
  constructor(id, token, wins) {
    this.id = id;
    this.token = token;
    this.wins = wins;
  }

  saveWinsToStorage(arrayOfPlayers) {
    var gameWinsToStore = arrayOfPlayers;
    var stringifiedGameWins = JSON.stringify(gameWinsToStore);
    localStorage.setItem('gameWinsToStore', stringifiedGameWins);

  }

  retrieveWinsFromStorage() {
    var retrievedGameWins = localStorage.getItem('gameWinsToStore');
    var parsedGameWins = JSON.parse(retrievedGameWins);
    return parsedGameWins;
  }
}