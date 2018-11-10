
/*
#makevember day 10

This sketch creates a halftone effect using crosses on an offset grid. 
I'm using perlin noise instead of random to create a smooth transition
between the cross sizes. 

Using https://github.com/bit101/quicksettings for the GUI 
Using https://github.com/zenozeng/p5.js-svg   for SVG export



Federico
https://wolfcatworkshop.com

*/


var canvas;
var panel; //GUI object


function setup() {
  //create canvas using SVG library 
  canvas = createCanvas(480, 480-24, SVG);

  //create quicksettings panel
  panel = QuickSettings.create(120, 90, "Settings")
            .addRange ("size randomizer",  0,  1000,   0,  0.0001 )      // slider to move through perlin noise space
            .addRange ("stroke weight",         1,   34,    6,  0.1)     // stroke weight
            .addButton("download svg", downloadSVG)                      // download button
            .addButton("download png", downloadPNG)                      // download button
            .addHTML  ("Navigation","<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-9/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-11/>next &#62&#62</a>")
            ;
   

}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(panel.getValue("stroke weight"));
  noFill();
  makeCrosses();
}


//makes grid of crosses with vertical symmetry and with sizes assigned using perlin noise

function makeCrosses(){
  
  var spacing = 24;  //spacing between shapes

  //nested loops to draw the grid
  for(var x = spacing; x < width/2; x += spacing){
    for(var y = spacing; y < height - spacing  ; y += spacing * 2){
    
      //assign a diameter based on perlin noise with offset given by the slider
      var noiseDriver = panel.getValue("size randomizer");
      var d = noise(x + y + noiseDriver) * 28;

      //left side crosses
      cross(x,            y,            d, d);
      cross(x + spacing/2,y + spacing , d, d);
      
      //right side crosses
      cross(width -x,            y,            d, d);
      cross(width -x - spacing/2,y + spacing , d, d);
    }
  }

 //draw center crosses separately to avoid overlapping shapes on svg export
    for(var centerY = spacing; centerY < height; centerY += spacing*2){
      var noiseDriver = panel.getValue("size randomizer");
      var centerD = noise( centerY * noiseDriver) * spacing;
      
      cross(width/2, centerY, centerD, centerD);
    }
   
  }



//makes a cross shape at x, y, with widht(h) and height(h)
function cross(x, y, w, h){
  //adjust ratio
  w = w * 0.6;
  h = h * 0.6;
  strokeCap(SQUARE);
  line(x,      y - h, x,     y + h);
  line(x - w,  y,     x + w, y    );
}


//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG(){
  save('halftoneCross.svg');
  }

function downloadPNG(){
 saveSVG('halftoneCross', 'png');
  }

