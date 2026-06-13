const darkMode = document.getElementById("btnDark");

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") {
    document.body.classList.add("dark");
    darkMode.innerText = "sunny";
} else {
    darkMode.innerText = "dark_mode";
}

darkMode.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        darkMode.innerText = "sunny";

        localStorage.setItem("tema", "dark");

    } else {

        darkMode.innerText = "dark_mode";

        localStorage.setItem("tema", "light");
    }
});
