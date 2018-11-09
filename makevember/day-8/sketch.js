
/*
#makevember day 8

Drawing a grid of leaf shapes. I added a checkbox to trigger
the animation, you know, for fun.

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
            .addRange ("shape size",           10,  200,  100,  1 )      // shape size slider
            .addRange ('shape angle',           0,  180,    0,  1 )      // shape angle slider  
            .addRange ("x offset",             10,  200,  100,  1 )      // horizontal offset
            .addRange ("y offset",             10,  200,   25,  1 )      // vertical offset
            .addRange ("stroke weight",       0.2,   34,  0.2,  0.1)     // stroke weight
            .addBoolean("toggle animation", false)                       // toggle animation
            .addButton("download svg", downloadSVG)                      // download button
            .addButton("download png", downloadPNG)                      // download button
            .addHTML  ("Navigation","<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-7/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-9/>next &#62&#62</a>")
            ;


}

function draw() {
  	background(240);
    stroke(0);
    strokeWeight(panel.getValue("stroke weight"));
    noFill();

    //get shape values from sliders, angle gets converted to radians for rotation
    var shapeSize  = panel.getValue('shape size');
    var shapeAngle = radians(panel.getValue('shape angle'));
    var xStep      = panel.getValue('x offset');
    var yStep      = panel.getValue('y offset'); 

    //get value of checkbox, if true animate shapesize
    if(panel.getValue("toggle animation")){
      shapeSize = sin(frameCount * 0.05) * 200;

    };

    //draw grid of leafs
    for(var x = -xStep; x <= width + xStep; x+= xStep){
      for(var y = 0; y <= height + yStep; y +=yStep){
      leaf(x, y, shapeSize, shapeAngle);
      }
    }
    
    
}


//draw a "leaf" shape with center at x, y and specific length and rotation
function leaf(x, y, len, shapeAngle){
  push();
    translate(x, y);
    rotate(shapeAngle);
    var w  = len/2; //leaf length or width
    var cY =  0.6;  //modifies control points on y axis
    var cX =  0.4   //modifies control points on x axis
    beginShape();
      vertex(-w, 0);
      bezierVertex(-w * cX, -w * cY,  w * cX, -w * cY,  w, 0);
      bezierVertex( w * cX,  w * cY, -w * cX,  w * cY, -w, 0);
    endShape();
  pop();

}


//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG(){
 save('leafPattern.svg');
  }

function downloadPNG(){
 saveSVG('leafPattern', 'png');
  }

