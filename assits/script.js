var timeEl = document.querySelector(".time");
var hideText = document.querySelector("#info");
var hideBar = document.querySelector(".Begin");
var secondsLeft = 10;
var Canvas = document.querySelector(".Canvas");

document.getElementById("Start").addEventListener("click", setTime);

function setTime() {
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
  hideText.textContent = " ";
  document.querySelector(".Begin").remove();
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
