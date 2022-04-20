const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var questionBox = document.querySelector('.question-box');
var definition = document.querySelector('.definition');
var listItems = [
  { element: document.querySelector('.li1'), keyCode: 49 },
  { element: document.querySelector('.li2'), keyCode: 50 },
  { element: document.querySelector('.li3'), keyCode: 51 },
];
var strikesText = document.querySelector('.strikes-text');
var scoreText = document.querySelector('.score-text');

init();
// character
let character = {height: 100, width: 100}

// questionTrigger
let questionTrigger = {x: 600, height: 200, width: 20};

let stepLength = 10;
let characterCoordinate = 0;
let viewPort = 0;
let totalPath = 0;
var newQuestion = new Question();
let score = 0;
let strikes = 0;

document.addEventListener('keydown', function(event){
  if (event.keyCode === 39 && questionBox.classList.contains('hidden')) {
    handleMovement();
  } else if ((event.keyCode === 49 || event.keyCode === 50 || event.keyCode === 51) && !questionBox.classList.contains('hidden')) {
    provideFeedback(event);
  }
})

function handleMovement() {
  if (characterCoordinate <= (canvas.width/2)) {
    moveCharacter();
  } else if (totalPath === (questionTrigger.x - character.width)) {
    displayQuestion();
  } else {
    moveScreen();
  }
  totalPath += stepLength;
  if (questionTrigger.x === ((totalPath - stepLength - questionTrigger.width) - (canvas.width / 2))) {
    resetQuestionTrigger();
  }
}

function moveCharacter() {
  characterCoordinate += stepLength;
}

function moveScreen() {
  viewPort = viewPort + stepLength;
}

function resetQuestionTrigger() {
  let randomNumber = Math.floor(Math.floor(Math.random() * (1200 - canvas.width) + canvas.width))
  let difference = randomNumber % 10;
  randomNumber -+ difference;
  questionTrigger.x += 900;
  totalPath -= stepLength;
}

function displayQuestion() {
  newQuestion.createQuestion();
  questionBox.classList.remove('hidden');
  definition.innerText = newQuestion.definition;
  listItems.forEach((listItem, i) => {
    listItem.element.innerText = newQuestion.answerChoices[i];
  })
}

function provideFeedback(event) {
  const listItem = listItems.find(item => item.keyCode === event.keyCode).element;
  if (newQuestion.checkAnswer(listItem.innerText)) {
    score += 100;
    scoreText.innerText = score;
  } else {
    strikes += 1;
    strikesText.innerText = '';
    for (var i = 0; i < strikes; i++) {
      strikesText.innerText += "X";
    }
    checkGameOver();
  }
  questionBox.classList.add("hidden");
}

function checkGameOver() {
  if (strikes === 3) {
    displayGameOverInfo();
    resetGame();
  }
}

function displayGameOverInfo() {
  console.log("Game over")
}

function resetGame() {
  stepLength = 10;
  characterCoordinate = 0;
  viewPort = 0;
  totalPath = 0;
  score = 0;
  strikes = 0;
  strikesText.innerText = 'No Strikes';
  scoreText.innerText = 0;
}

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  ctx.fillStyle = 'green';
  ctx.fillRect(characterCoordinate, (canvas.height - 110), character.width, character.height);

  ctx.fillStyle = 'red';
  ctx.fillRect((questionTrigger.x - viewPort), (canvas.height - questionTrigger.height), questionTrigger.width, questionTrigger.height);

  window.requestAnimationFrame(draw);
}
