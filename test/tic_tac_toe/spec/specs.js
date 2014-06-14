describe('tic-tac-toe', function() {

  beforeEach(function() {
    Space.all = [];
    Board.spaces = [];
    this.testGame = Game.create();
  });

  describe("Player", function() {
    describe("initialize", function() {
      it("is initialized with a symbol", function() {
        var testPlayer = Object.create(Player);
        testPlayer.initialize("X");
        testPlayer.symbol.should.equal("X");
      });
    });

    describe("create", function() {
      it("creates a new Player object", function() {
        var testPlayer = Player.create("X");
        Player.isPrototypeOf(testPlayer).should.equal(true);
      });
    });
  });

  describe("Space", function() {
    describe("initialize", function() {
      it("is initialized with an x and y coordinate", function() {
        var testSpace = Object.create(Space);
        testSpace.initialize(1, 2);
        testSpace.xCoordinate.should.equal(1);
        testSpace.yCoordinate.should.equal(2);
      });
    });

    describe("create", function() {
      it('creates a new Space object', function() {
        var testSpace = Space.create(1,2);
        Space.isPrototypeOf(testSpace).should.equal(true);
      });
    });

    describe("markBy", function() {
      it("lets a player mark the space", function() {
        var testPlayer = Player.create("X");
        var testSpace = Space.create(1, 2);
        testSpace.markBy(testPlayer);
        testSpace.markedBy.should.equal(testPlayer);
      });
    });

    describe('find', function() {
      it('should be able to return a space by its coordinates', function() {
        var testBoard = Board.create();
        var testSpace = Space.find(1,2);
        Space.isPrototypeOf(testSpace).should.equal(true);
        testSpace.xCoordinate.should.equal(1);
        testSpace.yCoordinate.should.equal(2);
      });
    });
  });

  describe("Board", function() {
    describe('initialize', function() {
      it("creates 9 spaces when it is initialized", function() {
        Space.all.length.should.equal(9);
      });

      it('should have 3 spaces across and 3 down', function() {
        var testBoard = Board.create();
        Space.all[8].xCoordinate.should.equal(2);
        Space.all[8].yCoordinate.should.equal(2);
      });
    });

    describe("create", function() {
      it('creates the board object', function() {
        var testBoard = Board.create();
        Board.isPrototypeOf(testBoard).should.equal(true);
      });
    });

    describe('checkForWinner', function() {
      it('should return false if no one has 3 in a row', function() {
        this.testGame.board.checkForWinner().should.equal(false);
      });

      it('should return the player if they have 3 in a row, horizontally', function() {
        Space.all[0].markBy(this.testGame.players[0]);
        Space.all[1].markBy(this.testGame.players[0]);
        Space.all[2].markBy(this.testGame.players[0]);
        this.testGame.board.checkForWinner().should.equal(this.testGame.players[0]);
      });

      it('should return the player if they have 3 in a row, vertically', function() {
        Space.all[0].markBy(this.testGame.players[0]);
        Space.all[3].markBy(this.testGame.players[0]);
        Space.all[6].markBy(this.testGame.players[0]);
        this.testGame.board.checkForWinner().should.equal(this.testGame.players[0]);
      });

      it('should return the player if they have 3 in a row, diagonally', function() {
        Space.all[2].markBy(this.testGame.players[0]);
        Space.all[4].markBy(this.testGame.players[0]);
        Space.all[6].markBy(this.testGame.players[0]);
        this.testGame.board.checkForWinner().should.equal(this.testGame.players[0]);
      });
    });
  });

  describe('Game', function() {
    describe('initialize', function() {
      it("should create 1 board", function() {
        Board.isPrototypeOf(this.testGame.board).should.equal(true);
      });

      it('should create 2 players, an X player and an O player', function() {
        this.testGame.players.length.should.equal(2);
        this.testGame.players[0].symbol.should.equal('X');
        this.testGame.players[1].symbol.should.equal('O');
      });

      it("should start the game on Player X's turn", function() {
        this.testGame.turn.should.equal(this.testGame.players[0]);
      });

    });

    describe("create", function() {
      it('creates the game object', function() {
        Game.isPrototypeOf(this.testGame).should.equal(true);
      });
    });

    describe('changeTurn', function() {
      it('should change between players turns', function() {
        this.testGame.changeTurn();
        this.testGame.turn.should.equal(this.testGame.players[1]);
        this.testGame.changeTurn();
        this.testGame.turn.should.equal(this.testGame.players[0]);
      });
    });

    describe('isGameOver', function() {
      it('should return true if there is a winner', function() {
        Space.all[0].markBy(this.testGame.players[0]);
        Space.all[1].markBy(this.testGame.players[0]);
        Space.all[2].markBy(this.testGame.players[0]);
        var gameStatus = this.testGame.isGameOver();
        gameStatus.should.equal(true);
      });

      it('should return true if there are no spaces left', function() {
        Space.all[0].markBy(this.testGame.players[0]);
        Space.all[1].markBy(this.testGame.players[1]);
        Space.all[2].markBy(this.testGame.players[0]);
        Space.all[3].markBy(this.testGame.players[1]);
        Space.all[4].markBy(this.testGame.players[0]);
        Space.all[5].markBy(this.testGame.players[0]);
        Space.all[6].markBy(this.testGame.players[1]);
        Space.all[7].markBy(this.testGame.players[0]);
        Space.all[8].markBy(this.testGame.players[1]);
        var gameStatus = this.testGame.isGameOver();
        gameStatus.should.equal(true);
      });

      it('should return false if there are spaces left and no winner', function() {
        Space.all[0].markBy(this.testGame.players[0]);
        Space.all[1].markBy(this.testGame.players[1]);
        Space.all[2].markBy(this.testGame.players[0]);
        Space.all[3].markBy(this.testGame.players[1]);
        Space.all[4].markBy(this.testGame.players[0]);
        var gameStatus = this.testGame.isGameOver();
        gameStatus.should.equal(false);
      });
    });

    describe('restart', function() {
      it('should set all spaces to unmarked',function() {
        Space.all[0].markBy(this.testGame.players[0]);
        Space.all[0].selected.should.equal(true);
        this.testGame.restart();
        Space.all[0].selected.should.equal(false);

      });
    });
  });
});
