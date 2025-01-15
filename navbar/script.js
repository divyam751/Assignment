const handleClick = () => {
  const dropdown = document.querySelector(".dropdown");
  dropdown.style.visibility =
    dropdown.style.visibility === "visible" ? "hidden" : "visible";
};
const courses = document.querySelector(".courses-btn");
courses.addEventListener("click", () => handleClick());

const hamburger = document.getElementById("hamburger");
const rightBox = document.querySelector(".rightBox");

hamburger.addEventListener("click", () => {
  rightBox.classList.toggle("active");
});
