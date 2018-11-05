
/*
#makevember day 5

I'm using an older version of p5js that is compatible with Zenozeng's svg library.
This is a simple pattern generator, one slider changes the radius of the polygon
and the other one the number of corners. 

Federico

*/


//ui elements
var slider;
var slider2;
var button;
var canvas;

function setup() {
  //create canvas using SVG library 
    canvas = createCanvas(480, 480, SVG);
 	
  //slider for radius 		(min, max, [initial value], [step])
   	slider = 	createSlider(10, 	width, 		80, 		1);
  	slider.style('width', '200px');
  	// attach slider to the div <div id="slide">
    slider.parent('slide'); 

   //slider for number of corners (min, max, [initial value], [step])
    slider2 = 		  createSlider(3,    8,    8,         		1);
  	slider2.style('width', '200px');
  // attach slider to the div <div id="slide">
    slider2.parent('slide'); 


   //description for slider changes
    sliderDescription = createP();
  	//attach paragraph to the div <div id="slider-description">
  	sliderDescription.parent('slider-description');
 
  //button
  	button = createButton('download SVG');
  	button.parent('myButton');
  	button.mousePressed(downloadSVG);


}

function draw() {
  	background(240);
  	stroke(0);
  	strokeWeight(0.5);
  	noFill(0);


  	//make a grid of polygons with two nested loops
  	var step = 48; //step size

  	for (var x = -step; x <= width + step; x += step){
 		for (var y = -step; y <= height + step; y += step){
    		
    		var radius  = slider.value(); //change radius with first slider
    		var corners = slider2.value(); //change number of corners with second slider	

    		makePoly(x, y, radius, corners);
        }
  	}

  	//update slider description
  	sliderDescription.html('radius = ' + slider.value() + ' - ' + 'Sides =  ' + slider2.value());

 
}



//aditional functions

//Make a polygon with center at x, y with a given radius and number of points

function makePoly(x, y, radius, numPoints){
  
	push();
 	translate(x, y);
    	beginShape();
	  	for (var a = 0; a <= TWO_PI; a += TWO_PI/numPoints){
	        r = radius; //radius
	        //polar coordinates
	        x = r * cos(a);	
	        y = r * sin(a);
	 
	        vertex(x, y);
	        
	  	}
  		endShape();
  	pop(); 


}


//save svg when the button is pressed, requires svg library
function downloadSVG(){
 save('pattern-' + 'slider.value() + '-' + slider2.value() + '.svg');

}
