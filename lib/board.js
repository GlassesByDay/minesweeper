"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    if (numberOfRows > 1 && numberOfColumns > 1 && numberOfRows * numberOfColumns > numberOfBombs) {
      this._numberOfBombs = numberOfBombs;
      this._numberOfTiles = numberOfRows * numberOfColumns;
      this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
      this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    } else {
      console.log("Invalid board dimentions!");
    };
  }

  _createClass(Board, [{
    key: "flipTile",
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] === 'X') {
        console.log("This tile has a flag on it and cannot be flipped!");
        return;
      } else if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log("This tile has already been flipped!");
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else if (this.getNumberOfNeighborBombs(rowIndex, columnIndex) === 0) {
        this._playerBoard[rowIndex][columnIndex] = 0;
        this.flipNeighborTiles(rowIndex, columnIndex);
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      };
      this._numberOfTiles--;
    }
  }, {
    key: "flipNeighborTiles",
    value: function flipNeighborTiles(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          _this.flipTile(neighborRowIndex, neighborColumnIndex);
        };
      });
    }
  }, {
    key: "toggleFlag",
    value: function toggleFlag(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ' && this._playerBoard[rowIndex][columnIndex] !== 'X') {
        console.log("This tile has already been flipped!");
        return;
      } else if (this._playerBoard[rowIndex][columnIndex] !== 'X') {
        this._playerBoard[rowIndex][columnIndex] = 'X';
      } else {
        this._playerBoard[rowIndex][columnIndex] = ' ';
      };
    }
  }, {
    key: "getNumberOfNeighborBombs",
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this2 = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this2._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          };
        };
      });
      return numberOfBombs;
    }
  }, {
    key: "hasSafeTiles",
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: "print",
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join('|');
      }).join('\n'));
    }
  }, {
    key: "printBombBoard",


    //print Bomb board for debugging and testing
    value: function printBombBoard() {
      console.log(this._bombBoard.map(function (row) {
        return row.join('|');
      }).join('\n'));
    }
  }, {
    key: "playerBoard",
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: "generatePlayerBoard",
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(' ');
        };
        board.push(row);
      };
      return board;
    }
  }, {
    key: "generateBombBoard",
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(null);
        };
        board.push(row);
      };
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        };
      };
      return board;
    }
  }]);

  return Board;
}();

;