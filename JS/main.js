// Making Progress Bar
let scroller = document.querySelector(".scroller");

let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  scroller.style.width = `${(scrollTop / height) * 100}%`;
});

// Scroll To Top Button
let scrollTop = document.querySelector(".scroll");

window.onscroll = function () {
  if (scrollY >= 1000) {
    scrollTop.classList.add("scroll-active");
  } else {
    scrollTop.classList.remove("scroll-active");
  }
};

scrollTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Landing Page Cards hover
let cards = document.querySelector(".landing .cards");
let card = document.querySelectorAll(".landing .cards .card");

let cardArray = Array.from(card);

cardArray.forEach((ele) => {
  ele.addEventListener("mouseenter", function (e) {
    handleActive(e);
  });
});

// Start Settings Box

// Toggle Settings Box
let toggle = document.querySelector(".toggle-settings");
let gear = document.querySelector(".toggle-settings .fa-gear");
let settingsBox = document.querySelector(".settings-box");

toggle.onclick = function () {
  settingsBox.classList.toggle("open");
  gear.classList.toggle("fa-spin");
};

// Change Main Color and Adding It To Local Storage
const colorLi = document.querySelectorAll(".option-box ul li");
const imageAbout = document.querySelector(".about .image");
// Check If Already There is color in Local Storage
if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
  );
  colorLi.forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color == window.localStorage.getItem("color")) {
      ele.classList.add("active");
    }
  });
}
if (window.localStorage.getItem("aboutImage")) {
  imageAbout.innerHTML = window.localStorage.getItem("aboutImage");
}
colorLi.forEach((Li) => {
  Li.addEventListener("click", (e) => {
    handleActive(e);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("color", e.target.dataset.color);
    // Change About Section Image
    imageAbout.innerHTML = `<img src="./imgs/about${e.target.dataset.number}.png" alt="Design Picture" />`;
    // Save About Section Image To Local Storage
    window.localStorage.setItem("aboutImage", imageAbout.innerHTML);
  });
});

// Changing Landing Page Image
let landing = document.querySelector(".landing");
const randomBack = document.querySelectorAll(".random-backgrounds span");
function removeActiveRandomize(randomBack) {
  randomBack.forEach((span) => {
    span.classList.remove("active");
  });
}
let imageArray = [
  "landing1.jpg",
  "landing2.jpg",
  "landing3.jpg",
  "landing4.png",
  "landing5.jpg",
];
let randomCounter;
function randomImgs() {
  randomCounter = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imageArray.length);

    landing.style.backgroundImage = `url(./imgs/${imageArray[randomNumber]})`;
  }, 5000);
}
randomImgs();
// Check Local Storage To Randomize Or Not
if (window.localStorage.getItem("Randomize") == "no") {
  clearInterval(randomCounter);
  removeActiveRandomize(randomBack);
  document.querySelector(".no").classList.add("active");
} else if (window.localStorage.getItem("Randomize") == "yes") {
  removeActiveRandomize(randomBack);
  document.querySelector(".yes").classList.add("active");
}
document.querySelector(".yes").addEventListener("click", function () {
  randomImgs();
  window.localStorage.setItem("Randomize", "yes");
});
document.querySelector(".no").addEventListener("click", function () {
  clearInterval(randomCounter);
  window.localStorage.setItem("Randomize", "no");
});
// Change To Random Backgrounds
randomBack.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
  });
});
// Navigation Bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet");
let navBullets = document.querySelector(".nav-bullets");
let bulletOptionSpans = document.querySelectorAll(".bullets-option span");
// Scroll To Every Section On click
bullets.forEach((bullet) => {
  bullet.addEventListener("click", function (e) {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behaviour: "smooth",
    });
  });
});
// Check Local Storage
let localStorageNav = window.localStorage.getItem("Show Nav Bullets");
if (localStorageNav) {
  navBullets.style.right = localStorageNav;
  if (localStorageNav == "-100px") {
    removeActiveRandomize(bulletOptionSpans);
    document.querySelector(".bullets-option .no").classList.add("active");
  }
  if (localStorageNav == "0") {
    removeActiveRandomize(bulletOptionSpans);
    document.querySelector(".bullets-option .yes").classList.add("active");
  }
}
// Show Navigation Bullets Or Not
bulletOptionSpans.forEach((span) => {
  span.addEventListener("click", function (e) {
    handleActive(e);
    navBullets.style.right = e.target.dataset.bullet;
    window.localStorage.setItem("Show Nav Bullets", e.target.dataset.bullet);
  });
});
// Reset Option Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// End Settings Box

// Our Skills Section Animated On Scroll
let skillsSection = document.querySelector(".our-skills");
let spans = document.querySelectorAll(".prog-bar");

window.addEventListener("scroll", function () {
  if (window.scrollY >= skillsSection.offsetTop - 200) {
    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
});

// Gallery Popup Image Onclick
const gallery = document.querySelectorAll(".pictures img");

gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.append(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupHeading = document.createElement("h3");
    popupHeading.append(img.alt);
    popupBox.appendChild(popupHeading);
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    // Creating The Close Button
    let close = document.createElement("span");
    close.append("X");
    close.className = "close-button";
    popupBox.appendChild(close);
  });
});
// Close Popup Image On Click
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Handle Active Elements Function
function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((li) => {
    li.classList.remove("active");
  });
  e.target.classList.add("active");
}

// Toggle Menu On Small and Medium Devices
let menu = document.querySelector(".landing button");
let links = document.querySelector(".landing .links");
let link = document.querySelectorAll(".landing .links a");

menu.addEventListener("click", function (e) {
  e.stopPropagation();
  menu.classList.toggle("active");
  links.classList.toggle("open");
});
window.addEventListener("click", function (e) {
  if (e.target != menu) {
    if (links.classList.contains("open")) {
      menu.classList.toggle("active");
      links.classList.toggle("open");
    }
  }
});
links.addEventListener("click", function (e) {
  e.stopPropagation();
});
link.forEach((ele) => {
  ele.addEventListener("click", function () {
    menu.classList.toggle("active");
    links.classList.toggle("open");
  });
});
