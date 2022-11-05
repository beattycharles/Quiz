var timeEl = document.querySelector(".time");
var hideText = document.querySelector("#info");
var hideBar = document.querySelector(".Begin");
var secondsLeft = 20;
var qIndex = 0;
var questionPageEl = document.querySelector("#question-page");
var questionHeading = questionPageEl.querySelector("#question");
var answersEl = questionPageEl.querySelector("#answer-choices");
var Canvas = document.querySelector(".Canvas");
var Qtime = document.querySelector(".Questions");
var myQuestions = [
  {
    question: "What is your name?",
    answersChoices: [
    "Tim",
    "Author King of the Britians",
    "Knights who say NI."],
    answerCorrect: "Author King of the Britians"
    },
    {
      question: "What is my favorite Color?",
      answersChoices: [
         "Red",
         "Blue",
         "Green",],
         answerCorrect: "Blue"
      },
      {
        question: "What is the air speed velocity of an unladen swallow?",
        answersChoices: [
           "24 mph",
           "32kph",
           "African or European?",],
           answerCorrect: "African or European?"
        },
        {
          question: "What holy relic does Brother Maynard carry with him?",
          answersChoices: [
             "Holy Hand Grenade of Antioch",
             "Book of Armaments",
             "The Jaw of St Anthony",],
             answerCorrect: "Holy Hand Grenade of Antioch"},
];

document.getElementById("Start").addEventListener("click", setTime);

function setTime() {
  hideText.textContent = " ";
  hideBar.textContent = "";
  Canvas.remove();
  showQuestion();
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + "seconds left";

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
  
};

var showQuestion = function(){
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
  if (chosenAnswer.textContent === myQuestions[qIndex].answerCorrect) 
  { score = score + 5;
  }
  else {
      secondsLeft = secondsLeft - 10;
  }
  qIndex++

  if (qIndex < myQuestions.length) {
    while (answersEl.firstChild) {
        questionHeading.textContent = "";
        answersEl.removeChild(answersEl.firstChild);
  };

  showQuestion();
} else {
    sendMessage();
    return;
};
};
var sendMessage = function() {
  timeEl.textContent = " ";
  var imgEl = document.createElement("img");
  imgEl.setAttribute("src", "./assits/monty-python-holy-grail.gif");
  imgEl.onload = function () {
    var imageWidth = this.offsetWidth,
      imageHeight = this.offsetHeight,
      vpWidth = document.documentElement.clientWidth,
      vpHeight = document.documentElement.clientHeight;

    this.style.position = "absolute";
    this.style.left = (vpWidth - imageWidth) / 2 + "px";
    this.style.top = (vpHeight - imageHeight) / 2 + window.pageYOffset + "px";
  };
  Canvas.appendChild(imgEl);
};

