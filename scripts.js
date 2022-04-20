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
var playAgainButton = document.querySelector('button');
var gameOverBox = document.querySelector('.game-over-box');
var totalQuestionsCount = document.querySelector('.total-questions');
var percentCorrect = document.querySelector('.percent-correct');

init();
// character
let character = {y: 0, height: 100, width: 100}

// questionTrigger
let questionTrigger = {x: 600, height: 200, width: 20};

// obstacle
let obstacle = {x: 1000, height: 50, width: 50};

let stepLength = 5;
let characterCoordinate = 0;
let viewPort = 0;
let totalPath = 0;
let characterCanJump = false;
let jumpCounter = 0;
var newQuestion = new Question();
let score = 0;
let strikes = 0;

playAgainButton.addEventListener('click', resetGame);

let keyStatus = {
  rightArrow: false,
}

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 38) {
    characterCanJump = true;
  }

  if (event.keyCode === 39 && questionBox.classList.contains('hidden')) {
    keyStatus.rightArrow = true;
  } else if ((event.keyCode === 49 || event.keyCode === 50 || event.keyCode === 51) && !questionBox.classList.contains('hidden')) {
    provideFeedback(event);
  }
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode === 39) {
    keyStatus.rightArrow =  false;
  }
});

function handleMovement() {
  if (keyStatus.rightArrow === true) {
    if (characterCoordinate <= (canvas.width/2)) {
      moveCharacter();
    } else if (totalPath === (questionTrigger.x - character.width)) {
      keyStatus.rightArrow = false;
      displayQuestion();
    } else {
      moveScreen();
    }
    checkForObstacleCollision();
    totalPath += stepLength;
    if (questionTrigger.x === ((totalPath - stepLength - questionTrigger.width) - (canvas.width / 2))) {
      resetQuestionTrigger();
    }
    if (obstacle.x === ((totalPath - stepLength - obstacle.width) - (canvas.width / 2))) {
      resetObstacle();
    }
  }
}

function moveCharacter() {
  characterCoordinate += stepLength;
}

function showJump() {
  if (characterCanJump) {
    if (jumpCounter < 25) {
      character.y += 12;
    } else if (jumpCounter >= 25 && jumpCounter < 50) {
      character.y -= 12;
    } else {
      character.y = 0;
      jumpCounter = 0;
      characterCanJump = false;
    }
    jumpCounter++;
  }
}

function moveScreen() {
  viewPort = viewPort + stepLength;
}

function resetQuestionTrigger() {
  let randomNumber = Math.floor(Math.floor(Math.random() * (1200 - canvas.width) + canvas.width))
  let difference = randomNumber % stepLength;
  randomNumber -= difference;
  questionTrigger.x += randomNumber;
  totalPath -= stepLength;
}

function resetObstacle() {
  let randomNumber = Math.floor(Math.floor(Math.random() * (800 - canvas.width) + canvas.width))
  let difference = randomNumber % stepLength;
  randomNumber -= difference;
  obstacle.x += randomNumber;
  totalPath -= stepLength;
}

function displayQuestion() {
  listItems.forEach(item => {
    item.element.classList.remove('correct');
    item.element.classList.remove('wrong');
  })
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
  }

  showCorrectAnswer(listItem.innerText);

  setTimeout(function() {
    questionBox.classList.add("hidden");
    questionBox.classList.remove('correct');
    questionBox.classList.remove('wrong');
    checkGameOver();
  }, 1500);
}

function showCorrectAnswer(guess) {
  listItems.forEach(item => {
    if (newQuestion.checkAnswer(item.element.innerText)) {
      item.element.classList.add('correct');
    } else if(guess === item.element.innerText) {
      item.element.classList.add('wrong');
    }
  })
}

function checkGameOver() {
  if (strikes === 3) {
    gameOverBox.classList.remove('hidden');
    totalQuestionsCount.innerText = (score / 100) + strikes;
    percentCorrect.innerText = (score / 100) / ((score / 100) + strikes) * 100;
  }
}

function resetGame() {
  gameOverBox.classList.add('hidden');
  stepLength = 10;
  characterCoordinate = 0;
  viewPort = 0;
  totalPath = 0;
  score = 0;
  strikes = 0;
  strikesText.innerText = 'No Strikes';
  scoreText.innerText = 0;
}

function checkForObstacleCollision() {
  if (totalPath >= (obstacle.x - character.width) && totalPath <= (obstacle.x + obstacle.width) && character.y < obstacle.height) {
    score--;
    scoreText.innerText = score;
  }
}

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  var personToon = document.querySelector("#turing-person");
  var questionToon = document.querySelector("#mad-apple");
  var obstacleToon = document.querySelector("#bomb");

  ctx.drawImage(personToon, characterCoordinate, (canvas.height - character.height - character.y) ,character.width, character.height)
  ctx.drawImage(questionToon, (questionTrigger.x - viewPort), (canvas.height - questionTrigger.height), questionTrigger.height, questionTrigger.height)
  ctx.drawImage(obstacleToon, (obstacle.x - viewPort), (canvas.height - obstacle.height), obstacle.width, obstacle.height)

  handleMovement();
  showJump();
  window.requestAnimationFrame(draw);
}
