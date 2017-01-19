// var gravity = 30;
// var jumpSpeed = 17;
// var playerXSpeed = 7;

function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
  this.direction = null; //wasd
}
Player.prototype.type = "player";

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) {
    this.speed.x -= playerXSpeed;
    this.direction = 'a';
  }
  if (keys.right) {
    this.speed.x += playerXSpeed;
    this.direction = 'd';
  }

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle)
    level.playerTouched(obstacle);
  else
    this.pos = newPos;
};

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y = 0;
  if (keys.up) {
    this.speed.y -= playerXSpeed;
    this.direction = 'w';
  }
  if (keys.down) {
    this.speed.y += playerXSpeed;
    this.direction = 's';
  }

  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle)
    level.playerTouched(obstacle);
  else
    this.pos = newPos;
};

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Losing animation
  if (level.status == "lost") {
    this.pos.y += step;
    this.size.y -= step;
  }
};