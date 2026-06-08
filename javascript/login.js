const BtnLogin = document.getElementById("BtnLogin");
const loginDialog = document.getElementById("loginDialog");

const fecharLogin = document.getElementById('fecharLogin');

BtnLogin.addEventListener("click", () => loginDialog.showModal())

fecharLogin.addEventListener("click", () => loginDialog.close())