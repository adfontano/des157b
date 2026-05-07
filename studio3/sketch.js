let lightGreen;
let midGreen;
let darkGreen;
let blueGreen;
let lightBrown;
let darkBrown;
let lightPurple;
let midPurple;
let purple;
let darkPurple;

let makePlant;
let rng;
let counter = 0;
let mode;
// let img;


// function preload() {
//     img = loadImage('garden.png');
// }

function setup() {
    let canvas = createCanvas(1200, 750);
    canvas.style = ('z-index', '2');
    canvas.position(0,0, 'relative');

    lightGreen = color(139, 214, 157);
    midGreen = color(103, 166, 113);
    darkGreen = color(80, 138, 100);
    blueGreen = color(52, 110, 77);
    lightBrown = color(74, 53, 30);
    darkBrown = color(41, 26, 9);
    lightPurple = color(224, 194, 242);
    midPurple = color(210, 164, 237);
    purple = color(204, 148, 242);
    darkPurple = color(169, 116, 212);

    mode = 'start';

    makePlant = Array.from({ length: 3 }, function () {
        return new Array(1000).fill(0);
    });

}

function draw() {
    clear();
    if (mode === 'start') {
        startScreen();
    } else if (mode === 'playing') {
        
        document.querySelector('#start-screen').className = 'hidden';
        
        fill(lightBrown);
        // stroke(darkBrown);
        // strokeWeight(10);
        // rect(0, 450, 1500, 300);
        noStroke();
        planting();
        
    }

}

function startScreen() {
    document.querySelector('#start-screen').className = 'showing';
}

function mouseClicked() {
    if (mode === 'start') {
        mode = 'playing';
    } else if (mode === 'playing') {
        if (pmouseY >= 400 && counter < 1000) {
            makePlant[1][counter] = pmouseX;
            makePlant[2][counter] = pmouseY;
            makePlant[0][counter] = rng;
            rng = Math.floor(random(1, 5));
            counter++;

        }
        return false;
    }

}
function planting() {
    for (let i = 0; i < counter; i++) {
        if (makePlant[0][i] == 1) {
            drawSmallPlant(makePlant[1][i], makePlant[2][i]);
        }
        if (makePlant[0][i] == 2) {
            drawMediumPlant(makePlant[1][i], makePlant[2][i]);
        }
        if (makePlant[0][i] == 3) {
            drawLargePlant(makePlant[1][i], makePlant[2][i]);
        }
        if (makePlant[0][i] == 4) {
            drawExtraLargePlant(makePlant[1][i], makePlant[2][i]);
        }
    }
}
function drawSmallPlant(x, y) {
    drawStem(x + 5, y, 50);
    //leaves
    drawLeafLeft(x - 35, y - 30);
    drawLeafRight(x + 10, y - 30);
}
function drawMediumPlant(x, y) {
    drawStem(x, y - 100, 150);
    //leaves
    drawLeafLeft(x - 45, y - 70);
    drawLeafRight(x + 15, y + 5);
    drawLeafRight(x + 15, y - 120);
}
function drawLargePlant(x, y) {
    drawStem(x, y - 175, 225);
    drawFlowerBud(x - 20, y - 238);
    drawLeafLeft(x + -46, y + -140);
    drawLeafLeft(x + -46, y + -40);
    drawLeafRight(x + 17, y + -96);
}
function drawExtraLargePlant(x, y) {
    drawStem(x, y - 225, 275);
    drawFlower(x, y - 225);
    drawLeafLeft(x + -46, y + -134);
    drawLeafRight(x + 17, y + -81);
}

