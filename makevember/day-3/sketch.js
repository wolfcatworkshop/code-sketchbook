/*
#makevember day 3

I started with the intention of making the pattern of overlapping circles
on a hexagonal lattice but when I animated it by increasing the radius
all these interesting patterns appeared, so I added a little slider
to navigate them.


On making a hexagonal grid:
the trick here is to use the vertical offset calculated with 
the sin() function and to draw the two sets of circles in a single
loop to keep it simple.


Federico

*/



var r = 20;    	//radius
var d = r * 2; 	//diameter
var yOffset; 	//vertical offset



function setup() {
  var canvas = createCanvas(480, 480);
 	// Move the canvas so it’s inside my <div id="sketch-holder">.
  	canvas.parent('sketch-holder');
  
  //slider
   	slider = createSlider(1, 4, 1, 0.01);
  	slider.style('width', '200px');
  	//attach slider to the div <div id="slide">
    slider.parent('slide'); 
  
  //description for slider effect
    paragraph = createP('radius multiplier');
  	//attach paragraph to the div <div id="slider-description">
  	paragraph.parent('slider-description');
  

  // this is the important calculation for the hexagonal grid, 
  // roughly sin(60 degrees) times the diameter of the circle
  	yOffset = sin(TWO_PI/6) * d;

  	noFill();
  
}

function draw() {
  	background(240);
  	stroke(0);
  	strokeWeight(0.25);
	
  for (var x = -d ; x <= width + d; x+= d){
    for (var y = -yOffset; y <= height + 2*yOffset; y+= yOffset * 2){
      
      
      //calculate the ratio for the radius using the slider value
      var radRatio = slider.value();
  	
      //ellipse width
      var w = (r * radRatio) * 2;   
      
      //draw two ellipses with the appropriate offsets
      ellipse(x, y, w);
      ellipse(x + r, y + yOffset , w)
      
    }
  }
 

  
  //modify radius multiplier description
  paragraph.html("radius multiplier = " + slider.value());

}









