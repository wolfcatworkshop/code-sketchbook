
/*
#makevember day 1

Drawing a series of overlaping grids. 
The color palette is inspired by old school risographs, 
I'm drawing a second shape with a slight offset to simulate
the charming misalingment of the machine. 

Federico

*/


//color palette array
var colorArray = [];



function setup() {
  var canvas = createCanvas(480, 480);
 	// Move the canvas so it’s inside my <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  noStroke();
  frameRate(4);
  rectMode(CENTER);
}

function draw() {

  //colors by name + color alpha variable
  var cAlpha     = 120;
	var fluoPink   = color(255,  72, 176, cAlpha);
	var yellow     = color(255, 232,   0, cAlpha);
	var medBlue    = color( 50,  85, 164, cAlpha);

  //colors assigned to array for random selection
  colorArray[0]  = medBlue; 
	colorArray[1]  = fluoPink;  
	colorArray[2]  = yellow;
	
  //first argument is the grid step size and second argument is
  //the ratio for drawing the rectangle contained within
  makeGrid(50, 1);
  makeGrid(50, 0.75);
  makeGrid(50, 0.50);
  makeGrid(50, 0.25);
 
}



//the makeGrid function draws a grid of shapes using two nested loops 
//with a given spacing and a ratio for the enclosed shape size

function makeGrid(step, ratio){
	
  for (var x = 0; x <= width; x += step) {
    for (var y = 0; y <= height; y+= step) {
      	
      	//pick a random color and use it for the fill
      	var randomColor = floor(random(0, colorArray.length));
    		fill(colorArray[randomColor]);
				
      	//rectangle size
      	var rectSize = step * ratio;
  			
      	//I'm drawing a second rectangle with a 1 px offset to 
      	//give the feeling of an old school risograph
      
      	rect(x, y, rectSize, rectSize);
      	rect(x + 1, y + 1, rectSize, rectSize);
			}
		}
}