document.getElementById("burgerOpen").addEventListener("click", 

//My function for the burger menu
function () {
    let menu = document.getElementById("burgerMenu");
    let burgerOpenIcon = document.getElementById("burgerOpenIcon");
    let burgerCloseIcon = document.getElementById ("burgerCloseIcon");
    if (menu.style.display === "none" || menu.style.display === "") { 
        menu.style.display = "flex";
        burgerOpenIcon.style.display = "none";
        burgerCloseIcon.style.display = "block";
    } else {
        menu.style.display = "none";
        burgerOpenIcon.style.display = "block";
        burgerCloseIcon.style.display = "none";
    }
});