var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.1)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(500, 200, 300, 500);
// c.fillStyle = 'rgba(0, 0, 255, 0.7)';
// c.fillRect(200, 700, 150, 200);

//line

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = 'rgba(100, 30, 115, 1)';
// c.stroke();


//arc /Circle



// for (var i = 0; i < 300; i++){
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//
//
// c.beginPath();
// c.arc (x, y, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'green';
// c.stroke();
// }

var mouse = {
  x: undefined,
  y: undefined,
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
  '#000000',
  '#03cdcd',
  '#d117d1',
  '#f0f019',
  '#f2f2f2',
];


window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});


function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;

  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color
    c.fill();
  }


  this.update = function() {
     if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
       this.dx = -this.dx;
     }

     if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
       this.dy = -this.dy;

     }

     this.x += this.dx;
     this.y += this.dy;


     //interaction stuff goes here
     if (mouse.x - this.x < 50  && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {

       if (this.radius < maxRadius){
       this.radius += 1;
}
     } else if (this.radius > minRadius) {
        this.radius -= 1;
     }


     this.draw();
  }

}

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;

var circleArray = [];

// for (var i = 0; i < 800; i++) {
//   var radius = Math.random() * 3 + 1 ;
//   var x = Math.random() * (innerWidth - radius * 2) + radius;
//   var y = Math.random() * (innerHeight - radius * 2) + radius;
//   var dx = (Math.random() - 0.5);
//   var dy = (Math.random() - 0.5);
//   circleArray.push(new Circle(x, y, dx, dy, radius));
//
// }

function init(){

  circleArray = [];

  for (var i = 0; i < 1500; i++) {
    var radius = Math.random() * 3 + 1 ;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 2);
    var dy = (Math.random() - 2);
    circleArray.push(new Circle(x, y, dx, dy, radius));

  }

}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }



}


init();
animate();
