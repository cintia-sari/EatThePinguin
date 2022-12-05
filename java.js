

var canvas = document.getElementById("viewport");
canvas.setAttribute("width", "1000"),
canvas.setAttribute("height", "1200"),
  context = canvas.getContext("2d");

// 1. Alap adatok

// 1.1 Pálya 
let canvasWidth = 500 ; //jétkterület szélessége

// 1.2 Pingvin 
let pinguinSizeX=200;
let pinguinSizeY=160;
let pinguinY = 800;
let pinguinX = ((canvasWidth+250 )/2); // pinvin kiindulási pontja
let rightPressed = false ; // pingvin mozgatás ,jobb oldali gombnyomás
let leftPressed = false; // pingvin mozgatás ,jobb oldali gombnyomás. Az alapértelmezett érték mindkettőnél azért van, falsemert az elején nem nyomják meg a vezérlőgombokat.


// 1.3 halacska adatok

let fishSizeX =100; // hal méret az x tengelyen
let fishSizeY = 70;// hal méret az y tengelyen
let fishX = Math.random()*900; // képernyőn hol helyzekedjen el az x tengelyen méret max 900;
let fishY =0; //// képernyőn hol helyzekedjen el az y tengelyen méret max 1190 min-60;
let fx = 0; // hal mozgása az x tengelyen kiinduló pont
let fy = -2; // hal mozgása az y tengelyen kiinduló pont


// 1.4 eredmény
let score=0;
let isGameOver= false;
// 2. elemek megrajzolása

// 2.1 pingvin megrajzolás

function drawPinguinR (){
  let base_image = new Image();
  base_image.src = "./picture/rightPinguin.png";
   context.drawImage(base_image, pinguinX, pinguinY,1000,1000);

};

function drawPinguinL(){ //itt még hozzá kell adnom a HTMl-hez a másik oldalra dölő pingvint
  let base_image = new Image();
  base_image.src = "./picture/leftPinguin.png";
   context.drawImage(base_image, pinguinX, 1000,pinguinSizeX,pinguinSizeY);
}


// 2.2  Hal rajzolás

function drawFish(){ 
  let fish_image = new Image();
  fish_image.src = "./picture/fish.png";
   context.drawImage(fish_image, fishX, fishY,fishSizeX,fishSizeY);
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

function drawScore() {
  context.font = "30px Arial";
  context.fillStyle = "#000000";
  context.fillText(`Score: ${score}`, 10, 40);
};

function GameOver(){
  //alert("GAME OVER");
 // document.location.reload();
  //clearInterval(interval);
  context.font = "90px Arial";
  context.fillStyle = "#000000";
  context.fillText(`Game Over, Score: ${score}`,90,500);
};

function game(){
drawFish();
fishY -= fy; // hal mozgásának sebessége

 // itt még picit lehet finomítani
 if(( (fishX-pinguinX) < (pinguinSizeX/2)) && (-(pinguinSizeX/2)) <  (fishX-pinguinX) && ((fishY-120) === pinguinY)){
  console.log("elkapta");
  score= score+1;
  fishX = Math.random()*900;
  fishY = 0;
}else if (fishY > canvas.height){
  isGameOver=true;
};

function reset(){
  isGameOver=false;
  score=0;
  fishX = Math.random()*900;
  fishY = 0;
}


};

function draw(){
  // jobbra / balra gomb megnyomásakkor mennyivel menjen odébb a pingvin az x tengelyen
  if (rightPressed) {
    pinguinX = Math.min( pinguinX+7,canvasWidth+300);
  } else if (leftPressed){
    pinguinX = Math.max( pinguinX-7, 0);
  };

  if(!isGameOver){
    context.clearRect(0, 0, canvas.width, canvas.height); // ettől nem mosódik el a pingvin miközbe megy.
    drawPinguinL();
    drawScore();
    game();
  }else{
    GameOver();
    reset();
  }
};

const interval = setInterval(draw, 10);
