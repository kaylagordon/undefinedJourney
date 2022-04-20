const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

init();
// character
let character = {height: 100, width: 100}

// obstacle
let obstacle = {x: 600, height: 200, width: 20};

let stepLength = 10;
let characterCoordinate = 0;
let viewPort = 0;
let totalPath = 0;

document.addEventListener('keydown', function(event){
  if (event.keyCode === 39) {
    if (characterCoordinate <= (canvas.width/2)) {
      characterCoordinate = characterCoordinate + stepLength;
    } else if (totalPath === (obstacle.x - character.width)) {
      alert("Here's a question");
    } else {
      viewPort = viewPort + stepLength;
    }
    totalPath = totalPath + stepLength;
  }
  console.log("Character:", characterCoordinate);
  console.log("Viewport:", viewPort);
  console.log("Total Path:", totalPath);
})

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  ctx.fillStyle = 'green';
  ctx.fillRect(characterCoordinate, (canvas.height - 110), character.width, character.height);

  ctx.fillStyle = 'red';
  ctx.fillRect((obstacle.x - viewPort), (canvas.height - obstacle.height), obstacle.width, obstacle.height);

  window.requestAnimationFrame(draw);
}
