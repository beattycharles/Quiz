var timeEl = document.querySelector(".time");
var hideText = document.querySelector("#info");
var hideBar = document.querySelector(".Begin");
var secondsLeft = 60;
var qIndex = 0;
var questionPageEl = document.querySelector("#question-page");
var questionHeading = questionPageEl.querySelector("#question");
var answersEl = questionPageEl.querySelector("#answer-choices");
var Canvas = document.querySelector(".Canvas");
var Qtime = document.querySelector(".Questions");
var gameOverEl = document.querySelector("#game-over");
var formEl = gameOverEl.querySelector("form");
var scoreboardPageEl = document.querySelector("#scoreboard");
var btnTryAgain = scoreboardPageEl.querySelector("#try-again");
var score = 0;
var savedScoresArr = [];
var scoreboard;
var clearInterval;
var myQuestions = [
  {
    question: "What is your name?",
    answersChoices: [
      "Tim",
      "Author King of the Britians",
      "Knights who say NI.",
    ],
    answerCorrect: "Author King of the Britians",
  },
  {
    question: "What is my favorite Color?",
    answersChoices: ["Red", "Blue", "Green"],
    answerCorrect: "Blue",
  },
  {
    question: "What is the air speed velocity of an unladen swallow?",
    answersChoices: ["24 mph", "32kph", "African or European?"],
    answerCorrect: "African or European?",
  },
  {
    question: "What holy relic does Brother Maynard carry with him?",
    answersChoices: [
      "Holy Hand Grenade of Antioch",
      "Book of Armaments",
      "The Jaw of St Anthony",
    ],
    answerCorrect: "Holy Hand Grenade of Antioch",
  },
];
gameOverEl.style.display = "none";
scoreboardPageEl.style.display = "none";

function setTime() {
  hideText.textContent = "";
  hideBar.textContent = "";
  // Canvas.remove();
  showQuestion();
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + "seconds left";

    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

var showQuestion = function () {
  questionHeading.textContent = myQuestions[qIndex].question;

  for (var i = 0; i < 4; i++) {
    var answerChoice = document.createElement("p");
    answerChoice.textContent = myQuestions[qIndex].answersChoices[i];
    answerChoice.className = "answer-choice";
    answersEl.appendChild(answerChoice);
  }
  // Event listener for clicking on answer choices
  answersEl.addEventListener("click", checkAnswer);
};

var checkAnswer = function (event) {
  // Check for correct answer
  var chosenAnswer = event.target;
  if (chosenAnswer.textContent === myQuestions[qIndex].answerCorrect) {
    score = score + 5;
  } else {
    secondsLeft = secondsLeft - 10;
  }
  qIndex++;

  if (qIndex < myQuestions.length) {
    while (answersEl.firstChild) {
      questionHeading.textContent = "";
      answersEl.removeChild(answersEl.firstChild);
    }

    showQuestion();
  } else {
    sendMessage();
    return;
  }
  clearInterval(timerInterval);
};
var sendMessage = function () {
  questionHeading.remove();
  questionPageEl.remove();
  timeEl.textContent = " ";
  gameOverEl.style.display = "block";
  score = score + secondsLeft;
  var imgEl = document.createElement("img");
  imgEl.setAttribute("src", "./assits/monty-python-holy-grail.gif");
  imgEl.onload = function () {
    this.style.position = "absolute";
  };
  timeEl.appendChild(imgEl);
};

var gameOver = function () {
  score = score + timeLeft;
  clearInterval(timerInterval);

  // Display current score
  var displayScoreEl = gameOverEl.querySelector("#your-score");
  displayScoreEl.textContent = "YOUR SCORE: " + score;

  return score;
};

// Save score
var submitScore = function (event) {
  event.preventDefault();

  var initialsSave = gameOverEl.querySelector("#initials").value;

  scoreboard = JSON.parse(localStorage.getItem("score")) || [];
  // savedScoresArr.push(scoreboard);
  // console.log(savedScoresArr);

  // Save initial and score pair as an object and push to savedScoresArr
  var scoreObj = {
    initial: initialsSave,
    score: score,
  };
  console.log(scoreObj);
  scoreboard.push(scoreObj);

  // Stringify array for local storage
  localStorage.setItem("score", JSON.stringify(scoreboard));

  gameOverEl.style.display = "none";
  scoreboardPageEl.style.display = "block";

  loadScore();
};

// Retrieve score and display on scoreboard
var loadScore = function () {
  if (!savedScoresArr) {
    return false;
  }

  var scoreTableBody = scoreboardPageEl.querySelector("#score-table-body");
  scoreboard = JSON.parse(localStorage.getItem("score")) || [];

  //create table row per each saved score object
  for (var i = 0; i < scoreboard.length; i++) {
    var scoreTableRow = document.createElement("tr");
    scoreTableBody.appendChild(scoreTableRow);
    var tableDataInitials = document.createElement("td");
    var tableDataScore = document.createElement("td");
    tableDataInitials.textContent = scoreboard[i].initial;
    tableDataScore.textContent = scoreboard[i].score;
    scoreTableRow.appendChild(tableDataScore);
    scoreTableRow.appendChild(tableDataInitials);
  }
};

// Restart game by refreshing page
var restart = function () {
  document.location.reload(false);
};

// Submit score
formEl.addEventListener("submit", submitScore);

// Try quiz again
btnTryAgain.addEventListener("click", restart);
document.getElementById("Start").addEventListener("click", setTime);
