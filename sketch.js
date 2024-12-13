let img;
let a = 5;
let score = 0;
let maxscore = 10;
let error = 20;
let gridColors = [];
let targetColor = [];
let checked = false;
let timer = 30; // 30 seconds timer
let startTime = null;
// Tone.js Synths
const clickSynth = new Tone.Synth().toDestination();
const failSynth = new Tone.MetalSynth().toDestination();
const levelUpSynth = new Tone.FMSynth().toDestination();
const timeUpSynth = new Tone.MembraneSynth().toDestination();

let audioInitialized = false;

function preload() {
  img = loadImage("img8.jpg");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight - 90);
  canvas.parent("container");
  background(255);
  
}
function draw() {
    if (!audioInitialized) {
      background(255);
      textAlign(LEFT);
      textSize(35);
      fill(0);
      text("Move your mouse over the grid to inspect colors.\n" +
      "Click on a grid cell that matches the target color.\n" +
      "When you successfully click on a matching color:\n" +
      " - Your score increases by 1.\n" +
      " - A new target color is displayed.\n" +
      "Earn 1 point for each correct click.\n" +
      "Reach the required score (10 points) to level up.\n" +
      "Each level increases the grid density, making the game more challenging.\n" +
      "There is a 30-second timer for each level.\n" +
      "If the timer runs out and your score is below the required points, the level restarts.\n" +
      "Keep an eye on the timer displayed on the right.",
      100, 100);
      textSize(50);
      text("Click to Start",
        100,height-150);
      return;
    }
  
    if (!startTime) {
      startTime = millis(); // Initialize the timer
    }
  
    background(255);
    image(img, 0, 0, height, height, 0, 0, height, height);
  
    gridColors = []; // Reset grid colors for each frame
    for (let i = height / (a * 2); i < height; i += height / a) {
      for (let j = height / (a * 2); j < height; j += height / a) {
        const imgGrid = get(i, j); // Get the grid color
        gridColors.push(imgGrid); // Store it in the gridColors array
        noStroke();
        fill(imgGrid[0], imgGrid[1], imgGrid[2]);
        rect(i - height / (a * 2), j - height / (a * 2), height / a, height / a);
      }
    }
  
    if (!checked) {
      targetColor = random(gridColors); // Select a target color
      checked = true;
    }
  
    eyedropping();
  
    // Display target color
    fill(targetColor);
    rect(height + (width - height) / 4, 50 + height / 4, (width - height) / 2, (width - height) / 2);
  
    // Display the score
    fill(0);
    textSize(30);
    text("Score: " + score, height + (width - height) / 4, 200);
  
    // Display the timer
    let timeRemaining = max(0, timer - Math.floor((millis() - startTime) / 1000));
    text("Time: " + timeRemaining, height + (width - height) / 4, 230);
  
    if (timeRemaining === 0 && score < maxscore) {
      playTimeUpSound(); // Play sound when time runs out
      restartlevel();
    }
  
    if (score >= maxscore) {
      nextlevel();
    }
  }

function mousePressed() {
  if (!audioInitialized) {
    Tone.start().then(() => {
      audioInitialized = true;
      loop(); // Start the draw loop
    });
  }
}

function eyedropping() {
  let clickcolor = get(mouseX, mouseY);

  if (
    mouseIsPressed &&
    clickcolor[0] > targetColor[0] - error &&
    clickcolor[0] < targetColor[0] + error &&
    clickcolor[1] > targetColor[1] - error &&
    clickcolor[1] < targetColor[1] + error &&
    clickcolor[2] > targetColor[2] - error &&
    clickcolor[2] < targetColor[2] + error
  ) {
    score++;
    playClickSound(); // Play sound on correct click
    targetColor = random(gridColors); // Pick a new target color
    checked = false;
  }
}

function nextlevel() {
  a++; // Increase grid density
  score = 0;
  playLevelUpSound(); // Play sound for level up
  checked = false;
  timer = 30;
  startTime = millis();
}

function restartlevel() {
  score = 0;
  playFailSound(); // Play sound on restart
  checked = false;
  timer = 30;
  startTime = millis();
}

// Sound Effect Functions
function playClickSound() {
  if (audioInitialized) {
    clickSynth.triggerAttackRelease("C4", "8n");
  }
}

function playFailSound() {
  if (audioInitialized) {
    failSynth.triggerAttackRelease("G2", "16n");
  }
}

function playLevelUpSound() {
  if (audioInitialized) {
    levelUpSynth.triggerAttackRelease("E4", "8n");
  }
}

function playTimeUpSound() {
  if (audioInitialized) {
    timeUpSynth.triggerAttackRelease("A2", "16n");
  }
}