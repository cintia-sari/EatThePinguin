
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
let pinguinY = 1000;
let pinguinX = ((canvasWidth+250 )/2); // pinvin kiindulási pontja
let rightPressed = false ; // pingvin mozgatás ,jobb oldali gombnyomás
let leftPressed = false; // pingvin mozgatás ,jobb oldali gombnyomás. Az alapértelmezett érték mindkettőnél azért van, falsemert az elején nem nyomják meg a vezérlőgombokat.
let px =3; //pingvin mozgásának sebessége az x tengelyen

// 1.3 halacska adatok

let fishSizeX =100; // hal méret az x tengelyen
let fishSizeY = 70;// hal méret az y tengelyen
let fishX = Math.random()*900; // képernyőn hol helyzekedjen el az x tengelyen méret max 900;
let fishY =0; //// képernyőn hol helyzekedjen el az y tengelyen méret max 1190 min-60;
let fx = 0; // hal mozgásának sebessége az x tengelyen
let fy = -2; // hal mozgásának sebessége az y tengelyen


// 1.4 eredmény
let score=0;
let isGameOver= false;
let keyDownRight= true; // pingvin jobbra balra kép váltásához
let enterPressed= false; // ha vége a játéknak az enterrel tudja újra tölteni.
// 2. elemek megrajzolása

// 2.1 pingvin megrajzolás

function drawPinguin (){
  let base_image = new Image();
  if(keyDownRight){
  base_image.src = "./picture/rightPinguin.png";
  } else{
    base_image.src = "./picture/leftPinguin.png";
  }

  context.drawImage(base_image, pinguinX, pinguinY,pinguinSizeX,pinguinSizeY);
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




// 4. Játékhoz tartozó egyébb függvéyek

// 4.1 eredmény kiiratása
function drawScore() {
  context.font = "30px Arial";
  context.fillStyle = "#000000";
  context.fillText(`Score: ${score}`, 10, 40);
};

//4.2 Jéték végén való szöveg kiiratása
function GameOver(){
  context.font = "90px Arial";
  context.fillStyle = "#000000";
  context.fillText(`Game Over`,240,(canvas.height/2)-80);
  context.fillText(`Score: ${score}`,310,canvas.height/2);
  context.font = "40px Arial";
  context.fillText(`If you want to play one more time, press thye Enter.`,40, 700)
};

// 4.3 Játék újratöltése
function reset(){
  if (enterPressed){
    document.location.reload();
    clearInterval(interval);
  };
};

// 4.4 Mi történjen, ha elkapja vagy nem kapja el a pingvin a halat.
function game(){
drawFish();
fishY -= fy; // hal mozgásának sebessége

 if(( (fishX-pinguinX) < (pinguinSizeX)) && (-(pinguinSizeX/2)) <  (fishX-pinguinX) &&(fishY > pinguinY && fishY <1100 )){ //amikor a pingvin és a hal találkozik
  score= score+1;
  fishX = Math.random()*900;
  fishY = 0;
  fy = fy-0.5; //ennyivel gyorsul a hal körönként
  px = px+0.5; // ennyivel gyorsul a pingvin körönként
}else if (fishY > canvas.height){ //mikor a pingvin elveszit a halat
  isGameOver=true;
};
};




// 5. játék menete
function draw(){
  // jobbra / balra gomb megnyomásakkor mennyivel menjen odébb a pingvin az x tengelyen
  if (rightPressed) {
    pinguinX = Math.min( pinguinX+px,canvasWidth+300);
  } else if (leftPressed){
    pinguinX = Math.max( pinguinX-(px), 0);// itt folytatni
  };

  if(!isGameOver){
    context.clearRect(0, 0, canvas.width, canvas.height); // ettől nem mosódik el a pingvin és a hal miközbe megy.
    drawPinguin();
    drawScore();
    game();
  }else{
   GameOver();
   reset();
  }
};


const interval = setInterval(draw, 10); // milyen időközönként töltse újra a set interval a draw függvényt. Ettől látszik úgy mintha tényelg mozognának az elemek.
