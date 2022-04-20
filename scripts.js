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
let character = {height: 100, width: 100}

// questionTrigger
let questionTrigger = {x: 600, height: 200, width: 20};

let stepLength = 10;
let characterCoordinate = 0;
let viewPort = 0;
let totalPath = 0;
var newQuestion = new Question();

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
  ctx.fillRect(characterCoordinate, (canvas.height - 110), character.width, character.height);

  var img = document.querySelector(".mad-apple");
  var pat = ctx.createPattern(img, "no-repeat");
  // ctx.rect((questionTrigger.x - viewPort), (canvas.height - questionTrigger.height), questionTrigger.width, questionTrigger.height);
  img.classList.remove("hidden")
  // ctx.fillStyle = pat;
  // ctx.fill();

  ctx.drawImage(img, (questionTrigger.x - viewPort - 40), ((canvas.height - questionTrigger.height) + 140), 60, 60)


  window.requestAnimationFrame(draw);
}
//ctx/draw image