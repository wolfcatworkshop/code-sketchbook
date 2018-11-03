/*
#makevember day 2

I made a function to draw the animated eye where I struggled to create the eyelids
using bezierVertex. Then I drew two grids offset from each other. 
Palette inspired by baby Mario from yoshi's island I found here
https://www.instagram.com/p/BgCcOKAlmog/

Federico

*/
//color palette array
var colors = [];

function setup() {
  var canvas = createCanvas(480, 480);
 	// Move the canvas so it’s inside my <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  
  //palette
	colors[0]  = color('#49443e'); 		//brown
	colors[1]  = color('#080603');		//black
	colors[2]  = color('#f4401e');		//red orange
  colors[3]  = color('#f69004');	  //dark orange
  colors[4]  = color('#f3e7df');	  //off white
  
}

function draw() {
  background(colors[3]);
 
  //grid 1 
  for (var x = 0; x <= width; x += 80){
    for(var y = 0; y <= height; y += 80){
      blinkingEye(x, y, 60, 0);  
    }
  }
  
  
   //grid 2, offset
  for (var x2 = 40; x2 <= width; x2 += 80){
    for(var y2 = 40; y2 <= height; y2 += 80){
      blinkingEye(x2, y2, 60, 25);  
    }
  }
  
  
  
}



// this function draws a single eye with the center at x, w, with a width of d
// the offset is for the the animation
function blinkingEye(x, y, d, offset){
  
  var r = d/2; //divide diameter by 2 to obtain radius
  
  //animate the eyelids by moving the anchors up and down
  var a = abs(sin((frameCount+offset)  * 0.05) * r);  
	
  
  //eye background
		fill(colors[4]); 
  	ellipse(x, y, d, d * 0.7 );

  //iris
  	fill(colors[2]); 
  	ellipse(x, y, r);
  
  //pupil
  	fill(colors[1]);
  	ellipse(x, y, r * 0.5);
 
  //top eyelid
  fill(colors[0]);
  beginShape();
		vertex(x -r, y); //anchor point
		bezierVertex(x-r, y-r , 	x+r, y-r , 	x+r, y);
  	bezierVertex(x+r, y-r +a, x-r, y-r+a, x-r, y);
								//control, control, anchor
  endShape();
  
  //bottom eyelid
  beginShape();
		vertex(x-r, y); //anchor point
		bezierVertex(x-r, y+r , x+r, y+r, x+r, y);
  	bezierVertex(x+r, y+r -a, x-r, y+r-a, x-r, y);
								//control, control, anchor
  endShape();


}


