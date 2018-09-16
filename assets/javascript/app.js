
var quizPanel = $('#quiz-area');
var countStartNumber = 20;

//CLICK EVENTS
//start over button
$(document).on('click', '#start-over-button', function(event) {
  game.reset();
});
//answer buttons
$(document).on('click', '.answer-button', function(event) {
  game.clicked(event);
});
//time remaining displayed with span ID of counter-number starting at 20 sec
$(document).on('click', '#startButton', function(event) {     
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="timer-number">20</span> Seconds</h2>');
  game.loadQuestion();
});




//QUESTIONS OBJECT ARRAY

var questions = [{
  question: "Who is gonna be King of the Pirates?",
  answers: ["Jack Sparrow", "Monkey D. Luffy", "Blackbeard", "God Usopp"],
  correctAnswer: "Monkey D. Luffy",
  image:"assets/images/monkey.jpg"
}, {
  question: "What is the name of the Pirate King's crew?",
  answers: ["The Sun Pirates", "The Foxy Pirates", "The Kid Pirates", "The Straw Hat Pirates"],
  correctAnswer: "The Straw Hat Pirates",
  image:"assets/images/jolly.jpg"
}, {
  question: "Who is the original King of the Pirates?",
  answers: ["Marshall D. Teach", "Vinsmoke Sanji", "Gol D. Roger", "Buggy The Clown"],
  correctAnswer: "Gol D. Roger",
  image:"assets/images/king.jpg"
}, {
  question: "The character Coby dreams of becoming...",
  answers: ["The King of the Pirates", "A Marine", "The Greatest Shipwright", "The Strongest Man in the World"],
  correctAnswer: "A Marine",
  image:"assets/images/coby.png"
}, {
  question: "How do you become the King of the Pirates?",
  answers: ["By finding the One Piece", "By ruling the world", "By defeating the King of the Pirates", "By becoming the strongest"],
  correctAnswer: "By finding the One Piece",
  image:"assets/images/devilfruit.png"
}, {
  question: "Zoro is the ... of the Staw Hat Pirates",
  answers: ["Sniper", "Cook", "Swordsman", "Navigator"],
  correctAnswer: "Swordsman",
  image:"assets/images/zoro.jpg"
}, {
  question: "Which one of these characters are one of the 7 Warlords of the Sea?",
  answers: ["Magellan", "Don Quixote Doflamingo", "Bellamy", "Whitebeard"],
  correctAnswer: "Don Quixote Doflamingo",
  image:"assets/images/doffy.jpg"
}, {
  question: "The pirate Edward Newgate is formerly known as...",
  answers: ["Blackbeard", "Gol D. Roger", "Buggy The Clown", "Whitebeard"],
  correctAnswer: "Whitebeard",
  image:"assets/images/pop.jpg"
}];



//GAME FUNCTIONS

var game = {
  questions: questions,   //questions array
  currentQuestion: 0,     //index of questions arr
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
  countdown: function(){            //count down function from 20 till 0
    game.counter--;
    $('#timer-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){     //countdown starts, add question to h2, for loop each button answer to select
    timer = setInterval(game.countdown, 1000); //countdown function starts decrementing every 1 second
    //display current question
    quizPanel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
    //loop through answers array of current question and append each answer as a button
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
      quizPanel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;    //start at 20 seconds
    $('#timer-number').html(game.counter);   //display current decreasing countdown
    game.currentQuestion++;     //increment to next question in object array, changes the INDEX value of questions array
    game.loadQuestion();
  },
  timeUp: function (){      //execute when countdown hits 0
    clearInterval(timer);   //stop timer once hits 0
    $('#timer-number').html(game.counter);
    //display out of time; append correct answer, and image
    quizPanel.html('<h2>Out of Time!</h2>');    
    quizPanel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    quizPanel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){  //IF last question, after 20 sec execute results
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);    //ELSE execute next question after 20 sec
    }
  },
  results: function() {         //stop timer, append results of game, append start over button
    clearInterval(timer);

    quizPanel.html('<h2>All done, heres how you did!</h2>');
    $('#timer-number').html(game.counter);
    quizPanel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    quizPanel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    quizPanel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');   //questions array length - (incorrect and correct number)
    quizPanel.append('<br><button id="start-over-button">Start Over?</button>');
  },
  clicked: function(event) {        //clicking answer function
    clearInterval(timer);      //stop timer, 
//when event is targeting (clicking on) the "name" data of the correct answer of the currentQuestion
    if ($(event.target).data("name") === questions[this.currentQuestion].correctAnswer){ //IF event clicked is the targeted right answer
      this.answeredCorrectly();   //execute correct function of current question
    } else {
      this.answeredIncorrectly(); //execute incorrect function of current question
    }
  },
  answeredIncorrectly: function() {   //increment incorrect, clear timer, append correct answer and image
    game.incorrect++;
    clearInterval(timer);
    quizPanel.html('<h2>Nope!</h2>');
    quizPanel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    quizPanel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){   //IF last question, execute results
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);      //ELSE execute next question
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    quizPanel.html('<h2>Correct!</h2>');
    quizPanel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  reset: function() {   //executes after clicking start over button
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};