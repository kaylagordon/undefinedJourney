class Question {
  constructor() {
    this.definition = '',
    this.correctAnswer = '',
    this.answerChoices = []
  }

  createQuestion() {
    const definitionIndex = Math.floor(Math.random() * definitions.length);

    this.definition = definitions[definitionIndex].definition;
    this.correctAnswer = definitions[definitionIndex].word;
    this.answerChoices.push(this.correctAnswer);

    while (this.answerChoices.length < 3) {
      const wordIndex = Math.floor(Math.random() * words.length);
      if (!this.answerChoices.includes(words[wordIndex])) {
        this.answerChoices.push(words[wordIndex])
      }
    }

    this.shuffleAnswers();
  }

  shuffleAnswers() {
    let currentIndex = this.answerChoices.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.answerChoices[currentIndex], this.answerChoices[randomIndex]] = [this.answerChoices[randomIndex], this.answerChoices[currentIndex]];
    }
  }

  checkAnswer(guess) {
    if (guess === this.correctAnswer) {
      return true;
    } else {
      return false;
    }
  }

}
