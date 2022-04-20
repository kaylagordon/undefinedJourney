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
    if (characterCoordinate <= (canvas.width/2)) {
      characterCoordinate += stepLength;
    } else if (totalPath === (questionTrigger.x - character.width)) {
      newQuestion = new Question();
      newQuestion.createQuestion()
      questionBox.classList.remove('hidden')
      definition.innerText = newQuestion.definition
      listItems.forEach((listItem, i) => {
        listItem.element.innerText = newQuestion.answerChoices[i];
      })
    } else {
      viewPort = viewPort + stepLength;
    }
    totalPath += stepLength;
    if (questionTrigger.x === ((totalPath - stepLength - questionTrigger.width) - (canvas.width / 2))) {
      questionTrigger.x += 1000
      totalPath -= stepLength;
    }
  } else if ((event.keyCode === 49 || event.keyCode === 50 || event.keyCode === 51) && !questionBox.classList.contains('hidden')) {
    const listItem = listItems.find(item => item.keyCode === event.keyCode).element;
    if (newQuestion.checkAnswer(listItem.innerText)) {
      console.log("Correct")
    } else {
      console.log("Incorrect!")
    }
    questionBox.classList.add("hidden")
  } else if (event.keyCode === 50 && !questionBox.classList.contains('hidden')) {
    if (newQuestion.checkAnswer(listItem2.innerText)) {
      console.log("Correct")
    } else {
      console.log("Incorrect!")
    }
    questionBox.classList.add("hidden")
  } else if (event.keyCode === 51 && !questionBox.classList.contains('hidden')) {
    if (newQuestion.checkAnswer(listItem3.innerText)) {
      console.log("Correct")
    } else {
      console.log("Incorrect!")
    }
  questionBox.classList.add("hidden")
  }
})

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
