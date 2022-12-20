// 0. canvas setting
let canvas = document.querySelector("#viewport");
canvas.setAttribute("width", "1000"),
canvas.setAttribute("height", "1200"),
  context = canvas.getContext("2d");

// 1. Basic settings

// 1.1 game field 
let canvasWidth = 500 ; //game fiel widht

// 1.2 Pinguin settings
let pinguinSizeX=200;
let pinguinSizeY=160;
let pinguinY = 1000;
let pinguinX = ((canvasWidth+250 )/2); // penguin's starting point
let rightPressed = false ; // penguin movement, right button press
let leftPressed = false; // penguin movement, left button press. The default value for both is because the control buttons are not pressed at the beginning.
let px =3; //speed of penguin movement on the x-axis

// 1.3 fish settings
let fishSizeX =100; // fish size on the x-axis
let fishSizeY = 70;// fish size on the y-axis
let fishX = Math.random()*900; ; // on the screen, where should the fish be located on the x axis, size max 900;
let fishY =0; // on the screen, where should it be located on the y axis, size max 1190 min-60;
let fx = 0; // speed of fish movement on the x-axis
let fy = -2; // speed of fish movement on the y-axis
let latestfishX;

// 1.4 result
let score=0;
let isGameOver= false;
let keyDownRight= true; // right to left looking penguin alternation
let clickPressed= false; // when the game is over, you can load it again with enter.

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
  if (event.key === "Right" || event.key === "ArrowRight" || event.which === "39"){
    rightPressed = true;
    keyDownRight = true;
  } else if ( event.key === "Left" || event.key === "ArrowLeft" || event.which === "17"){
    leftPressed = true;
    keyDownRight = false;
  };
};

function keyUpHandler(event){
  if (event.key === "Right" || event.key == "ArrowRight" || event.which === "39"){
    rightPressed = false;
  } else if (event.key === "Left" ||event.key == "ArrowLeft" || event.which === "17"){
    leftPressed = false;
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
  restartButton();
};

// 4.3 Restrart button
function restartButton() {
  document.querySelector(".restart-btn").style.visibility = "visible";
  document.querySelector(".restart-btn").addEventListener("click", function buttonClicked(){
    clickPressed= true;
  });
}

// 4.4 Reload game
function reset(){
  if (clickPressed){
    document.location.reload();
    clearInterval(interval);
  };
};


// 4.5 What should happen if the penguin catches or does not catch the fish.
function game(){
drawFish();
fishY -= fy; // speed of fish movement

 if(( (fishX-pinguinX) < (pinguinSizeX)) && (-(pinguinSizeX/2)) <  (fishX-pinguinX) &&((fishY+50) > pinguinY && fishY <1200 )){ //when the penguin and the fish meet
  new Audio ("../music/fish.wav").play();
  score= score+1;
  fishX=fishXCordinate();
  fishY = 0;
  fy = fy-0.5; // this is how much the fish accelerates per round
  px = px+0.8; // this is how much the penguin accelerates per round
}else if (fishY > canvas.height){ // when the penguin loses the fish
  new Audio ("../music/game-over.wav").play();
  isGameOver=true;
};
};

// 4.6 do not let the fish appear there or in its immediate vicinity
function fishXCordinate(){  
  do{
   fishX = Math.random()*900;
  }
  while(latestfishX-fishX > -200 && latestfishX-fishX < +200);
latestfishX=fishX; 
 return fishX;
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