class Player {
  constructor(id, token, wins) {
    this.id = id;
    this.token = token;
    this.wins = wins;
  }

  saveWinsToStorage(arrayOfPlayers) {
    //want to store array of players
    var gameWinsToStore = arrayOfPlayers;
    var stringifiedGameWins = JSON.stringify(gameWinsToStore);
    localStorage.setItem('gameWinsToStore', stringifiedGameWins);

  }

  retrieveWinsFromStorage() {
    var retrievedGameWins = localStorage.getItem('gameWinsToStore');
    var parsedGameWins = JSON.parse(retrievedGameWins);
    console.log(`parsedGameWins:`, parsedGameWins)
    return parsedGameWins;
  }

}