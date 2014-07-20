function Player(x, y, direction) {
  this.x = x+0.1;
  this.y = y+0.1;
  this.direction = direction;
  this.weapon = new Bitmap('/images/knife_hand.png', 319, 320);
  this.paces = 0;
}

Player.prototype.rotate = function(angle) {
  this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
};

Player.prototype.walk = function(distance, map) {
  var dx = Math.cos(this.direction) * distance;
  var dy = Math.sin(this.direction) * distance;
  if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
  if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
  this.paces += distance;
};

Player.prototype.update = function(controls, map, seconds) {
  if (controls.left) this.rotate(-Math.PI * seconds);
  if (controls.right) this.rotate(Math.PI * seconds);
  if (controls.forward) this.walk(3 * seconds, map);
  if (controls.backward) this.walk(-3 * seconds, map);
};