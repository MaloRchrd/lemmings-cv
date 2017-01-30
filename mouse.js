var aimContainer = document.getElementById('mouseContainer');
var aim = document.getElementById('aim');

aimContainer.style.position = "absolute";
aimContainer.style.overflow = "hidden";
aimContainer.style.width = aimSprite[0].size.width;
aimContainer.style.height = aimSprite[0].size.height;

aim.style.position = "absolute";
aim.style.left = aimSprite[0].sprite.left;
aim.style.top = aimSprite[0].sprite.top;

// // console.log(aim.style.top);
// var aimX = 0;
// var aimY = 0;


var mousePosition = function(e) {
  var mouse = e;
  mouseX  = mouse.clientX;
  mouseY  = mouse.clientY;

    var aimPosition = aimContainer.style.top;
    aimContainer.style.left = (mouseX -20) + "px";
    aimContainer.style.top = (mouseY -15) + "px";

};

 window.addEventListener('mousemove',mousePosition);
