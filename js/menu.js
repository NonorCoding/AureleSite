const menuButton = document.querySelector(".menu-button");

const littleSquare = document.querySelectorAll(".little-square");
const bigSquare = document.querySelector(".big-square");

let activeButton = true;

function activeButtonClickOn() {
  document.querySelector(".menu-slider").style.display = "flex";

  setTimeout(() => {
    document.querySelector(".menu-slider").style.opacity = 1;
  }, 1);

  littleSquare[0].classList.add("active");
  littleSquare[1].classList.add("active");

  bigSquare.classList.add("active");

  activeButton = false;
}

function activeButtonClickOff() {
  document.querySelector(".menu-slider").style.opacity = 0;

  setTimeout(() => {
    document.querySelector(".menu-slider").style.display = "none";
  }, 400);

  littleSquare[0].classList.remove("active");
  littleSquare[1].classList.remove("active");

  bigSquare.classList.remove("active");
  activeButton = true;
}

menuButton.addEventListener("click", () => {
  if (activeButton === true) {
    activeButtonClickOn();
  } else {
    activeButtonClickOff();
  }
});

const menuItems = document.querySelectorAll(".menu-slider-items");

menuItems.forEach((links) => {
  links.addEventListener("click", () => {
    activeButtonClickOff();
  });
});

// --------------------------------------------------------------------------------
// let modeActive = true;
// let langageActive = true;

// const lightMode = document.querySelector(".light-mode");
// const darkMode = document.querySelector(".dark-mode");

// const frenchLangage = document.querySelector(".french");
// const englishLangage = document.querySelector(".english");

// document.querySelector(".page-mode").addEventListener("click", () => {
//   if (modeActive === true) {
//     lightMode.classList.add("mode-unactive");
//     darkMode.classList.remove("mode-unactive");
//     darkMode.classList.add("mode-active");
//     lightMode.classList.remove("mode-active");
//     modeActive = false;
//   } else {
//     lightMode.classList.add("mode-active");
//     darkMode.classList.remove("mode-active");
//     darkMode.classList.add("mode-unactive");
//     lightMode.classList.remove("mode-unactive");
//     modeActive = true;
//   }
// });

// document.querySelector(".page-langage").addEventListener("click", () => {
//   if (langageActive === true) {
//     frenchLangage.classList.add("mode-unactive");
//     englishLangage.classList.remove("mode-unactive");
//     englishLangage.classList.add("mode-active");
//     frenchLangage.classList.remove("mode-active");
//     langageActive = false;
//   } else {
//     frenchLangage.classList.add("mode-active");
//     englishLangage.classList.remove("mode-active");
//     englishLangage.classList.add("mode-unactive");
//     frenchLangage.classList.remove("mode-unactive");
//     langageActive = true;
//   }
// });
// --------------------------------------------------------------------------------

function getRandomLetter() {
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function getRandomWord(word) {
  var finalWord = "";
  for (var i = 0; i < word.length; i++) {
    finalWord += word[i] === " " ? " " : getRandomLetter();
  }
  return finalWord;
}

var words = document.querySelectorAll(".glitch");

words.forEach((word) => {
  var INITIAL_WORD = word.innerHTML;
  var interv;
  var canChange = false;
  var globalCount = 0;
  var count = 0;
  var isGoing = false;

  word.addEventListener("mouseenter", () => {
    if (isGoing) return;
    isGoing = true;
    var randomWord = getRandomWord(INITIAL_WORD);
    word.innerHTML = randomWord;

    interv = setInterval(function () {
      var finalWord = "";
      for (var x = 0; x < INITIAL_WORD.length; x++) {
        finalWord +=
          x <= count && canChange ? INITIAL_WORD[x] : getRandomLetter();
      }
      word.innerHTML = finalWord;
      if (canChange) {
        count++;
      }
      if (globalCount > 5) {
        canChange = true;
      }
      if (count >= INITIAL_WORD.length) {
        clearInterval(interv);
        count = 0;
        canChange = false;
        globalCount = 0;
        isGoing = false;
      }
      globalCount++;
    }, 20);
  });
});