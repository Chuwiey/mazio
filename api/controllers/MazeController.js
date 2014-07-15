/**
 * MazeController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	createMaze: function(req,res) {
    var maze = Maze.generate(16);
    Maze.create(maze).exec(function(err, maze) {
      // console.log(maze);
      res.redirect('/maze/' + maze.hash);
    });
  },
  getMaze: function(req,res) {
    Maze.findByHash(req.param('id')).done(function(err, maze) {
      return res.view('homepage', {
        maze: maze[0],
      });
    });
  },
};
