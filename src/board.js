export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    if (numberOfRows > 1 && numberOfColumns > 1 && numberOfRows * numberOfColumns > numberOfBombs) {
      this._numberOfBombs = numberOfBombs;
      this._numberOfTiles = numberOfRows * numberOfColumns;
      this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
      this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    } else {
      console.log("Invalid board dimentions!");
    };
  };

  get playerBoard(){
    return this._playerBoard;
  };

  flipTile(rowIndex, columnIndex){
    if (this._playerBoard[rowIndex][columnIndex] === 'X') {
      console.log("This tile has a flag on it and cannot be flipped!");
      return;
    } else if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log("This tile has already been flipped!");
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else if (this.getNumberOfNeighborBombs(rowIndex, columnIndex) === 0){
      this._playerBoard[rowIndex][columnIndex] = 0;
      this.flipNeighborTiles(rowIndex, columnIndex);
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    };
    this._numberOfTiles--;
  };

  flipNeighborTiles(rowIndex, columnIndex){
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
        this.flipTile(neighborRowIndex, neighborColumnIndex);
      };
    });
  };

  toggleFlag(rowIndex, columnIndex){
    if (this._playerBoard[rowIndex][columnIndex] !== ' ' && this._playerBoard[rowIndex][columnIndex] !== 'X') {
      console.log("This tile has already been flipped!")
      return;
    } else if (this._playerBoard[rowIndex][columnIndex] !== 'X') {
      this._playerBoard[rowIndex][columnIndex] = 'X';
    } else {
      this._playerBoard[rowIndex][columnIndex] = ' ';
    };
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        };
      };
    });
    return numberOfBombs;
  };

  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  };

  print(){
    console.log(this._playerBoard.map(row => row.join('|')).join('\n'));
  };

  //print Bomb board for debugging and testing
  printBombBoard(){
    console.log(this._bombBoard.map(row => row.join('|')).join('\n'));
  };

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(' ');
      };
      board.push(row);
    };
    return board;
  };

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(null);
      };
      board.push(row);
    };
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      };
    };
    return board;
  };
};
