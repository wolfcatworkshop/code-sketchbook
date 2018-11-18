/*
#makevember day 16

A really quick sketch where I explore horizontal and vertical symmetry. 
Had a long day at work. :)


Federico
https://wolfcatworkshop.com

*/

function setup() {
  var canvas = createCanvas(480, 480);
  // Move the canvas so it’s inside my <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  rectMode(CENTER);
}

function draw() {
  noStroke();

  let spacing = 24;
  
  //draw grid
  for (var x = 0; x <= width/2; x+= spacing) {
   for (var y = 0; y <= height/2; y+= spacing) {
        
      //fill is random grey scale with some transparency       
      fill(random(x + y), 40)
      drawRect(x, y);
      }
    }
  
  
}


//draws rectangles on the four corners of the canvas
function drawRect(x, y){
  let size = 24;
  rect(x, y, size, size);                  // top left
  rect(width - x, y, size, size);          // top right
  rect(x, height - y, size, size);         // bottom left 
  rect(width - x, height - y, size, size); //bottom right
}