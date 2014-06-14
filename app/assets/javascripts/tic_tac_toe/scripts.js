var Player = {
	initialize: function(symbol) {
		this.symbol = symbol;
	},
	create: function(symbol) {
		var player = Object.create(Player);
		player.initialize(symbol);
		return player;
	}
};

var Space = {
  all: [],
	initialize: function(x, y) {
		this.xCoordinate = x;
		this.yCoordinate = y;
    this.selected = false;
	},
  create: function(x, y) {
    var space = Object.create(Space);
    space.initialize(x, y);
    Space.all.push(space);
    return space;
  },
  markBy: function(player) {
    this.markedBy = player;
    Space.spacesFilled.push(this);
    this.selected = true;
  },
  find: function(x, y) {
    var fSpace;
    Space.all.forEach(function(space) {
      if (space.xCoordinate === x && space.yCoordinate === y) {
        fSpace = space;
      }
    });
    return fSpace;
  }
};

var Board = {
  spaces: [],
  initialize: function() {
    Space.spacesFilled = [];
    for (var i = 0; i < 3; i++) {
      var rowSpace = [];
      for (var j = 0; j < 3; j++) {
        var space = Space.create(i, j);
        rowSpace.push(space);
      }
      Board.spaces.push(rowSpace);
    }
  },
  create: function() {
    var board = Object.create(Board);
    board.initialize();
    return board;
  },
  checkForWinner: function() {
    this.winner = null;

    // Checking horizontal win conditions
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var space = Board.spaces[i][j];
        if (space.markedBy !== undefined && j === 0) {
          this.winner = space.markedBy;
        } else if (space.markedBy !== this.winner) {
          this.winner = null;
          break;
        } else if (j === 2) {
          return this.winner;
        }
      }
    }

    // checking vertical win conditions
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 3; i++) {
        var space = Board.spaces[i][j];
        if (space.markedBy !== undefined && i === 0) {
          this.winner = space.markedBy;
        } else if (space.markedBy !== this.winner) {
          this.winner = null;
          break;
        } else if (i === 2) {
          return this.winner;
        }
      }
    }

    // check diagonal win conditions
    for (var i = 0; i < 3; i++) {
      var space = Board.spaces[i][i];
      if (space.markedBy !== undefined && i === 0) {
        this.winner = space.markedBy;
      } else if (space.markedBy !== this.winner) {
        this.winner = null;
        break;
      } else if (i === 2) {
        return this.winner;
      }
    }
    for (var i = 0; i < 3; i++) {
      var space = Board.spaces[i][2 - i];
      if (space.markedBy !== undefined && i === 0) {
        this.winner = space.markedBy;
      } else if (space.markedBy !== this.winner) {
        this.winner = null;
        break;
      } else if (i === 2) {
        return this.winner;
      }
    }

    return false;
  }
};

var Game = {
  initialize: function() {
    this.board = Board.create();
    this.players = [Player.create('X'), Player.create('O')];
    this.turn = this.players[0];
  },
  create: function() {
    var game = Object.create(Game);
    game.initialize();
    return game;
  },
  changeTurn: function() {
    if (this.turn === this.players[0]) {
      this.turn = this.players[1];
    } else {
      this.turn = this.players[0];
    }
  },
  isGameOver: function() {
    var winner = this.board.checkForWinner();
    if (winner || Space.spacesFilled.length === 9) {
      return true;
    } else {
      return false;
    }
  },
  restart: function() {
    this.board.spaces.forEach(function(row) {
      row.forEach(function(space) {
        space.selected = false;
        space.markedBy = null;
      });
    });
    Space.spacesFilled = [];
  }
};
