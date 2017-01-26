

var Lemming = function(x,y,id, grid) {
  this.id = id;
  this.container = document.createElement('div');
  this.lemming = document.createElement('img');
  this.container.setAttribute('id', 'container' + id);
  this.lemming.setAttribute('id', 'player' + id);
  this.lemming.setAttribute('class', 'player');
  this.container.appendChild(this.lemming);
  var body = document.getElementById('body');
  body.appendChild(this.container);
  this.container.style.width ="20px";
  this.container.style.height ="30px";
  this.container.style.border= "1px solid green";
  this.lemming.style.top ="591px";
  this.lemming.style.left ="423px";
  this.lemming.src = 'lemming-sprite.png';
  this.lemming.style.position = "absolute";
  this.container.style.position = "absolute";
  this.container.style.overflow = "hidden";
  this.lemming.style.transform = "scale(3, 3)";
  this.container.style.transform = "scale(1, 1)";  // annimation dans l'autre sens scale(-1, 1)
  this.container.direction = 'left';   // checker la direction left-right
  this.container.style.left = x + 'px';
  this.container.style.top = y + 'px';
  this.x = x ;
  this.y = y ;
  this.currentAnimation;
  this.indexAnnimation;
  this.animationTimeout;
  this.movementTimeout;
  this.grid = grid;
};



Lemming.prototype.digging = function(index,spriteAction,sens){
  this.currentAnimation = spriteAction;
  this.indexAnnimation = index;
  this.container.style.width = spriteAction[index].size.width + 'px';
  this.container.style.height = spriteAction[index].size.height + 'px';
  this.lemming.style.left = spriteAction[index].sprite.left + 'px';
  this.lemming.style.top = spriteAction[index].sprite.top + 'px';
  clearTimeout(this.animationTimeout);

   this.animationTimeout = window.setTimeout(function(){

   if(digX[index+1]){
     this.digging(index + 1,spriteAction);
   }else{
     this.reverseScale();

     this.digging(0,spriteAction);
   }
 }.bind(this), 200);
};


// fuction reverseScale to switch animation way left right

Lemming.prototype.reverseScale = function() {
  if (this.container.style.transform == "scale(1, 1)") {
    this.container.style.transform = "scale(-1,1)";
  } else {
      this.container.style.transform = "scale(1, 1)";
  }
};


/*
------------------------------------------
-------- Factorisation Animation  --------
----------------doBetter------------------
*/

Lemming.prototype.animating = function(index,id, spriteAction, loop){
 this.currentAnimation = spriteAction;
 this.indexAnnimation = index;

 this.container.style.width = spriteAction[index].size.width + 'px';
 this.container.style.height = spriteAction[index].size.height + 'px';
 this.lemming.style.left = spriteAction[index].sprite.left + 'px';
 this.lemming.style.top = spriteAction[index].sprite.top + 'px';
 clearTimeout(this.animationTimeout);



  this.animationTimeout = window.setTimeout(function(){
   if(spriteAction[index+1]){
     this.animating(index + 1,id, spriteAction, loop);
   }else{
     if (loop) {
       this.animating(0,id, spriteAction,loop);
     }
   }
}.bind(this), 200);
};





Lemming.prototype.movement = function(x,y) {
  // clearTimeout(this.movementTimeout);
  var index = this.indexAnnimation;
  this.stopMovement();
  this.x += x;
  this.y += y;

  this.movementTimeout = setTimeout(function () {
    this.container.style.left = this.x + 'px';
    this.container.style.top = this.y + 'px';
    // console.log(this.getBoundaries());
    var yo = this.getBoundaries();
    // console.log(yo.bottom);
    var hit = this.grid.isHitting(yo);
    // console.log(hit);

    if(hit===false){
      console.log('yo');
      this.movement(x,y);
      // this.animating(0,index,walk,true);
    }else{ if (hit===true) {
      this.movement(3,0);
      this.animating(0,index,walk,true);
    }

    }

  }.bind(this), 50);

};

Lemming.prototype.stopMovement = function(x,y) {
  clearTimeout(this.movementTimeout);

};

Lemming.prototype.getBoundaries = function () {
  var annimation = this.currentAnimation[this.indexAnnimation];

  return {
    left : this.x,
    top : this.y,
    right: this.x + annimation.size.width,
    bottom: this.y + annimation.size.height
  };
};










// // all lemmings + sidemove
//
// var i = 0;
// var lemmingLeft = 250;
// var  lemmings= [];
// var x = setInterval(function () {
//   if (i<10) {
//     var lem = new Lemming(lemmingLeft,40,i);
//     lemmings.push(lem);
//      lemmingLeft = lemmingLeft + 20;
//     lem.animating(0,i,fall,true);
//     lem.movement(0,3);
//     i++;
//
//   } else {
//     clearInterval(x);
//   }
// }, 1000);




// setTimeout(function () {
// if (lemmings[1]) {
//   lemmings[1].animating(0,1,fall,true)
//   lemmings[1].movement(0,3);
// }
//  }, 3000);
