let cnv;
let d;
let g;
function setup() {
  cnv = createCanvas(100, 100);
  cnv.mouseWheel(changeSize); // attach listener for
  // activity on canvas only
  d = 10;
  g = 100;
}

function draw() {
  background(g);
  ellipse(width / 2, height / 2, d, d);
}

// this function fires with mousewheel movement
// anywhere on screen
function mouseWheel() {
  g = g + 10;
}

// this function fires with mousewheel movement
// over canvas only
function changeSize(event) {
  if (event.deltaY > 0) {
    d = d + 10;
  } else {
    d = d - 10;
  }
}
