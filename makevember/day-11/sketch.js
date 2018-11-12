
/*
#makevember day 11

Dipping my toes into a random shape generator.

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
        
            .addRange ("stroke weight",  0.5,   10,   3,  0.01, refresh) // call refresh to redraw canvas with every change
            .addRange ("number of shapes", 4,   20,   8,     2, refresh) //
            .addButton("redraw", refresh)                                // 
            .addButton("download svg", downloadSVG)                      // download button
            .addButton("download png", downloadPNG)                      // download button
            .addHTML  ("Navigation","<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-10/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-12/>next &#62&#62</a>")
            ;
   

}

function draw() {
  background(200);
  stroke(0);

  //get values
  strokeWeight(panel.getValue("stroke weight"));
  var spacing = panel.getValue("number of shapes");

  //draw a grid of shapes
  makeGrid(spacing);
  noLoop();
 

}

//************************************************
//art functions

//makes a grid of shapes with a given spacing
function makeGrid(mySpacing){
  spacing = width/mySpacing;
  for (var x = spacing; x < width; x += spacing){
    for (var y = spacing; y < height; y += spacing){
      randomShape(x, y, spacing -10);
      randomShape(x, y, spacing -10);
      randomShape(x, y, spacing -10);
      randomShape(x, y, spacing -10);
    }
  }
  
}


//draw one of the shapes with a random probability

function randomShape(x, y, size){
    //get a random value between 0 and 1
    var randomValue = random();
    
    if(randomValue < 0.1){
      ellipse(x, y, size * random(0.5, 1));
    }
    else if(randomValue < 0.2){
      ellipse(x, y, size/3, size/3);
    }
    else if(randomValue < 0.3){
      //X's
      var len = size * random(0.2, 0.5);
      line(x - len, y - len, x + len, y + len);
      line(x + len, y - len, x - len, y + len);
    }
    else if(randomValue < 0.4){
      //crosses
      line(x, y - size/3, x, y + size/3);
      line(x - size/3, y , x + size/3, y);
    }
    else if(randomValue < 0.6){
      //ovals
      ellipse(x, y, size * random(0.25, 0.8), size * random(0.25, 1));
    }
    
    else if(randomValue < 0.7){
      //horizontal lines
      var len2 = size * random(0.2, 0.5);
      line(x - len2, y - len2, x + len2, y - len2);
      line(x - len2, y + len2, x + len2, y + len2);
    }
    
    else if(randomValue < 0.8){
      //vertical lines
      var len3 = size * random(0.2, 0.5);
      line(x - len3, y - len3, x - len3, y + len3);
      line(x + len3, y - len3, x + len3, y + len3);
    }
    
     else if(randomValue < 0.9){
       //center point
       point(x, y);
    
    }
    else{
      //4 points at random distance
      var len4 = size * random(0.1, 0.4);
      point(x - len4, y - len4);
      point(x + len4, y - len4);
      point(x + len4, y + len4);
      point(x - len4, y + len4);
    }
    
}





//************************************************
//download functions

function refresh(){
  redraw();
}



//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG(){
  save('shapes.svg');
  }

function downloadPNG(){
 saveSVG('shapes', 'png');
  }

