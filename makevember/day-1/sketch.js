function setup() {
  var canvas = createCanvas(400, 400);
 	// Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
}

function draw() {
  background(220);
  ellipse(40, 40, 50);
}