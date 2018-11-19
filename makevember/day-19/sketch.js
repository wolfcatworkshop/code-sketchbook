/*
#makevember day 19

This was an exercise in using objects that I could update with 
a button. I create a Node class, a couple of arrays, populate them 
in set up and use them to draw a "donut" shape. They have an 
update function that changes their location by a random ammount. 



Federico
https://wolfcatworkshop.com

*/


//arrays for node objects
let outsideNodes = [];
let insideNodes  = [];

var canvas;
var panel; //GUI object

function setup() {
  //create canvas using SVG library
  canvas = createCanvas(480, 480, SVG);

  //create quicksettings panel
  panel = QuickSettings.create(120, 90, "Settings")

    .addRange("distortion ammount", 0, 10, 0.5, 0.01)               // distortion ammount
    .addButton("distort", refresh)                                  // distort/redraw button
    .addButton("download svg", downloadSVG)                         // download button
    .addButton("download png", downloadPNG)                         // download button
    .addHTML(
      "Navigation",
      "<a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-18/>&#60&#60 previous</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/>&nbsp&nbsp home  &nbsp&nbsp</a><a href=https://wolfcatworkshop.github.io/code-sketchbook/makevember/day-20/>next &#62&#62</a>"
    );

  //populate node arrays
  //exterior nodes
  let numNodes = 300;
  for (var i=0; i<numNodes; i++) {
    let a = (-TWO_PI/numNodes) * i;
    let r = 200;
    let x = cos(a) * r;
    let y = sin(a) * r;
    
    outsideNodes.push(new Node(x, y));
  }
  
  //interior nodes
  let numinNodes = 100;
  for (let i=0; i<numinNodes; i++) {
    let a = (TWO_PI/numinNodes) * i;
    let r = 100;
    let x = cos(a) * r;
    let y = sin(a) * r;
    
    insideNodes.push(new Node(x, y));
  }

noLoop();


}

function draw() {
  background('#94F3F9');
  fill('#4DDAED');
  stroke('#33A3BD');
  
  translate(width/2, height/2);
 
  //draw ring shape
  beginShape();
    
    //exterior part of shape
    for (var i=0; i<outsideNodes.length; i++) {
      vertex(outsideNodes[i].x,outsideNodes[i].y);
      }
    //interior part of shape
    beginContour();
      for (let i=0; i<insideNodes.length; i++) {
      vertex(insideNodes[i].x,insideNodes[i].y);
      }
    endContour();
  
  endShape(CLOSE);
  

  // update shapes by changing node positions
  for (let i=0; i<outsideNodes.length; i++) {
      outsideNodes[i].update();
    }
  for (let i=0; i<insideNodes.length; i++) {
      insideNodes[i].update();
    }
  
  
 
}

//************************************************
//                art functions                  * 
//************************************************

//Node class
function Node(x, y){
    this.x = x;
    this.y = y;
  
    this.update = function(){
      let d = panel.getValue("distortion ammount");
      this.x = this.x + random(-d, d);
      this.y = this.y + random(-d, d);
    }
    
}



//************************************************
//        download and refresh functions         * 
//************************************************

function refresh() {
  // for (var i = 0; i < 20; i++) {
  //   redraw();
  //   saveSVG("spaceInvaderish", "png");
  // }
  redraw();

}



//save svg when the button is pressed, requires svg library, used with save buttons
function downloadSVG() {
  save("crookedDonut.svg");
}

function downloadPNG() {
  saveSVG("crookedDonut", "png");
}
