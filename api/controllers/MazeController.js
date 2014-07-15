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
      if (err) { res.send(err); }
      res.redirect('/maze/' + maze.hash);
    });
  },
  getMaze: function(req,res) {
    Maze.findByHash(req.param('id')).exec(function(err, maze) {
      if (err) { res.send(err); }
      return res.view('homepage', {
        maze: maze[0],
      });
    });
  },
};
