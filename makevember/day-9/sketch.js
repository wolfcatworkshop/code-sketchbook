
/*
#makevember day 9



Using https://github.com/bit101/quicksettings for the GUI 
Using https://github.com/zenozeng/p5.js-svg   for SVG export


Federico

*/


var canvas;
var panel; //GUI object


var offset       = 90;  // rotation offset
var radialOffset = 20;  // radial distance between arcs


function setup() {
  //create canvas using SVG library 
    canvas = createCanvas(480, 480, SVG);

  //create quicksettings panel
  panel = QuickSettings.create(120, 90, "Settings")
            .addRange ("gap width in degrees",  0,  180,   20,  1 )      // slider
            .addRange ('rotation offset',       0,  180,   90,  1 )      // slider  
            .addRange ('radial offset',         1,  200,   20,  1 )      // slider  
            .addRange ("stroke weight",       0.2,   34,  0.2,  0.1)     // stroke weight
            .addBoolean("toggle animation", false)                       // toggle animation
            .addButton("download svg", downloadSVG)                      // download button
            .addButton("download png", downloadPNG)                      // download button
            .addHTML  ("Navigation","<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-8/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-10/>next &#62&#62</a>")
            ;
   
   angleMode(DEGREES);

}

function draw() {
  	background(240);
    stroke(0);
    strokeWeight(panel.getValue("stroke weight"));
    noFill();
    translate(width/2, height/2);


    //get values from sliders
    var myGap    = panel.getValue("gap width in degrees")/2;
    
    radialOffset = panel.getValue('radial offset');
    
    arcs(myGap, 50);
    
    if (panel.getValue("toggle animation",)){
        offset = offset + 0.5;
    } else {
        offset = panel.getValue('rotation offset');
    };
}


//A recursive function that draws arcs with a given gap and a rotation offset
function arcs (gap, d){
  //d is diameter
  arc(0, 0, d, d,   0 + gap, 180 - gap);
  arc(0, 0, d, d, 180 + gap,   0 - gap);

  //make it recursive
  if (d < width - gap){
    push();
      rotate(offset); 
      arcs(gap, d + radialOffset);
    pop();
    
  }
}



//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG(){
 save('circularCuts.svg');
  }

function downloadPNG(){
 saveSVG('circularCuts', 'png');
  }

