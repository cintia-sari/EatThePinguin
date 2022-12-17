
var canvas = document.getElementById("viewport");
canvas.setAttribute("width", "1000"),
canvas.setAttribute("height", "1200"),
  context = canvas.getContext("2d");

// 1. Basic Data

// 1.1 game field 
let canvasWidth = 500 ; //game fiel widht

// 1.2 Pinguin datas
let pinguinSizeX=200;
let pinguinSizeY=160;
let pinguinY = 1000;
let pinguinX = ((canvasWidth+250 )/2); // pinvin standpingvin mozgatás ,jobb oldali gombnyomásing point
let rightPressed = false ; // penguin movement, right button press
let leftPressed = false; // penguin movement, left button press. The default value for both is because the control buttons are not pressed at the beginning.
let px =3; //speed of penguin movement on the x-axis

// 1.3 fish datas

let fishSizeX =100; // fish size on the x-axis
let fishSizeY = 70;// fish size on the y-axis
let fishX = Math.random()*900; // on the screen, where should the fish be located on the x axis, size max 900;
let fishY =0; // on the screen, where should it be located on the y axis, size max 1190 min-60;
let fx = 0; // speed of fish movement on the x-axis
let fy = -2; // speed of fish movement on the y-axis


// 1.4 result
let score=0;
let isGameOver= false;
let keyDownRight= true; // right to left looking penguin alternation
let enterPressed= false; // when the game is over, you can load it again with enter.

// 2. drawing elements


// 2.1 Penguin drawing

function drawPinguin (){
  let base_image = new Image();
  if(keyDownRight){
  base_image.src = "./picture/rightPinguin.png";
  } else{
    base_image.src = "./picture/leftPinguin.png";
  }

  context.drawImage(base_image, pinguinX, pinguinY,pinguinSizeX,pinguinSizeY);
}
// 2.2 Fish drawing

function drawFish(){ 
  let fish_image = new Image();
  fish_image.src = "./picture/fish.png";
   context.drawImage(fish_image, fishX, fishY,fishSizeX,fishSizeY);
};

// 3. Event monitors

window.addEventListener("keydown", keyDownHandler, false); //When the keyboard is pressed

window.addEventListener("keyup", keyUpHandler, false); // When the keyboard stops being pressed

function keyDownHandler(event) {
  if (event.key == "Right" || event.key == "ArrowRight" || event.which === "39"){
    rightPressed = true;
    keyDownRight = true;
  } else if ( event.key == "Left" || event.key == "ArrowLeft" || event.which === "17"){
    leftPressed = true;
    keyDownRight = false;
  }  else if (event.key === "Enter"){
    enterPressed = true;
  };
};

function keyUpHandler(event){
  if (event.key === "Right" || event.key == "ArrowRight" || event.which === "39"){
    rightPressed = false;
  } else if (event.key === "Left" ||event.key == "ArrowLeft" || event.which === "17"){
    leftPressed = false;
  } else if (event.key === "Enter"){
    enterPressed = false;
  };
};

// 4. Other functions belonging to the game

// 4.1 printout of result
function drawScore() {
  context.font = "50px Cooper black";
  context.fillStyle = "#055C74";
  context.fillText(`Score: ${score}`, 10, 60);
};

//4.2 Write out the text at the end of the game
function GameOver(){
  context.font = "90px Cooper black";
  context.fillStyle = "#055C74";
  context.fillText(`Game Over`,240,(canvas.height/2)-130);
  context.fillStyle = "#FA5858"
  context.fillText(`Score: ${score}`,320,canvas.height/2);
  context.font = "35px Cooper black";
  context.fillStyle = "#055C74"
  context.fillText(`If you want to play one more time, press the Enter.`,40, 700)
};

// 4.3 Reload game
function reset(){
  if (enterPressed){
    document.location.reload();
    clearInterval(interval);
  };
};


// 4.4 What should happen if the penguin catches or does not catch the fish.
function game(){
drawFish();
fishY -= fy; // speed of fish movement

 if(( (fishX-pinguinX) < (pinguinSizeX)) && (-(pinguinSizeX/2)) <  (fishX-pinguinX) &&(fishY > pinguinY && fishY <1100 )){ //when the penguin and the fish meet
  score= score+1;
  fishX = Math.random()*900;
  fishY = 0;
  fy = fy-0.5; // this is how much the fish accelerates per round
  px = px+0.5; // this is how much the penguin accelerates per round
}else if (fishY > canvas.height){ // when the penguin loses the fish
  isGameOver=true;
};
};




// 5. game progress
function draw(){

  // when pressing the right / left button, how far the penguin should go on the x-axis
  if (rightPressed) {
    pinguinX = Math.min( pinguinX+px,canvasWidth+300);
  } else if (leftPressed){
    pinguinX = Math.max( pinguinX-(px), 0);
  };

  if(!isGameOver){
    context.clearRect(0, 0, canvas.width, canvas.height); // this does not wash away the penguin and the fish.
    drawPinguin();
    drawScore();
    game();
  }else{
   GameOver();
   reset();
  }
};




const interval = setInterval(draw, 10); // at what intervals set interval reload the draw function. This makes it look like the elements are actually moving.
