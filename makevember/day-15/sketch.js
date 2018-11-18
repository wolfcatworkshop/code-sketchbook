/*
#makevember day 15

A symmetric grid were the size of the rectangles is slightly bigger
than the spacing. Creates space invaders like shapes with smaller
trails around them.


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

    
    .addButton("redraw", refresh)                                   // refresh/redraw button
    .addButton("download svg", downloadSVG)                         // download button
    .addButton("download png", downloadPNG)                         // download button
    .addHTML(
      "Navigation",
      "<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-14/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-16/>next &#62&#62</a>"
    );
}

function draw() {

  background(220);
  fill(0);
  noStroke();
  
  let spacing = 16;

  for(var x = 0 ; x <= width/2 ; x += spacing){
    for(var y = 0; y < height  ; y += spacing){
    if(flipCoin()){
      
      rect(x, y, 24, 24)
      rect(width - x - spacing, y, 24, 24)}
   
    }
  }

  noLoop();
 
}

//************************************************
//                art functions                  * 
//************************************************

//returns 0 or 1
function flipCoin(){
  let coin = round(random(0,1));
  return coin;
  }



//************************************************
//        download and refresh functions         * 
//************************************************

function refresh() {
  redraw();
}

//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG() {
  save("spaceInvaderish.svg");
}

function downloadPNG() {
  saveSVG("spaceInvaderish", "png");
}
