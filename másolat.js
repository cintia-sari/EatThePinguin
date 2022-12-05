// elkapta / nem kapta el vizsgálása: 
function game (){
    drawFish();
    fishY -= fy; // hal mozgásának sebessége
    isGameOver=false;
   // itt még picit lehet finomítani
   if(( (fishX-pinguinX) < (pinguinSizeX/2)) && (-(pinguinSizeX/2)) <  (fishX-pinguinX) && ((fishY-120) === pinguinY)){
    console.log("elkapta");
    score= score+1;
    
  
  
  }else if ((fishY > canvas.height) && !isGameOver){
    isGameOver= true;
    // drawGameOver();
    //alert("GAME OVER");
     //document.location.reload();
     //clearInterval(interval);
  }
  };
  
  function reset(){
    isGameOver=false;
    score=0;
  }
  
  // 4. Pálya megrajzolása:
  
   function draw(){
   // context.clearRect(0, 0, canvas.width, canvas.height); // ettől nem mosódik el a pingvin miközbe megy.
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
          console.log(isGameOver)
        }else {
          isGameOver= ture;
          console.log(isGameOver)
          drawGameOver();
          reset();
        }
  
      };
  