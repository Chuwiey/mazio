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
    start: {
      type: 'array',
      required: true
    },
    end: {
      type: 'array',
      required: true
    }

	},

  beforeCreate: function(values, cb) {
    cb();
  },

  generateMaze: function() {

  },

  checkSolvable: function(start, end) {
    
  }

};