function drawStem(x, y, stemHeight) {
    //outline
    fill(blueGreen);
    rect(x - 4, y - 4, 18, stemHeight + 8);
    //center
    fill(midGreen);
    rect(x, y, 5, stemHeight);
    fill(darkGreen);
    rect(x + 5, y, 5, stemHeight);
}
function drawLeafLeft(x, y) {
    //outline
    fill(darkGreen);
    rect(x - 5, y - 5, 50, 35);
    rect(x - 20, y - 20, 55, 40);
    rect(x - 35, y - 29, 55, 40);
    //inside
    fill(lightGreen);
    rect(x, y, 40, 25);
    rect(x - 15, y - 15, 45, 30);
    rect(x - 30, y - 24, 45, 30);
    //inside line
    fill(darkGreen);
    rect(x + 15, y + 7, 25, 7);
    rect(x, y, 15, 7);
    rect(x - 10, y - 7, 10, 7);
}
function drawLeafRight(x, y) {
    //outline
    fill(darkGreen);
    rect(x - 5, y - 5, 50, 35);
    rect(x + 10, y - 20, 55, 40);
    rect(x + 25, y - 29, 55, 40);
    //inside
    fill(lightGreen);
    rect(x, y, 40, 25);
    rect(x + 15, y - 15, 45, 30);
    rect(x + 30, y - 24, 45, 30);
    //line inside
    fill(darkGreen);
    rect(x, y + 7, 25, 7);
    rect(x + 25, y, 15, 7);
    rect(x + 40, y - 7, 10, 7);
}
function drawFlowerBud(x, y) {
    //outline
    fill(darkPurple);
    square(x - 5, y - 5, 60);
    rect(x + 5, y + 10, 40, 50);
    rect(x - 20, y, 35, 50);
    rect(x + 35, y, 35, 50);
    //big flower
    fill(lightPurple);
    square(x, y, 50);
    //flower petals
    fill(midPurple);
    rect(x - 15, y + 5, 25, 40);
    rect(x + 40, y + 5, 25, 40);
    rect(x + 10, y + 15, 30, 40);
    fill(purple);
    rect(x, y + 20, 50, 30);
    rect(x + 10, y + 50, 30, 5);
}
function drawFlower(x, y) {
    //petal back left outline
    fill(darkPurple);
    rect(x - 55, y - 85, 50, 25);
    rect(x - 65, y - 80, 65, 55);
    //petal back left
    fill(purple);
    rect(x - 50, y - 80, 40, 15);
    rect(x - 60, y - 75, 55, 45);
    // petal back right outline
    fill(darkPurple);
    rect(x + 5, y - 85, 50, 25);
    rect(x - 5, y - 75, 75, 45);
    //petal back right
    fill(purple);
    rect(x + 10, y - 80, 40, 15);
    rect(x, y - 70, 65, 45);
    //petal front right outline
    fill(darkPurple);
    rect(x + 10, y - 55, 60, 70);
    rect(x + 15, y - 65, 45, 90);
    rect(x + 55, y - 47, 25, 55);
    //petal front right
    fill(lightPurple);
    rect(x + 15, y - 50, 50, 60);
    rect(x + 20, y - 60, 35, 80);
    rect(x + 60, y - 42, 15, 45);
    //petal front right line
    fill(purple);
    rect(x + 17, y - 1, 29, 9);
    rect(x + 45, y - 30, 7, 27);
    //petal front center outline
    fill(darkPurple);
    rect(x - 15, y - 65, 50, 80);
    rect(x - 25, y - 55, 70, 55);
    rect(x - 5, y - 75, 30, 95);
    //petal front center
    fill(lightPurple);
    rect(x - 10, y - 60, 40, 70);
    rect(x - 20, y - 50, 60, 45);
    rect(x, y - 70, 20, 85);
    //petal front center line
    fill(purple);
    rect(x + 10, y - 25, 7, 40);
    rect(x + 5, y - 40, 7, 15);
    //petal front left outline
    fill(darkPurple);
    rect(x - 50, y - 20, 45, 40);
    rect(x - 65, y - 40, 50, 55);
    rect(x - 75, y - 50, 55, 50);
    rect(x - 70, y - 60, 45, 25);
    //petal front left
    fill(lightPurple);
    rect(x - 45, y - 15, 35, 30);
    rect(x - 60, y - 35, 40, 45);
    rect(x - 70, y - 45, 45, 40);
    rect(x - 65, y - 55, 35, 15);
    //petal front left line
    fill(purple);
    rect(x + -37, y - 6, 27, 7);
    rect(x + -44, y - 16, 7, 11);

    //connect to stem outline
    fill(blueGreen);
    square(x - 15, y + 20, 40);
    rect(x - 30, y + 20, 55, 20);
    //connect to stem
    fill(darkGreen);
    square(x - 10, y + 25, 30);
    fill(midGreen);
    rect(x - 25, y + 25, 25, 10);
    fill(darkGreen);
    square(x, y + 45, 15);
    fill(midGreen);
    square(x - 7, y + 30, 25);
}
