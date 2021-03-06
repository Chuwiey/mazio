var Hash = require('hashids'),
    hashids = new Hash('Mazio');

/**
 * Maze.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
    hash: {
      type: 'string',
      required: true
    },
    grid: {
      type: 'array',
      required: true
    },
    size: {
      type: 'integer',
      required: true
    },
    start: {
      type: 'array',
      required: true,
      defaultsTo: [-1,-1]
    },
    end: {
      type: 'array',
      required: true,
      defaultsTo: [-2,-2]
    },

	},

  startEnd: function() {
    var x = Math.floor(Math.random()*this.size);
    var y = Math.floor(Math.random()*this.size);
    var ar = [x,y];
    if (this.get(x,y) || this.isMarkedLocation(x,y)) {
      ar = this.startEnd();
    }
    return ar;
  },

  isMarkedLocation: function(x,y) {
    if ((x === this.start[0] && y === this.start[1]) || (x === this.end[0] && y === this.end[1])) {
      return true;
    }
    return false;
  },

  get: function(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
    return this.grid[y * this.size + x];
  },

  checkSolvable: function(grid, size, start, end) {
    function mazeSolver(maze, size, start, end) {
      this.maze = Array.prototype.slice.call(maze, 0);
      this.mazeCopy = Array.prototype.slice.call(maze, 0);
      this.size = size;
      this.start = start;
      this.end = end;
      this.solved = false;
      // this.steps = 0;
      this.moves = [];
    }

    mazeSolver.prototype.move = function(curX, curY) {
      if (this.solved) { return false; }
      if (curY < 0 || curY >= this.size) { return false; }
      if (curX < 0 || curX >= this.size) { return false; }
      if (this.mazeCopy[curY*this.size + curX] === 6) {
          return false;
      }
      this.markMaze(curX, curY);
      // this.steps++;

      if (this.maze[curY*this.size + curX] === 1) {
        return false; // is wall?
      }
      else if (this.end[0] === curX && this.end[1] === curY) {
        this.solved = true;
        return true; // at end?
      }
      else if (this.move(curX-1, curY)) {
        this.moves.push('left');
        return true; // left
      }
      else if (this.move(curX, curY-1)) {
        this.moves.push('up');
        return true; // up
      }
      else if (this.move(curX+1, curY)) {
        this.moves.push('right');
        return true; // right
      }
      else if (this.move(curX, curY+1)) {
        this.moves.push('down');
        return true; // down
      }
    };

    mazeSolver.prototype.markMaze = function(curX, curY) {
      this.mazeCopy[curY*this.size + curX] = 6;
      return true;
    };

    var x = new mazeSolver(grid, size, start, end);
    x.move(start[0],start[1]);
    if (x.solved) {
      return true;
    }
    else {
      return false;
    }
  },
  
  generate: function(size) {
      this.size = size+1;
      this.hash = hashids.encrypt(+new Date());
      this.start = [-1,-1];
      this.end = [-2,-2];
      var grid = new Array(this.size * this.size);
      for (var i = 0; i < this.size * this.size; i++) {
        if (i < this.size || i > (this.size*this.size-this.size) || (i+1)%this.size<2) {
          grid[i] = 1;
        }
        else {
          grid[i] = Math.random() < 0.4 ? 1 : 0; // 0.4 -> wallRatio
        }
      }

      this.grid = grid;
      this.start = this.startEnd();
      this.end = this.startEnd();
      // this.printMaze(this.hash, this.size, this.grid, this.start, this.end);
      if (!this.checkSolvable(this.grid, this.size, this.start, this.end)) {
        // make solvable return a true/false value;
        this.grid = this.generate(size);
        return this.grid;
      }
      return {
        grid: this.grid,
        start: this.start,
        end: this.end,
        hash: this.hash,
        size: this.size
      };
  },

  printMaze: function(hash, size, maze, start, end) {
    console.log('hash:', hash);
    var out = '';
    for (var i=0; i < maze.length; i++) {
      if (!(i % size)) {
        out += '\n';
        out += maze[i] + ',';
      }
      else if(this.start[1] * this.size + this.start[0] === i) {
        out += 'S,';
      }
      else if(this.end[1] * this.size + this.end[0] === i) {
        out += 'E,';
      }
      else {
        out += maze[i] + ',';
      }
    }
    console.log(out);
  },
};
