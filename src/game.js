import { Board } from './board';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    this._startTimeStamp = new Date();
  };

  // function for testing game behavior
  // testPrint(){
  //   console.log("Bomb placement:");
  //   this._board.printBombBoard();
  // };

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      let endDateStamp = new Date();
      let msElapsed = endDateStamp - this._startTimeStamp;
      let secondsElapsed = msElapsed / 1000;
      console.log("The game is over - you lost!");
      console.log(`Your game lasted ${secondsElapsed} seconds.`);
      console.log("Final Board:");
      this._board.finalPrint();
    } else if (!this._board.hasSafeTiles()) {
      let endDateStamp = new Date();
      let msElapsed = endDateStamp - this._startTimeStamp;
      let secondsElapsed = msElapsed / 1000;
      console.log("You won - congratulations!");
      console.log(`Your game lasted ${secondsElapsed} seconds.`);
      console.log("Final Board:");
      this._board.finalPrint();
    } else {
      console.log("Current Board:");
      this._board.print();
    };
  };

  toggleFlag(rowIndex, columnIndex){
    this._board.toggleFlag(rowIndex, columnIndex);
    console.log("Current Board:");
    this._board.print();
  };

};
