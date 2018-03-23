function Box(x, y, w, h){
var options = {
friction: 10,
restitution:0,
}
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.offScreen = function (){
	var pos = this.body.position;
	return (pos.y > height + 100)
}

this.removeFromWorld = function (){
	World.remove(world,this.body);
}


  this.show = function(){
    var pos = this.body.position;
    var angle =this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    stroke(255);
    fill(127);
    rect(0, 0, this.w, this.h);
    pop();
 }
}
