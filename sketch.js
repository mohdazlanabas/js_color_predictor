// 1. CREATE CANVAS
// 2. DEFINE VARIABLES
// 3. RANDOM COLOR GENERATOR
// 4. LEARNING ALGORITHM
// 5. PREDICT COLOR
// 6. TRAIN BRAIN
// 7. DRAWING ALGORITHM

// DEFINE VARIABLES
let r, g, b;
// let brain;
let which = 'black';
// let wButton;
// let bButton;

// RANDOM COLOR GENERATOR
function pickColor() {
    r = random(255);
    g = random(255);
    b = random(255);
    redraw();
}

// CREATE CANVAS
function setup() {
    createCanvas(600, 300);
    noLoop();
    brain = new NeuralNetwork(3, 3, 2);
    for (let i = 0; i < 10000; i++) {
        let r = random(255);
        let g = random(255);
        let b = random(255);
        let targets = trainColor(r, g, b);
        let inputs = [r / 255, g / 255, b / 255];
        brain.train(inputs, targets);
  }
  pickColor();
}

// LEARNING ALGORITHM
function mousePressed() {
//  let targets;
//  if (mouseX > width / 2) {
//  targets = [0, 1];
//  } else {
//  targets = [1, 0];
//  }
//  let inputs = [r / 255, g / 255, b / 255];
// brain.train(inputs, targets);
  pickColor();
}

// PREDICT COLOR
function colorPredictor(r, g, b) {
    console.log(floor(r + g + b));
    let inputs = [r / 255, g / 255, b / 255];
    let outputs = brain.predict(inputs);
/// console.log(outputs);
    if (outputs[0] > outputs[1]) {
        return 'black';
        } else {
        return 'white';
     }

// if (r + g + b > 300) {
//    return "black";
//  } else {
//  return "white";
//  }
}

// TRAIN BRAIN
function trainColor(r, g, b) {
    if (r + g + b > (255 * 3) / 2) {
        return [1, 0];
    } else {
        return [0, 1];
    }
}

// DRAWING ALGORITHM
function draw() {
  background(r, g, b);

    strokeWeight(4);
    stroke(0);
    line(width / 2, 0, width / 2, height);

    textSize(64);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text('black', 150, 100);
    fill(255);
    text('white', 450, 100);

    let which = colorPredictor(r, g, b);
    if (which === 'black') {
        fill(0);
        ellipse(150, 200, 60);
    } else {
        fill(255);
        ellipse(450, 200, 60);
    }
}
