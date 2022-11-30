

var canvas = document.getElementById("viewport");
canvas.setAttribute("width", "1000"),
canvas.setAttribute("height", "1200"),
  context = canvas.getContext("2d");

// 1. Alap adatok
// 1.1 Pálya 
let canvasWidth = 500 ; //jétkterület szélessége

// 1.2 Pinvin 
let pinguinX = ((canvasWidth+250 )/2); // pinvin kiindulási pontja
let rightPressed = false ; // pingvin mozgatás ,jobb oldali gombnyomás
let leftPressed = false; // pingvin mozgatás ,jobb oldali gombnyomás. Az alapértelmezett érték mindkettőnél azért van, falsemert az elején nem nyomják meg a vezérlőgombokat.

// pingvin adatok:

// 2. Pingvin alap adatok

/** 
var pinguin = function (x,y){
  this.y = y ;
 this.point = 0;
};

// Balra néző pingvin alap prototipusa 
pinguin.prototype.drawLeft = function(){
  let base_image = new Image();
  base_image.src = "./picture/leftPinguin.png";
   context.drawImage(base_image, pinguinX, this.y,200,160);
};

// jobbra néző pingvin prototipusa
pinguin.prototype.drawRight = function(){
  let base_image = new Image();
  base_image.src = "./picture/rightPinguin.png";
   context.drawImage(base_image, pinguinX, this.y,1000,1000);
};

// Pingvin megrajzolása
var pingvin =new pinguin(400,1000);
pingvin.drawLfet();
pingvin.drawLRight();  */

function drawPinguinR (){
  let base_image = new Image();
  base_image.src = "./picture/rightPinguin.png";
   context.drawImage(base_image, pinguinX, 800,1000,1000);

};

function drawPinguinL(){
  let base_image = new Image();
  base_image.src = "./picture/leftPinguin.png";
   context.drawImage(base_image, pinguinX, 1000,200,160);
}




// 3. Eseményfigyelők


window.addEventListener("keydown", keyDownHandler, false); //Amikor a billentyűzet lenyomódik

window.addEventListener("keyup", keyUpHandler, false); // Amikor a billentyűzet lenyomása megszűnik

function keyDownHandler(event) {
  if (event.key == "Right" || event.key == "ArrowRight" || event.which === "39"){
    rightPressed = true;
  } else if ( event.key == "Left" || event.key == "ArrowLeft" || event.which === "17"){
    leftPressed = true;
  }
};

function keyUpHandler(event){
  if (event.key === "Right" || event.key == "ArrowRight" || event.which === "39"){
    rightPressed = false;
  } else if (event.key === "Left" ||event.key == "ArrowLeft" || event.which === "17"){
    leftPressed = false;
  };
};


// Pingvin mozgatás

 function draw(){
  drawPinguinL();

      if (rightPressed) {
        pinguinX += 7 ;
        console.log("léptem jobbra")
      } else if (leftPressed){
        pinguinX -= 7;
        console.log("léptem balra")
      };
 };

setInterval(draw, 10);
























/*function make_base() {
  var base_image = document.querySelector(".pingvin");
  context.drawImage(base_image, 0, 0,200,160);}
  
  make_base();*/

  /*function draw() {
    let base_image = new Image();
   base_image.src = "./picture/leftPinguin.png";
    context.drawImage(base_image, 100,100);
    console.log("OK");};*/
  