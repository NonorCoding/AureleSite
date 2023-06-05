const parties = document.querySelectorAll(".partie");
const texts = document.querySelectorAll(".center-text");
const scrollMouse = document.querySelector(".home-scroll");
const copyright = document.querySelector(".copyright");
const loaderPage = document.querySelector(".loader-page");
const home = document.querySelector(".home");
let transform;

window.addEventListener("scroll", () => {
  var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  var pos = window.innerHeight;

  console.log(scroll, pos);

  parties.forEach((partie) => {
    partie.style.height = `${Math.max(0, -scroll + window.innerHeight / 2)}px`;
  });

  transform = 50 + scroll / 17;
  texts[0].style.transform = `translateY(${transform}%)`;
  texts[1].style.transform = `translateY(${-transform}%)`;

  scrollMouse.style.bottom = `${120 - scroll / 5}px`;
  copyright.style.bottom = `${30 - scroll / 15}px`;

  const breaked = pos / 2 + 150;

  if (scroll < breaked) {
    home.style.position = "fixed";
    home.style.top = "0px";
  } else {
    home.style.position = "relative";
    home.style.top = breaked + "px";
  }

  if (scroll < pos / 2) {
    loaderPage.style.display = "";
  } else {
    loaderPage.style.display = "none";
  }

  if (scroll > 100){
    document.querySelector(".home-description").style.animationName = 'menuFade';
  }
  if (scroll < 10){
    document.querySelector(".home-description").style.animationName = '';
  }

  document.documentElement.style.setProperty("--project-top", pos + breaked + "px");
});
