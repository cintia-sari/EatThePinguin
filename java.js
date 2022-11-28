var canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');

make_base();

function make_base()
{
  base_image = new Image();
  base_image.src = './picture/leftPinguin.jpg';
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0);
  }
};


make_base();



















// pinguin figura
/*var pinguin = function(){
    this.ninckname = this.ninckname;
    this.x = x;
    this.y = y;
    this.img = ;
};



