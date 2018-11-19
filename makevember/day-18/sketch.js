/*
#makevember day 18

Still working on the  hexagonal lattice (or triangular lattice) using
sqrt(30) instead of sine and cosine. This time the size of the shapes
is proportional to the distance from the mouse. 


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
  noStroke(0);
  background(0);
  fill(255);


  
  //steps
  let xStep = 20;
  let yStep = xStep * sqrt(3)/2;


  for(let x = 0; x <= width; x += xStep){
    for(let y = 0; y <= height + yStep; y += yStep * 2){
      
      //distance from point to mouse    
      let d = dist(mouseX, mouseY, x, y);
     
      //make the size relative to distance 
      let constrain = dist(0, 0, width, height)
      let len  = map(d, 0, constrain, 5, 40);
      
      rhombus(x, y, len);
      rhombus(x - xStep/2, y + yStep, len);
    
    }
  }
 
  
}


//drasws the basic rhombus with center at x, y and a given width
function rhombus(x, y, rWidth){
  let w = rWidth;
  let h = w * sqrt(3)/2;
    //point up
     triangle(x, y - h,
              x - w/2, y,
              x + w/2, y);
  
    //point down
    triangle( x, y + h,
              x - w/2, y,
              x + w/2, y);   
  
  }
