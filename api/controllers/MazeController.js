/**
 * MazeController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	index: function(req,res) {
    // console.log(Maze);
    return res.view('homepage', {
      maze: Maze.generate(16),
    });
    // Maze.create().exec(function(err, maze) {
    //   console.log(maze.generate);
    // });
  }
};
