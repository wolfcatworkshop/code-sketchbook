/*
#makevember day 17

Trying to implement a hexagonal lattice (or triangular lattice) using
sqrt(30) instead of sine and cosine.


From wikipedia "The hexagonal lattice with horizontal rows is a special 
case of a centered rectangular (i.e. rhombic) grid, with rectangles which 
are √3 times as high as wide."

https://en.wikipedia.org/wiki/Hexagonal_lattice


Federico
https://wolfcatworkshop.com

*/

function setup() {
  var canvas = createCanvas(480, 480);
  // Move the canvas so it’s inside my <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  frameRate(8);
 
}

function draw() {
  
  
  let yStep = 40;
  let xStep = yStep * sqrt(3); 
  
  for(var x = 0; x <= width + xStep; x += xStep){
    for(var y = 0; y <= height; y += yStep){
      noStroke();
      fill(random(255), 40);
        hquad(x, y, yStep);
        ellipse(x, y, yStep);
      fill(random(255), 40);
        hquad  (x + xStep/2, y + yStep/2, yStep);
        ellipse(x + xStep/2, y + yStep/2, yStep)
    }
  }
  
}


//drasws the basic rhombus with center at x, y and a given height
function hquad(x, y, hheight){
  let h = hheight/2;   //half the height
  let w = h * sqrt(3); //half the width
  quad(x, y - h, 
       x + w, y, 
       x, y + h, 
       x - w, y);
}