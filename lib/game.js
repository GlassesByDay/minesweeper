'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
    this._startTimeStamp = new Date();
  }

  _createClass(Game, [{
    key: 'testPrint',


    // function for testing game behavior
    value: function testPrint() {
      console.log("Bomb placement:");
      this._board.printBombBoard();
    }
  }, {
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        var endDateStamp = new Date();
        var msElapsed = endDateStamp - this._startTimeStamp;
        var secondsElapsed = msElapsed / 1000;
        console.log("The game is over!");
        console.log('Your game lasted ' + secondsElapsed + ' seconds.');
        console.log("Final Board:");
        this._board.print();
      } else if (!this._board.hasSafeTiles()) {
        var _endDateStamp = new Date();
        var _msElapsed = _endDateStamp - this._startTimeStamp;
        var _secondsElapsed = _msElapsed / 1000;
        console.log("You won - congratulations!");
        console.log('Your game lasted ' + _secondsElapsed + ' seconds.');
      } else {
        console.log("Current Board:");
        this._board.print();
      };
    }
  }, {
    key: 'toggleFlag',
    value: function toggleFlag(rowIndex, columnIndex) {
      this._board.toggleFlag(rowIndex, columnIndex);
      console.log("Current Board:");
      this._board.print();
    }
  }]);

  return Game;
}();

;