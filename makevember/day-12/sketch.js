
/*
#makevember day 12

Drawing a grid of polygons with lines going from the center to each vertex.
The idea for the lines was to avoid "islands", meaning  bits that fall out
when you cut them. 

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
        
            .addRange ("stroke weight",  0.5,   20,   2.5,  0.01, refresh) // call refresh to redraw canvas with every change
            .addRange ("spacing",         24,   120,  48,   12, refresh)  // spacing
            .addButton("redraw", refresh)                                 // refresh/redraw button
            .addButton("download svg", downloadSVG)                       // download button
            .addButton("download png", downloadPNG)                       // download button
            .addHTML  ("Navigation","<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-11/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-13/>next &#62&#62</a>")
            ;
   

}

function draw() {
  background(255);
  

  //get values
  strokeWeight(panel.getValue("stroke weight"));
  var spacing = panel.getValue("spacing");


  // var spacing = 48;
  
  //main grid
  for(var x = spacing; x < width / 2; x += spacing){
   for(var y = spacing; y < height; y += spacing){
      //random number of sides
      var nSides = floor(random(3, 12)); 
      
      //left side
      poly(x, y, spacing * 0.4, nSides); 
     
      //right side
      poly(width - x, y, spacing * 0.4, nSides);    
   }
  }
  
  
  //center line
  for (var centerY = spacing; centerY < height; centerY += spacing){
      //random number of sides
      var nSides2 = floor(random(3, 12));
      
      poly(width/2, centerY, spacing * 0.4, nSides2); 
  }
  
  
  //small ellipses
  for(var xx = spacing; xx < width ; xx += spacing){
   for(var yy = spacing; yy < height; yy += spacing){
       ellipse(xx, yy, spacing * 0.3); 
   }
  }
  
  
  //secondary grid 
  for(var xxx = spacing * 0.5; xxx < width /2 ; xxx += spacing){
   for(var yyy = spacing * 1.5; yyy < height - spacing; yyy += spacing){
      //random number of sides 
      var nSides3 = floor(random(3, 12));
      
     //left side
      poly(xxx, yyy, spacing * 0.25, nSides3); 
     
      //right side
      poly(width - xxx, yyy, spacing * 0.25, nSides3);  
   }
  }
  


noLoop();
 

}

//************************************************
//art functions

//draw polygon with n sides at x, y with radius(r) with some additional lines
function poly(x, y, r, n){
 fill(0);
 noStroke(); 
  
  //polygon
  beginShape();
  for (var a = 0; a < TWO_PI; a += TWO_PI/n){
   //polar coordinates 
   var myX = (r * sin(a)) + x;
   var myY = (r * cos(a)) + y;
   vertex(myX, myY);
  } 
  endShape(CLOSE);
  
  //lines
  stroke(255);
  // strokeWeight(2.5);
  for (var an = 0; an <= TWO_PI; an += TWO_PI/n){
   //polar coordinates 
   var mX = (r * sin(an)) + x;
   var mY = (r * cos(an)) + y;
   line(mX, mY, x, y);
  }  
}

//draw one of the shapes with a random probability



//************************************************
//download functions

function refresh(){
  redraw();
}



//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG(){
  save('crossedPolygons.svg');
  }

function downloadPNG(){
 saveSVG('crossedPolygons', 'png');
  }

