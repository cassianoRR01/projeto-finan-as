const BtnLogin = document.getElementById("BtnLogin");
const loginDialog = document.getElementById("loginDialog");

const fecharLogin = document.getElementById('fecharLogin');

BtnLogin.addEventListener("click", function() {
    loginDialog.showModal();
});

fecharLogin.addEventListener("click", function(event) {
    event.preventDefault();
    loginDialog.close();
});