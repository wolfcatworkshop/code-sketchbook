
/*
#makevember day 7

This one is a mashup between day 3 and day 6. The day 3 sketch did only circles but
with this one I added the ability to use any polygon on a hexagonal grid. Naturally polygons with
sides 3, 6, 12 make the coolest patterns but there is some interesting stuff elsewhere.

Using https://github.com/bit101/quicksettings for the GUI 
Using https://github.com/zenozeng/p5.js-svg   for SVG export


Federico

*/


var canvas;
var panel; //GUI object

//drawing variables
var r = 20;     //radius
var d = r * 2;  //diameter
var yOffset;  //vertical offset



function setup() {
  //create canvas using SVG library 
    canvas = createCanvas(480, 480, SVG);

  //create quicksettings panel
  panel = QuickSettings.create(120, 90, "Settings")
            .addRange ("radius ratio",           1,  5,  1, 0.01 )       // radius slider
            .addRange ("number of sides",  3, 14,  6, 1   )              // n-gon slider
            .addRange ("stroke weight",          0.2,  34, 0.2, 0.1 )    // stroke weight
            .addButton("download svg", downloadSVG)                      // download button
            .addButton("download png", downloadPNG)                      // download button
            .addHTML  ("Navigation","<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-6/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-8/>next &#62&#62</a>")
            ;

  // this is the important calculation for the hexagonal grid, 
  // roughly sin(60 degrees) times the diameter of the circle
    yOffset = sin(TWO_PI/6) * d;

}

function draw() {
  	background(240);
    stroke(0);
    strokeWeight(panel.getValue("stroke weight"));
    noFill();


    for (var x = -d ; x <= width + d; x+= d){
    for (var y = -yOffset; y <= height + 2*yOffset; y+= yOffset * 2){
      
      //find out the ratio for the radius using the slider value, a ratio of 1 would
      //be tightly packed circles
      var radRatio = panel.getValue('radius ratio');

      //get number of sides for polygon
      var nSides = panel.getValue('number of sides');
      
      //ellipse width
      var w = (r * radRatio) * 2;   
      
      //draw two polygons with the appropriate offsets
      polygon(nSides, x,     y,            w/2);
      polygon(nSides, x + r, y + yOffset , w/2);
    }
  }
    
}



// draw a regular polygon with n sides
function polygon(n, x, y, radius) {
  beginShape();
  for(var angle = 0; angle < TWO_PI; angle+= TWO_PI / n) {
    var px = x + sin(angle) * radius;
    var py = y - cos(angle) * radius;
    vertex(px, py);
  }
  endShape(CLOSE);
}


//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG(){
 save('polygonPattern.svg');
  }

function downloadPNG(){
 saveSVG('polygonPattern', 'png');
  }
