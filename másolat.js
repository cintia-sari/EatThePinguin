function drawPinguin(){

  if(keyDownRight){
function drawPinguinR (){
  let base_image = new Image();
  base_image.src = "./picture/rightPinguin.png";
   context.drawImage(base_image, pinguinX, pinguinY,pinguinSizeX,pinguinSizeY);

}
}else{
function drawPinguinL(){ //itt még hozzá kell adnom a HTMl-hez a másik oldalra dölő pingvint
  let base_image = new Image();
  base_image.src = "./picture/leftPinguin.png";
   context.drawImage(base_image, pinguinX, pinguinY,pinguinSizeX,pinguinSizeY);
}};

}