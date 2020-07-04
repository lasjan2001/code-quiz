 //buttons
 var startBtn = document.querySelector("#begin");
 var goBackBtn = document.querySelector("#go-back")
 var clearScoresBtn = document.querySelector("#clear-high-scores")

 var questionsCon = document.getElementById("questions");
 var start = document.getElementById("intro-page");
 var end = document.getElementById("final-score")
 var scoreBan = document.getElementById("score-banner")
 var formInitials = document.getElementById("initials-form")
 var highScoresCon = document.getElementById("high-score-container")
 var highScoreView = document.getElementById("high-scores")
 var highScoreList = document.getElementById("high-score-list")
 var correctAns = document.getElementById("correct")
 var wrongAns = document.getElementById("wrong")

//questions and answers element
var question = document.getElementById("question")
var answerButtons = document.getElementById("answer-buttons")
var timer = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameovergit 
timer.innerText = 0;

//High Score Array
var HighScores = [];

//assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0

// questions array
var quizItems = [
  { q: 'A very useful tool used during development and debugging for printing content to the debugger is:', 
    a: '4. console log', 
    choices: [{choice: '1. JavaScript'}, {choice: '2. terminal/bash'}, {choice: '3. for loops'}, {choice: '4. console log'}]
  },
  { q: 'String values must be enclosed within ___________ when being assigned to variables.', 
    a: '3. quotation marks', 
    choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotation marks'}, {choice: '4. parenthesis'}]
  },
  { q: 'Arrays in JavaScript can be used to store ___________.', 
    a: '4. all of the above', 
    choices: [{choice: '1. numbers and strings'}, {choice: '2. other arrays'}, {choice: '3. booleans'}, {choice: '4. all of the above'}]
  },
  { q: 'The condition in an if/else statement is enclosed with ___________.', 
    a: '3. parenthesis', 
    choices: [{choice: '1. quotation marks'}, {choice: '2. curly brackets'}, {choice: '3. parenthesis'}, {choice: '4. square brackets'}]
  },
  { q: 'Commonly used data types do not include:', 
    a: '3. alerts', 
    choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. alerts'}, {choice: '4. numbers'}]
  },
];

 //if go back button is clicked
 var renderStartPage = function () {
    highScoresCon.classList.add("play")
    highScoresCon.classList.remove("start")
    start.classList.remove("play")
    start.classList.add("start")
    score.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timer.textContent = 0 
    score = 0

    if (correctAns.className = "start") {
        correctAns.classList.remove("start");
        correctAns.classList.add("play")
    }
    if (wrongAns.className = "start") {
        wrongAns.classList.remove("start");
        wrongAns.classList.add("play");
    }
}

//Time functions
var setTime = function () {
    timeleft = 30;

var timercheck = setInterval(function() {
    timer.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }
   
    if (timeleft < 0) {
        showScore()
        timer.innerText = 0
        clearInterval(timercheck)
    }

    }, 1000)
}

var startQuiz = function() {
    //classes to show/hide start and quiz screen
    start.classList.add('play');
    start.classList.remove('start');
    questionsCon.classList.remove('play');
    questionsCon.classList.add('start');
    //Shuffle the questions so they show in random order
    arrayShuffledQuestions = quizItems.sort(() => Math.random() - 1)
    setTime()
    setQuestion()
  }

 //question appearance setup
 var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    };
};

//question display
var displayQuestion = function(index) {
    question.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerButtons.appendChild(answerbutton)
        }
    };
//correct answer verification
var answerCorrect = function() {
    if (correctAns.className = "play") {
        correctAns.classList.remove("play")
        correctAns.classList.add("banner")
        wrongAns.classList.remove("banner")
        wrongAns.classList.add("play")
        }
    }  
//incorrect answer verification
var answerWrong = function() {
    if (wrongAns.className = "play") {
        wrongAns.classList.remove("play")
        wrongAns.classList.add("banner")
        correctAns.classList.remove("banner")
        correctAns.classList.add("play")
    }
}

//check for correct answer  
var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
            answerCorrect()
            score = score + 10
        }

        else {
          answerWrong()
          score = score - 1;
          timeleft = timeleft - 10;
      };

    //set next question
      QuestionIndex++
        if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
            setQuestion()
        }   
        else {
           gameover = "true";
           showScore();
            }
}

 //final score display
 var showScore = function () {
    questionsCon.classList.add("play");
    end.classList.remove("play");
    end.classList.add("start");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    scoreBan.appendChild(scoreDisplay);
}  

 //create high score values/form input
 var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
      alert("Enter your intials!");
      return;
    }

  formInitials.reset();

  var HighScore = {
  initials: initials,
  score: score
  } 

  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {return b.score-a.score});

//clear list to resort
while (highScoreList.firstChild) {
   highScoreList.removeChild(highScoreList.firstChild)
}

//high score list elements
for (var i = 0; i < HighScores.length; i++) {
  var highscoreEl = document.createElement("li");
  highscoreEl.ClassName = "high-score";
  highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
  highScoreList.appendChild(highscoreEl);
}

  saveHighScore();
  displayHighScores();

}
//high score storage
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
        
}

var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
        if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        highScoreList.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);
        
    }
}  

//show high score screen when intiials entered
var displayHighScores = function() {

    highScoresCon.classList.remove("play");
    highScoresCon.classList.add("start");
    gameover = "true"

    if (end.className = "start") {
        end.classList.remove("start");
        end.classList.add("play");
        }
    if (start.className = "start") {
        start.classList.remove("start");
        start.classList.add("play");
        }
        
    if (questionsCon.className = "start") {
        questionsCon.classList.remove("start");
        questionsCon.classList.add("play");
        }

    if (correctAns.className = "start") {
        correctAns.classList.remove("start");
        correctAns.classList.add("play");
    }

    if (wrongAns.className = "start") {
        wrongAns.classList.remove("start");
        wrongAns.classList.add("play");
        }
    
}
//clears high scores
var clearScores = function () {
    HighScores = [];

    while (highScoreList.firstChild) {
        highScoreList.removeChild(highScoreList.firstChild);
    }

    localStorage.clear(HighScores);
} 

loadHighScore()

//Events
 startBtn.addEventListener("click", startQuiz)
 goBackBtn.addEventListener("click", renderStartPage)
 clearScoresBtn.addEventListener("click", clearScores)
 formInitials.addEventListener("submit", createHighScore)
 highScoreView.addEventListener("click", displayHighScores)
 

