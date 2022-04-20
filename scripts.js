const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var questionBox = document.querySelector('.question-box');
var definition = document.querySelector('.definition');
var listItem1 = document.querySelector('.li1');
var listItem2 = document.querySelector('.li2');
var listItem3 = document.querySelector('.li3');




init();
// character
let character = {height: 100, width: 100}

// questionTrigger
let questionTrigger = {x: 600, height: 200, width: 20};

let stepLength = 10;
let characterCoordinate = 0;
let viewPort = 0;
let totalPath = 0;
var newQuestion;

document.addEventListener('keydown', function(event){
  if (event.keyCode === 39 && questionBox.classList.contains('hidden')) {
      totalPath = totalPath + stepLength;
    if (characterCoordinate <= (canvas.width/2)) {
      characterCoordinate = characterCoordinate + stepLength;
    } else if (totalPath === (questionTrigger.x - character.width + stepLength)) {
        console.log("stepLength", stepLength)
        console.log("total path", totalPath)
        console.log("question trigger", questionTrigger.x)
      newQuestion = new Question();
      newQuestion.createQuestion()
      questionBox.classList.remove('hidden')
      definition.innerText = newQuestion.definition
      listItem1.innerText = newQuestion.answerChoices[0]
      listItem2.innerText = newQuestion.answerChoices[1]
      listItem3.innerText = newQuestion.answerChoices[2]
    } else {
      viewPort = viewPort + stepLength;
    }
    if (questionTrigger.x === ((totalPath - stepLength - questionTrigger.width) - (canvas.width / 2))) {
        questionTrigger.x += 1000 
        
    }
  } else if (event.keyCode === 49 && !questionBox.classList.contains('hidden')) {
    if (newQuestion.checkAnswer(listItem1.innerText)) {
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



//console log the question
// 

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
