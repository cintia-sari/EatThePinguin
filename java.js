

var canvas = document.getElementById("viewport"),
  context = canvas.getContext("2d");

make_base();

function make_base() {
  var base_image = document.querySelector(".pingvin");
  context.drawImage(base_image, 0, 0,20,20);
}

make_base();
