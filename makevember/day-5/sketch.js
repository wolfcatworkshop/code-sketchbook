
/*
#makevember day 5

I wanted something with lots of eyes. To get close to eye shape 
I just draw a squished ellipse. Vertical symmetry is accomplished
by drawing the x position at (width - x) 
Federico

*/

//color palette array
var colors = [];


function setup() {
  var canvas = createCanvas(480, 480);
 	// Move the canvas so it’s inside my <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  

  //palette
	colors[0]  = color('#49443e'); 		//brown-ish
	colors[1]  = color('#080603');		//black
	colors[2]  = color('#f4401e');		//red orange
  	colors[3]  = color('#f69004');	  	//dark orange
  	colors[4]  = color('#f3e7df');	  	//off white
  
  
  //button to redraw canvas
  	button = createButton('redraw');
  	button.parent('myButton');
  	button.mousePressed(draw);
  
  
}

function draw() {
  background(colors[2]);
  strokeWeight(0.25);

  makeGrid(40, 2);
  makeGrid(40, 1);
  makeGrid(40, 0.75);
  makeGrid(40, 0.5);
  makeGrid(40, 0.25);
  makeGrid(40, 0.1);
  
  noLoop();
}


//makes a symmetric grid of ellipses with a given step size and a ratio for the size
//of each ellipse
function makeGrid (step, ratio) {
			
		var shapeSize = step * ratio;

		for (var x = 0; x <= width/2; x += step) {
			for (var y = 0; y <= height; y+= step) {
				//choose random colors
				fill(randColor());
				stroke(randColor());

				//creates some variaton in shapesizes
				shapeSize = step * ratio * random(0, 2);
				
				//draw left side
				ellipse(x, y, shapeSize);
        		ellipse(x, y, shapeSize, shapeSize * 0.5); //eye
        
        		//draw right side, inverted for symmetry
        		ellipse(width - x, y, shapeSize);
        		ellipse(width - x, y, shapeSize, shapeSize * 0.5); //eye
			}
		}

	}


//pick a random color from the array
function randColor() {
	var index = floor(random(0, 5));
  	var newColor = colors[index];
	return newColor;
}

