
// Array Of Words
const wordsEasy = [
  "Hello",
  "Name",
  "Code",
  "Town",
  "Scala",
  "Funny",
  "Task",
  "Roles",
  "Test",
  "Rust",
];

const wordsNormal = [
  "Working",
  "Runner",
  "Paradigm",
  "Styling",
  "Cascade",
  "Leetcode",
  "Internet",
  "Coding",
  "Country",
  "Github",
];

const wordsHard = [
  "Dependencies",
  "Playing",
  "Documentation",
  "Destructuring",
  "Programming",
  "Javascript",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
];

// Setting Levels
const levels = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let Choosen = document.querySelector(".Choose-a-level");
let lis = document.querySelectorAll(".Choose-a-level li");
let easylevel = document.querySelector(".Choose-a-level .easy");
let normallevel = document.querySelector(".Choose-a-level .normal");
let hardlevel = document.querySelector(".Choose-a-level .hard");
let details = document.querySelector(".details");

// Default Level
let DefaultLevelName = "Easy";
let DefaultLevelSeconds = levels[DefaultLevelName];
lvlNameSpan.innerHTML = DefaultLevelName;
secondsSpan.innerHTML = DefaultLevelSeconds;
timeLeftSpan.innerHTML = DefaultLevelSeconds;
scoreTotal.innerHTML = wordsEasy.length;

Choosen.onclick = function (e) {
  lis.forEach((li) => {
    li.classList.toggle("show");
  });
  if (e.target === easylevel) {
    // Easy Level
    let easyLevelName = "Easy";
    let easyLevelSeconds = levels[easyLevelName];
    lvlNameSpan.innerHTML = easyLevelName;
    secondsSpan.innerHTML = easyLevelSeconds;
    timeLeftSpan.innerHTML = easyLevelSeconds;
    scoreTotal.innerHTML = wordsEasy.length;
    startButton.style.backgroundColor = "var(--secondary-color)";
  } else if (e.target === normallevel) {
    // Normal Level
    let normalLevelName = "Normal";
    let normalLevelSeconds = levels[normalLevelName];
    lvlNameSpan.innerHTML = normalLevelName;
    secondsSpan.innerHTML = normalLevelSeconds;
    timeLeftSpan.innerHTML = normalLevelSeconds;
    scoreTotal.innerHTML = wordsNormal.length;
    startButton.style.backgroundColor = "brown";
  } else if (e.target === hardlevel) {
    // Hard Level
    let hardLevelName = "Hard";
    let hardLevelSeconds = levels[hardLevelName];
    lvlNameSpan.innerHTML = hardLevelName;
    secondsSpan.innerHTML = hardLevelSeconds;
    timeLeftSpan.innerHTML = hardLevelSeconds;
    scoreTotal.innerHTML = wordsHard.length;
    startButton.style.backgroundColor = "red";
  } else {
  }
};

window.onkeyup = function (e) {
  if (e.key === "Escape") {
    lis.forEach((li) => {
      li.classList.toggle("show");
    });
  }
};

document.addEventListener("click", function (e) {
  let isClickInside = Choosen.contains(e.target);
  if (!isClickInside) {
    lis.forEach((li) => {
      li.classList.remove("show");
    });
  }
});

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  Choosen.remove();
  details.remove();
  input.focus();
  // Generate Word Function
  callGen();
};

function callGen() {
  if (lvlNameSpan.textContent === "Easy") {
    genWordsEasy();
  } else if (lvlNameSpan.textContent === "Normal") {
    genWordsNormal();
  } else {
    genWordsHard();
  }
}

function genWordsEasy() {
  // Get Random Word From Array
  let randomWord = wordsEasy[Math.floor(Math.random() * wordsEasy.length)];
  // Get Word Index From Array
  let wordIndex = wordsEasy.indexOf(randomWord);
  // Remove Word From Array
  wordsEasy.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty UpcomingWords Box
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < wordsEasy.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(wordsEasy[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call StartPlay Function
  startPlay();
}

function genWordsNormal() {
  // Get Random Word From Array
  let randomWord = wordsNormal[Math.floor(Math.random() * wordsNormal.length)];
  // Get Word Index From Array
  let wordIndex = wordsNormal.indexOf(randomWord);
  // Remove Word From Array
  wordsNormal.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty UpcomingWords Box
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < wordsNormal.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(wordsNormal[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call StartPlay Function
  startPlay();
}

function genWordsHard() {
  // Get Random Word From Array
  let randomWord = wordsHard[Math.floor(Math.random() * wordsHard.length)];
  // Get Word Index From Array
  let wordIndex = wordsHard.indexOf(randomWord);
  // Remove Word From Array
  wordsHard.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty UpcomingWords Box
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < wordsHard.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(wordsHard[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call StartPlay Function
  startPlay();
}

function startPlay() {
  reSeconds();
  let timer = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(timer); // Stop Timer

      if (
        theWord.innerHTML.trim().toLowerCase() ===
        input.value.trim().toLowerCase()
      ) {
        // Compare Words
        input.value = ""; // Empty Input Field
        scoreGot.innerHTML++; // Increase Score

        // Check if there are remaining words for the current level
        if (lvlNameSpan.textContent === "Easy" && wordsEasy.length > 0) {
          genWordsEasy();
        } else if (
          lvlNameSpan.textContent === "Normal" &&
          wordsNormal.length > 0
        ) {
          genWordsNormal();
        } else if (lvlNameSpan.textContent === "Hard" && wordsHard.length > 0) {
          genWordsHard();
        } else {
          // All words completed, show congratulations
          // let span = document.createElement("span");
          // span.className = "good";
          // let spanText = document.createTextNode("Congratulations");
          // span.appendChild(spanText);
          // finishMessage.style.display = "flex";
          // finishMessage.appendChild(span);
          // ======================================================== //
          // OR
          Swal.fire({
            title: "Congratulations",
            text: "Do You Want To Play Again",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
          upcomingWords.remove(); // Remove UpcomingWords Box
          clearInterval(timer); // Ensure timer is stopped
          return;
        }
      } else {
        // Wrong input, game over
        // let span = document.createElement("span");
        // span.className = "bad";
        // let spanText = document.createTextNode("Game Over , Please Try Again");
        // span.appendChild(spanText);
        // finishMessage.style.display = "flex";
        // finishMessage.appendChild(span);
        // reload.style.display = "block";
        // ====================================== //
        // OR

        Swal.fire({
          title: "Game Over",
          text: "Please Try Again",
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });

        clearInterval(timer); // Ensure timer is stopped
        return;
      }
    }
  }, 1000);
}

function reSeconds() {
  if (lvlNameSpan.textContent === "Easy") {
    timeLeftSpan.innerHTML = levels["Easy"];
  } else if (lvlNameSpan.textContent === "Normal") {
    timeLeftSpan.innerHTML = levels["Normal"];
  } else {
    timeLeftSpan.innerHTML = levels["Hard"];
  }
}
