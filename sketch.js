let sz = 28;
let rows = 160;
let cols = 160;
let noiseScale = 0.039;
let nsp = 0.0005;
let off = 0;

// Define terrain characters and colors for reference
let terrains;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  textAlign(CENTER, CENTER);
  textSize(sz * 0.8);
  textFont("Noto Sans SC"); // Good Chinese font if available
  noStroke();

  cols = floor(width / sz);
  rows = floor(height / sz);

  // Define terrain types with both Chinese characters and colors (for reference)
  /* terrains = [
    { char: '海', color: color(0, 75, 150) },    // Sea
    { char: '沙', color: color(237, 201, 175) }, // Sand
    { char: '林', color: color(34, 139, 34) },   // Forest
    { char: '山', color: color(139, 121, 94) },  // Mountain
    { char: '雪', color: color(255, 250, 250) }  // Snow
  ]; */

  terrains = [
    { char: "海", gray: 70 }, // Sea (dark gray)
    { char: "沙", gray: 120 }, // Sand (mid gray, not too light)
    { char: "林", gray: 40 }, // Forest (darker)
    { char: "山", gray: 20 }, // Mountain (almost black)
    { char: "雪", gray: 100 }, // Snow (light gray, but visible on white)
  ];
}

function draw() {
  background(238, 226, 203);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let nx = noiseScale * x + off;
      let ny = noiseScale * y;
      let noiseVal = noise(nx, ny);
      let colind = floor(map(noiseVal, 0, 1, 0, terrains.length));
      let t = terrains[colind];

      fill(t.gray);
      text(t.char, x * sz + sz / 2, y * sz + sz / 2);
    }
  }

  // Animate the noise scale for subtle morphing
  noiseScale += nsp;
  if (noiseScale > 0.1 || noiseScale < 0.002) {
    nsp *= -1;
  }
  off += 0.03;
}
