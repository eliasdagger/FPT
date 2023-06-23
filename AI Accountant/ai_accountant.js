const menu = document.querySelector("#mobile-menu")
const menuLinks = document.querySelector(".navbar__menu")

menu.addEventListener("click", function(){
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});

// function scrollToServices() {
//     $('html, body').animate({
//       scrollTop: $('#services').offset().top
//     }, 1000);
//   }
  