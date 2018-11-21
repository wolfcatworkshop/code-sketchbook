/*
#makevember day 21

Object oriented implementation of Truchet tiles with the quarter circle option
https://en.wikipedia.org/wiki/Truchet_tiles



Federico
https://wolfcatworkshop.com

*/


//array for tile objects
let tiles = [];
let newSize = 24;


var canvas;
var panel; //GUI object


function setup() {
  //create canvas using SVG library
  canvas = createCanvas(480, 480, SVG);

  //create quicksettings panel
  panel = QuickSettings.create(120, 90, "Settings")

    .addRange("tile size", 4, 48, 24, 1)           // tile size 
    .addRange("stroke weight", 0.2, 20, 2, 0.1)    // stroke weight
    .addButton("redraw tiles", reTile)             // download button
    .addButton("download svg", downloadSVG)        // download button
    .addButton("download png", downloadPNG)        // download button
    .addHTML(
      "Navigation",
      "<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-20/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-22/>next &#62&#62</a>"
    );

  

  // populate tiles array
  let step = 24;
  for(let x = 0; x < width; x += step){
    for(let y = 0; y < height; y += step){
      tiles.push(new Truchet(x, y, step));
    }
  }  


}

function draw() {
  background(255);
  noFill();
  

  //get values
  let stw = panel.getValue("stroke weight");
  strokeWeight(stw);

  
  //display tiles
  for(let i = 0; i < tiles.length; i++){
    tiles[i].show();
  }
  
  //change tile sizes
  newSize = panel.getValue("tile size");
  for(let i = 0; i < tiles.length; i++){
    tiles[i].update(newSize);
  }
 

}

//************************************************
//                art functions                  * 
//************************************************

//truchet tile class
function Truchet(x, y, w){
  this.x = x;
  this.y = y;
  this.w = w;  //width
  
   //chose one of 2 possible tiles
  this.option = round(random(1));
  
  //draw tile based on choice
  this.show = function(){
    if(this.option == 0){
      arc(this.x, this.y, this.w, this.w,TWO_PI, HALF_PI);
      arc(this.x + this.w, this.y + this.w, this.w, this.w, PI, PI + HALF_PI);
      }
    if(this.option == 1){
      arc(this.x + this.w, this.y, this.w, this.w, HALF_PI, PI);
      arc(this.x, this.y + this.w, this.w, this.w, PI + HALF_PI, 0);
      }
    
    }
  
  
  this.update = function(newSize){
    this.w = newSize;
    }
  
}

function reTile(){
  //clear array and repopulate
  tiles = []; 

  let step = 24;
  for(let x = 0; x < width; x += step){
    for(let y = 0; y < height; y += step){
      tiles.push(new Truchet(x, y, step));
    }
  }  
  
}



//************************************************
//        download and refresh functions         * 
//************************************************

function refresh() {
  
  redraw();
  // saveSVG("truchetTile", "png");

}



//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG() {
  save("truchetTile.svg");
}

function downloadPNG() {
  saveSVG("truchetTile", "png");
}
