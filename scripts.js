const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var questionBox = document.querySelector('.question-box');
var definition = document.querySelector('.definition');
var listItem1 = document.querySelector('.li1');
var listItem2 = document.querySelector('.li2');
var listItem3 = document.querySelector('.li3');
var listItems = [
  { element: document.querySelector('.li1'), keyCode: 49 },
  { element: document.querySelector('.li2'), keyCode: 50 },
  { element: document.querySelector('.li3'), keyCode: 51 },
];

init();
// character
let character = {y: 0, height: 100, width: 100}

// questionTrigger
let questionTrigger = {x: 600, height: 200, width: 20};

let stepLength = 5;
let characterCoordinate = 0;
let viewPort = 0;
let totalPath = 0;
let characterCanJump = false;
let jumpCounter = 0;
var newQuestion = new Question();

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
    totalPath += stepLength;
    if (questionTrigger.x === ((totalPath - stepLength - questionTrigger.width) - (canvas.width / 2))) {
      resetQuestionTrigger();
    }
  }
}

function moveCharacter() {
  characterCoordinate += stepLength;
}

function showJump() {
  if (characterCanJump) {
    if (jumpCounter < 25) {
      character.y += 10;
    } else if (jumpCounter >= 25 && jumpCounter < 50) {
      character.y -= 10;
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
      console.log("Correct");
  } else {
      console.log("Incorrect!");
  }
  questionBox.classList.add("hidden");
}

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  ctx.fillStyle = 'green';
  ctx.fillRect(characterCoordinate, (canvas.height - character.y - character.height), character.width, character.height);

  ctx.fillStyle = 'red';
  ctx.fillRect((questionTrigger.x - viewPort), (canvas.height - questionTrigger.height), questionTrigger.width, questionTrigger.height);

  handleMovement();
  showJump();
  window.requestAnimationFrame(draw);
}
