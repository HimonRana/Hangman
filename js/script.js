// Globala variabler

var wordList = ["ROCKET", "HANGMAN", "HUSSEÄRENÅSNA", "BUNTEN"]; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerato
var correctGuessNr = 0;
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr = 0; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd

// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
  // End init

  // Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
  var startGameBtn = document.getElementById("startGameBtn");
  var restartGameBtn = document.getElementById("restartGameBtn");
  var letterButtons = document.getElementById("letterButtons");
  var alphabetButtons = document.querySelectorAll(".btn");
  var timeSeconds = document.getElementById("seconds");
  var timeTens = document.getElementById("tens");
  var seconds = 00;
  var tens = 00;
  var interval;

  // Startknapp som får spelet igång vid knapptryckning

  startGameBtn.addEventListener("click", startGame);

  function startGame(event) {
    for (var i = 0; i < alphabetButtons.length; i++) {
      alphabetButtons[i].removeAttribute("disabled", "disabled");
    }
    randomWord();
    letterBoxes();
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
    event.target.setAttribute("disabled", "disabled");
  }

  // Restartknapp som startar spelet från början igen

  restartGameBtn.addEventListener("click", function() {
    location.reload(false);
  });

  // Funktion som slumpar fram ett ord

  function randomWord() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  }

  // Funktionen som tar fram bokstävernas rutor beroende av val av ord

  function letterBoxes() {
    for (var i = 0; i < selectedWord.length; i++) {
      var box = document.createElement("li");
      box.innerHTML = "<input disabled id=boxList" + i + ">";
      letterBoxesUl.appendChild(box);
    }
  }

  // Funktion som körs när du trycker på bokstäverna och gissar bokstav

  function checkGuess(event) {
    var guess = event.target.value;
    if (selectedWord.indexOf(guess) >= 0) {
      correctGuess(guess);
    } else {
      wrongGuess();
    }
  }

  // Funktion som körs vid rätt gissning och stoppar tiden vid rätt gissning av ord

  function correctGuess(guess) {
    for (var j = 0; j < selectedWord.length; j++) {
      if (selectedWord[j] == guess) {
        document.getElementById("boxList" + j).value = guess;
        correctGuessNr++;
        if (correctGuessNr === selectedWord.length) {
          setTimeout(function() {
            clearInterval(interval);
            alert("CONGRATULATION!");
          }, 200);
        }
      }
    }
  }

  // Funktion som körs vid fel gissning och en bild dyker upp vid varje fel bokstav samt stoppar tiden vid 6 fel

  function wrongGuess() {
    hangmanImgNr++;
    var hangmanImg = document.getElementById("hangman");
    hangmanImg.src = "images/h" + hangmanImgNr + ".png";
    if (hangmanImgNr === 6) {
      for (var a = 0; a < alphabetButtons.length; a++) {
        alphabetButtons[a].setAttribute("disabled", "disabled");
      }
      clearInterval(interval);
      alert("GAME OVER");
    }
  }

  // Funktion som som startar igång vid knappning av bokstav som skickar vidare till gissning av bokstav

  for (var j = 0; j < alphabetButtons.length; j++) {
    alphabetButtons[j].addEventListener("click", checkGuess);
    alphabetButtons[j].addEventListener("click", function(event) {
      event.target.setAttribute("disabled", "disabled");
    });
  }

  // Funktion som får timern att visa rätta siffror

  function startTimer() {
    tens++;

    if (tens < 9) {
      timeTens.innerHTML = "0" + tens;
    }
    if (tens > 9) {
      timeTens.innerHTML = tens;
    }
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      timeSeconds.innerHTML = "0" + seconds;
      tens = 0;
      timeTens.innerHTML = "0" + 0;
    }
    if (seconds > 9) {
      timeSeconds.innerHTML = seconds;
    }
  }
}
window.onload = init; // Se till att init aktiveras då sidan är inladdad
