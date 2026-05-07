const darkMode = document.getElementById("btnDarkMode");

darkMode.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkMode.innerText = "sunny";

    } else {
        darkMode.innerText = "dark_mode";
    }
});


