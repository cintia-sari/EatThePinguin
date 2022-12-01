

var canvas = document.getElementById("viewport");
canvas.setAttribute("width", "1000"),
canvas.setAttribute("height", "1200"),
  context = canvas.getContext("2d");

// 1. Alap adatok
// 1.1 Pálya 
let canvasWidth = 500 ; //jétkterület szélessége

// 1.2 Pinvin 
let pinguinSizeX=200;
let pinguinSizeY=160;
let pinguinY = 800;
let pinguinX = ((canvasWidth+250 )/2); // pinvin kiindulási pontja
let rightPressed = false ; // pingvin mozgatás ,jobb oldali gombnyomás
let leftPressed = false; // pingvin mozgatás ,jobb oldali gombnyomás. Az alapértelmezett érték mindkettőnél azért van, falsemert az elején nem nyomják meg a vezérlőgombokat.
let pingvinO = (canvas.width-pinguinSizeX)/2;

// 1.3 halacska adatok
let fishRadius=70;
let fishSizeX =100; // hal méret az x tengelyen
let fishSizeY = 70;// hal méret az y tengelyen
let fishX = Math.random()*900; // képernyőn hol helyzekedjen el az x tengelyen méret max 900;
let fishY =0; //// képernyőn hol helyzekedjen el az y tengelyen méret max 1190 min-60;

let fx = 0; // hal mozgása az x tengelyen
let fy = -2; // hal mozgása az y tengelyen

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

// pingvin megrajzolás

function drawPinguinR (){
  let base_image = new Image();
  base_image.src = "./picture/rightPinguin.png";
   context.drawImage(base_image, pinguinX, pinguinY,1000,1000);

};

function drawPinguinL(){ //itt még hozzá kell adnom a HTMl-hez
  let base_image = new Image();
  base_image.src = "./picture/leftPinguin.png";
   context.drawImage(base_image, pinguinX, 1000,pinguinSizeX,pinguinSizeY);
}


// Hal rajzolás

function drawFish(){ //itt még hozzá kell adnom a HTMl-hez
  let fish_image = new Image();
  fish_image.src = "./picture/fish.png";
   context.drawImage(fish_image, fishX, fishY,fishSizeX,fishSizeY);
};

function drawFish2(){ //itt még hozzá kell adnom a HTMl-hez
  let fish_image2 = new Image();
  fish_image2.src = "./picture/2fish.png";
   context.drawImage(fish_image2, 100, 1100,fishSizeX,fishSizeY);
};



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
  context.clearRect(0, 0, canvas.width, canvas.height); // ettől nem mosódik el a pingvin miközbe megy.
  drawPinguinL();
  drawFish();

  fishX += fx;
  fishY -= fy;
 


      if (rightPressed) {
        pinguinX = Math.min( pinguinX+7,canvasWidth+300);
      } else if (leftPressed){
        pinguinX = Math.max( pinguinX-7, 0);
      };



console.log(fishY + fy > canvas.height-fishRadius);
console.log(fishX < pingvinO + pinguinSizeX);
 
 
 
     if(fishY + fy > canvas.height-fishRadius) {
        if(fishX > pingvinO && fishX < pingvinO + pinguinSizeX) {
            fy = -fy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
      
 };



const interval = setInterval(draw, 10);
























/*function make_base() {
  var base_image = document.querySelector(".pingvin");
  context.drawImage(base_image, 0, 0,200,160);}
  
  make_base();*/

  /*function draw() {
    let base_image = new Image();
   base_image.src = "./picture/leftPinguin.png";
    context.drawImage(base_image, 100,100);
    console.log("OK");};*/
  