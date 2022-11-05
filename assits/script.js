var timeEl = document.querySelector(".time");
var hideText = document.querySelector("#info");
var hideBar = document.querySelector(".Begin");
var secondsLeft = 10;
var Canvas = document.querySelector(".Canvas");
var Qtime = document.querySelector(".Questions");

var myQuestions = [
  {
    question: "What is your name?",
    answers: {
      a: "Tim",
      b: "Author King of the Britians",
      c: "Knights who say NI.",
    },
    correctAnswer: "b",
  },
  {
    question: "What is my favorit Color?",
    answers: {
      a: "Red",
      b: "Green",
      c: "Blue",
    },
    correctAnswer: "c",
  },
  {
    question: "what is the airspeed velocity of an unladen swallow?",
    answers: {
      a: "24 mph",
      b: "What?",
      C: "African or European?",
    },
    correctAnswer: "c",
  },
];

document.getElementById("Start").addEventListener("click", setTime);

function setTime() {
  hideText.textContent = " ";
  document.querySelector(".Begin").remove();
  myQuestions.appendChild(showTime);
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + "seconds left";

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append message
      sendMessage();
    }
  }, 1000);
}

function sendMessage() {
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
}
