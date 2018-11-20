/*
#makevember day 12



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

    .addRange("tile size", 10, 100, 24, 1)         // tile size 
    .addButton("redraw tiles", reTile)                  // download button
    .addButton("download svg", downloadSVG)        // download button
    .addButton("download png", downloadPNG)        // download button
    .addHTML(
      "Navigation",
      "<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-19/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-21/>next &#62&#62</a>"
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
  fill(100, 100);
  // noFill();
  noStroke();


  
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
  
  //chose one of 4 possible triangles
  this.option = round(random(3));
  
  //draw triangle based on choice
  this.show = function(){
    if(this.option == 0){
      triangle(this.x + this.w, this.y, 
               this.x + this.w, this.y + this.w, 
               this.x, this.y + this.w);
      }
    if(this.option == 1){
      triangle(this.x, this.y, 
               this.x, this.y + this.w, 
               this.x + this.w, this.y + this.w );
      }
    if(this.option == 2){
      triangle(this.x, this.y, 
               this.x + this.w, this.y, 
               this.x, this.y + this.w );
      }
    if(this.option == 3){
      triangle(this.x, this.y, 
               this.x + this.w, this.y, 
               this.x + this.w, this.y + this.w );
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
  // for (var i = 0; i < 20; i++) {
  //   redraw();
  //   saveSVG("truchetTile", "png");
  // }
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
