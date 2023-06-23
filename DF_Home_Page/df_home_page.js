const menu = document.querySelector("#mobile-menu")
const menuLinks = document.querySelector(".navbar__menu")

menu.addEventListener("click", function(){
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});



function checkFadeIn() {
    var mainFadeIn = document.getElementsByClassName("main fade-in")[0];
    var mainFadeInTop = mainFadeIn.getBoundingClientRect().top;
    var mainFadeInPoint = 150;

    if (mainFadeInTop - window.innerHeight + mainFadeInPoint <= 0) {
        mainFadeIn.classList.add("fade-in-visible");
    } else {
        mainFadeIn.classList.remove("fade-in-visible");
    }
}

window.addEventListener("scroll", checkFadeIn);
window.addEventListener("load", checkFadeIn);
