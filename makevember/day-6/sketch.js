
/*
#makevember day 6

I wanted to make another "pattern explorer" with an option to 
save an SVG file. This time I went with some radial symmetry
and altought I could draw other shapes besides an ellipse I decided
to keep things simple. Could be used to explore animation ideas and
values too.

Using https://github.com/bit101/quicksettings for the GUI 
Using https://github.com/zenozeng/p5.js-svg   for SVG export


Federico

*/



var canvas;
var panel; //GUI object

function setup() {
  //create canvas using SVG library 
    canvas = createCanvas(480, 480, SVG);

  //create quicksettings panel
  panel = QuickSettings.create(120, 90, "Settings")
            .addRange ("distance between centers", 1, 100,  30, 1   )    // slider
            .addRange ("center offset",           -3,   3, 0.5, 0.01)    // slider
            .addRange ("number of radii",          1,  12,   2, 1   )    // slider
            .addRange ("stroke weight",          0.2,  10, 0.2, 0.1 )    // slider
            .addButton("reset values", defaultValues)                    // reset button
            .addButton("download svg", downloadSVG)                      // download button
            .addButton("download png", downloadPNG)                      // download button
            .addHTML  ("Navigation","<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-5/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-7/>next &#62&#62</a>")
            ;

}

function draw() {
  	background(240);
    noFill();

    // set stroke weight
    var strokeValue = panel.getValue("stroke weight")
    strokeWeight(strokeValue);
  
    // set number of "spokes" like the radius of a wheel by dividing TWO_PI
    var spokes = TWO_PI / (panel.getValue('number of radii'));

    // draw a set of spokes with a given angle
    for (var a = 0; a < TWO_PI; a += spokes){
      ellipseSpoke(a);
      }  
    
   
}



//draw a "spoke" of ellipses with each ellipse center moving away from the center of the canvas
//the function takes an angle of rotation
function ellipseSpoke(rotation){
    //get values
    var step    = panel.getValue('distance between centers')
    var offset  = panel.getValue('center offset');
    
    push();
     translate(width/2, height/2);
     rotate(rotation);
      for (var r = step; r < height * 2; r+= step) {
        ellipse(0, r * offset, r, r);
      }
    pop();
}


//resets the values of the drawing, used with reset button
function defaultValues(){
  panel.setValue("distance between centers", 30)    
       .setValue("center offset", 0.5)           
       .setValue("number of radii", 2) 
       .setValue("stroke weight", 0.2); 

  }


//save svg when the button is pressed, requires svg library, used with save button
function downloadSVG(){
 save('radialPattern.svg');
  }

function downloadPNG(){
 saveSVG('radialPattern', 'png');
  }
