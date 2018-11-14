
/*
#makevember day 13

I had this idea of making a woobly grid. Most grids I've used are pretty straight. 
The "wooblyness" comes from drawing quads and then adding a random variation
on each of the 4 points. It makes for an interesting animation that looks
like a bunch of paper cranes scattering.

Using https://github.com/bit101/quicksettings for the GUI 
Using https://github.com/zenozeng/p5.js-svg   for SVG export



Federico
https://wolfcatworkshop.com

*/


var canvas;
var panel ; //GUI object



function setup() {
  //create canvas using SVG library 
  canvas = createCanvas(480, 480, SVG);

  //create quicksettings panel
  panel = QuickSettings.create(120, 90, "Settings")
        
            .addRange  ("stroke weight",     0.5,   20,   0.5,    0.01, refresh) // call refresh to redraw canvas with every change
            .addRange  ("quad size",           2,   60,    20,       1, refresh) // quad sizes
            .addRange  ("randomness",          0,  480,     5,     0.5, refresh) // random value added  
            
            .addButton ("redraw", refresh)                                       // refresh/redraw button
            .addButton ("download svg", downloadSVG)                             // download button
            .addButton ("download png", downloadPNG)                             // download button
            .addHTML   ("Navigation","<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-12/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-14/>next &#62&#62</a>")
            ;
   

}

function draw() {
  background(0);
  fill(255);
  // noStroke();

  //get values
  strokeWeight(panel.getValue("stroke weight"));
  var quadsize = panel.getValue("quad size");

  makeGrid(quadsize);

  noLoop(); 

}

//************************************************
//art functions

function makeGrid(quadSize){
  
  step = 48;  //step size
  for(var x = step; x < width; x+= step){
    for(var y = step; y < height; y+= step){
    
        var qS =  quadSize; //quad size b
        var ra = panel.getValue('randomness'); //random variation

        //draw the quad with center at x, y with a random variation for each point
        quad(x - qS + random(-ra, ra), y - qS + random(-ra, ra), 
             x + qS + random(-ra, ra), y - qS + random(-ra, ra), 
             x + qS + random(-ra, ra), y + qS + random(-ra, ra), 
             x - qS + random(-ra, ra), y + qS + random(-ra, ra));
    }
  }

}



//************************************************
//download and refresh functions

function refresh(){
  redraw();
}



//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG(){
  save('wooblyGrid.svg');
  }

function downloadPNG(){
 saveSVG('wooblyGrid', 'png');
  }

