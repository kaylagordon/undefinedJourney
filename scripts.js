const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

init();

let coordinate = 0;

document.addEventListener('keydown', function(event){
  if (event.keyCode === 39) {
    coordinate++;
  }
})

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  ctx.fillStyle = 'green';
  ctx.fillRect(coordinate, (canvas.height - 110), 100, 100);
  window.requestAnimationFrame(draw);
}
