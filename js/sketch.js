//Creamos nu Engine de física (Matter.js)
var Engine = Matter.Engine,
    //Render = Matter.Render,
    //Creamos el mundo
World = Matter.World,
    //Creamos los bodies ( array )
Bodies = Matter.Bodies;
var engine;
var box;
var boxes = [];
var world;
var elements = [];
var factorIncremento = 1;
var scroll = 0;
var kickstart = false;


function setup() {
console.log("scroll");
//Crear canvas
    createCanvas(800, 580);
    canvas.style = "position:fixed; left: 35%; width: 800px; margin-left: -200px;";

    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    var options = {
      friction: 10,
      restitution:0,
      isStatic: true
    }

    var acciones = {
        isStatic: false
    }

//Plataformas para saltar
    barra1  = Bodies.rectangle(200, 70, 200, 15, options);
    barra1.width = 200;
    barra1.height= 15;
    barra2 = Bodies.rectangle(450, 370, 200, 15, options);
    barra2.width = 200;
    barra2.height= 15;
    barra3 = Bodies.rectangle(280, 270, 200, 15, options);
    barra3.width = 200;
    barra3.height= 15;
    barra4 = Bodies.rectangle(700, 200, 200, 15, options);
    barra4.width = 200;
    barra4.height= 15;
    barra5 = Bodies.rectangle(600, 290, 200, 15, options);
    barra5.width = 200;
    barra5.height= 15;
    ground = Bodies.rectangle(400, height, width, 100, options);
    console.log( width );
    ground.width = width;
    ground.height= 100;
    wallLeft = Bodies.rectangle(0, 0, 20, 9000 ,options);
    wallLeft.width = 20;
    wallLeft.height= 15000;
    wallRight = Bodies.rectangle(width, 0, 20, 9000 ,options);
    wallRight.width = 20;
    wallRight.height= 15000;




    elements.push(barra5);
    elements.push(barra2);
    elements.push(barra3);
    elements.push(barra4);
    elements.push(barra1);
    elements.push(ground);
    elements.push(wallLeft);
    elements.push(wallRight);


    World.add(world, elements);

    box = new Box(260, 400, 50, 50 );
}


//Crear cajitas con mouse
function mouseDragged() {

  boxes.push(new Box(mouseX, mouseY, 5, 5));
}

//Mover objetos con teclado
function keyPressed(k){
  if( k.code == "ArrowRight"){
    var posX = box.body.position.x;
    var posY = box.body.position.y;
    Matter.Body.applyForce(box.body, { x: posX, y: posY }, { x: 0.05, y:0 });
  }

  if( k.code == "ArrowLeft"){
    var posX = box.body.position.x;
    var posY = box.body.position.y;
    Matter.Body.applyForce(box.body, { x: posX, y: posY }, { x: -0.05, y:0 });
  }

  if( k.code == "ArrowUp"){
    kickstart = true;
    var posX = box.body.position.x;
    var posY = box.body.position.y;
    Matter.Body.applyForce(box.body, { x:posX , y:posY }, { x: 0, y: -0.05 });
//Scroll cuando el objeto se mueve
      //bodyScroll();
  }
}

//Plataformas para saltar
function draw() {
    background(40, 139, 154);
    box.show();

///Eliminar cosas del espacio
for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
    if (boxes[i].offScreen()){
      boxes[i].removeFromWorld();
      boxes.splice(i, 1);
      i--;
    }
}
///


//Scroll de toda la hoja
  screenScroll();
    noStroke(255);
    fill(70);

//Plataformas para saltar
    rectMode(CENTER);

    for( var i = 0; i < elements.length; i++ ){
      rect( elements[ i ].position.x, elements[ i ].position.y, elements[ i ].width, elements[ i ].height );
    }


}

function screenScroll(){
  if( kickstart == true ){
  for( var i = 0; i < elements.length; i++ ){
    Matter.Body.translate(elements[i], {x:0, y:factorIncremento});
  }

    scroll += factorIncremento;
    if( scroll >= 100 ){
      scroll = 0;
      var options = {
        friction: 10,
        restitution:0,
        isStatic: true
      }
      var barra = Bodies.rectangle( Math.random() * width,  100, 200, 15 ,options);
      barra.width = 200;
      barra.height = 15;
      elements.push(barra);
      World.add( world, barra );

    }
  }
}
