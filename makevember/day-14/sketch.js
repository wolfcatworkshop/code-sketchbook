/*
#makevember day 14

Draws a spiral with a number of sides. Fun for cutting slinky like
pieces of material. The magic line in the for loop is:

angle = (TWO_PI/numSides) * (i%numSides); 

This sketch was inspired by this tweet by Joe Beda and his
paper.js sketch
https://twitter.com/jbeda/status/928477822779142144

Using https://github.com/bit101/quicksettings for the GUI 
Using https://github.com/zenozeng/p5.js-svg   for SVG export



Federico
https://wolfcatworkshop.com

*/

var canvas;
var panel; //GUI object

function setup() {
  //create canvas using SVG library
  canvas = createCanvas(480, 480, SVG);

  //create quicksettings panel
  panel = QuickSettings.create(120, 90, "Settings")

    .addRange("stroke weight",        0.5,  20, 0.5, 0.01, refresh) // call refresh to redraw canvas with every change
    .addRange("number of points",       6, 200, 100,    1, refresh)    
    .addRange("number of sides",        3,  16,   7,    1, refresh) 
    .addButton("redraw", refresh)                                   // refresh/redraw button
    .addButton("download svg", downloadSVG)                         // download button
    .addButton("download png", downloadPNG)                         // download button
    .addHTML(
      "Navigation",
      "<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-13/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-15/>next &#62&#62</a>"
    );
}

function draw() {
  background(0);
  fill(255);
  translate(width/2, height/2);
 

  //get values
  strokeWeight(panel.getValue("stroke weight"));
  let numPoints = panel.getValue("number of points");
  let numSides  = panel.getValue("number of sides");


  //enclosing shape
  beginShape();
   for(let i = 0; i < numSides; i++){
    let angle = (TWO_PI/numSides) * (i); 
    let radius = numPoints + numPoints * 0.6;
    let x = radius * sin(angle);
    let y = radius * cos(angle); 
    vertex(x, y);  
  }
  endShape(CLOSE);
  

  //spiral
  beginShape();
  for(let i = 0; i < numPoints; i++){
    let angle = (TWO_PI/numSides) * (i%numSides); 
    let radius = i * 1.5;
    let x = radius * sin(angle);
    let y = radius * cos(angle); 
    vertex(x, y);  
  }
  endShape();
 
}



//************************************************
//        download and refresh functions         * 
//************************************************

function refresh() {
  redraw();
  // saveSVG("wooblyGrid", "png");
}

//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG() {
  save("nSideSpiral.svg");
}

function downloadPNG() {
  saveSVG("nSideSpiral", "png");
}
