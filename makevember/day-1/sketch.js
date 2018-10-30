//draw circles on a hexagonal grid 

var r; //radius
var hSpacing;     //horizontal spacing
var vSpacing = r; //vertical spacing is radius
var hOffset;      //horizontal offset of the second grid
var vOffset;      //vertical offset of the second grid

function setup() {
  
  r = 40;
  hSpacing = cos(TWO_PI/12) * r * 2 ; 
  hOffset  = cos(TWO_PI/12) * r;
  vOffset  = sin(TWO_PI/12) * r;
  
  //to center the circles on the canvas
  var myWidth  = hSpacing * 6;
  var myHeight = r * 2 * 6;
   
  var canvas = createCanvas(myWidth, myHeight);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  background(255, 0, 200);	
	
	
}

function draw() {
  	background(240);
   	// fill(100, 30);
  	noFill();	
  	stroke(0, 100);
  
	for (x =  -hSpacing; x <= width + hSpacing * 2; x = x + hSpacing){
    for (y = -r*2; y < height + r*2 ; y += r){
    // var d = sin(frameCount * 0.009 + x) * 100; //diameter  
	  var d = 40;
  	ellipse(x, y, d);
    ellipse(x + hOffset, y + vOffset, d);  
    
    }
  }


}



