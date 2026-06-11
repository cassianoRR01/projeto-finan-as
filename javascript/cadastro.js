

// Formulário //
const formCad = document.getElementById("formCadastro")

// Campos do Formulario de Cadastro //

const nomeCad = document.getElementById("nomeCadastro")
const emailCad = document.getElementById("emailCadastro")
const senhaCad = document.getElementById('senhaCad')
const conSenha = document.getElementById('conSenhaCad')
const cpfCad = document.getElementById("cpfCadastro")

const cepCad = document.getElementById("cepCadastro")
const ruaCad = document.getElementById('ruaCadastro')
const bairroCad = document.getElementById('bairroCadastro')
const localidadeCad = document.getElementById('cidadeCadastro')
const estadoCad = document.getElementById('estadoCadastro')
const ufCad = document.getElementById('ufCadastro')
const numCad = document.getElementById('numCadastro')
const complementoCad = document.getElementById('complementoCadastro')

// Mensagem Sucesso //
const spanCad = document.getElementById('spanCadastro')

function consultaCEP(){
    let cep = cepCad.value.replace(/\D/g, '');

    let urlCEP = `https://viacep.com.br/ws/${cep}/json/`
    fetch(urlCEP)
        .then(response => response.json())
        .then(data => {
            ruaCad.value = data.logradouro
            bairroCad.value = data.bairro
            localidadeCad.value = data.localidade
            estadoCad.value = data.estado
            ufCad.value = data.uf
        })
        .catch(error => console.error(error))
}

// Mensagem de Erro //

const spanConta = document.querySelectorAll('.spanForm')
const campo = document.querySelectorAll('.campo')

// Functions para Validar Campos //

function setError(index){
    campo[index].style.border = '2px solid red';
    spanConta[index].style.display = 'inline-block';
}

function tiraErro(index){
    campo[index].style.border = '';
    spanConta[index].style.display = 'none';
}

function valCadNome(){
    if(campo[0].value.trim() === ''){
        setError(0);
        return false;
    } else {
        tiraErro(0);
        return true;
    }
}

function valCadEmail(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email = emailCad.value
    if(regex.test(email)){
        tiraErro(1)
        return true
    } else{
        setError(1)
        return false
    }
}

function valSenhaCad(){
    const senha = senhaCad.value.trim();
    const confirmarSenha = conSenha.value.trim();

    // Mínimo de 8 caracteres, pelo menos 1 letra e 1 número
    const regexSenha = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if(!regexSenha.test(senha)){
        setError(2);
        spanConta[2].textContent = 'Senha muito Curta (Mín.: 8 caracteres, contendo letras e números).';
        return false;
    }

    tiraErro(2);

    if(senha !== confirmarSenha){
        setError(3);
        spanConta[3].textContent = 'As senhas precisam ser iguais.';
        return false;
    }

    tiraErro(3);
    return true;
}

function valCpfCad(){
    let cpf = cpfCad.value.replace(/\D/g, '');

    if(cpf.length !== 11){
        setError(4);
        return false;
    }

    // Impede CPFs com todos os números iguais
    if(/^(\d)\1+$/.test(cpf)){
        setError(4);
        return false;
    }

    // Primeiro dígito verificador
    let soma = 0;

    for(let i = 0; i < 9; i++){
        soma += Number(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if(resto === 10) resto = 0;

    if(resto !== Number(cpf.charAt(9))){
        setError(4);
        return false;
    }

    // Segundo dígito verificador
    soma = 0;

    for(let i = 0; i < 10; i++){
        soma += Number(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if(resto === 10) resto = 0;

    if(resto !== Number(cpf.charAt(10))){
        setError(4);
        return false;
    }

    tiraErro(4);
    return true;
}

function valCepCad(){
    let cep = cepCad.value.replace(/\D/g, '');

    if(cep.length !== 8){
        setError(5);
        spanConta[5].textContent = 'CEP deve conter 8 números.';
        return false;
    }

    tiraErro(5);
    return true;
}

function salvarCad(){
    const userCadastrados = JSON.parse(localStorage.getItem('userCadastrados')) || [];

    const usuario = {
        nomeUser: nomeCad.value,
        emailUser: emailCad.value,
        senha: senhaCad.value,
        cpfUser: cpfCad.value,
        contas: [],
        historico: [],
        cepUser: cepCad.value,
        rua: ruaCad.value,
        bairro: bairroCad.value,
        cidade: localidadeCad.value,
        estado: estadoCad.value,
        uf: ufCad.value,
        nº: numCad.value,
        complemento: complementoCad.value
    };
    
    const emailExiste = userCadastrados.some(usuario => usuario.emailUser === emailCad.value);

    if(emailExiste){
        setError(1);
        spanConta[1].textContent = 'Email já Registrado';
        return false;
    }

    tiraErro(1);

    userCadastrados.push(usuario);

    localStorage.setItem('usuarios', JSON.stringify(userCadastrados));

    return true;
}

formCad.addEventListener("submit", (e) => {
    e.preventDefault();

    const validacoesCad = [
        valCadNome(),
        valCadEmail(),
        valSenhaCad(),
        valCpfCad(),
        valCepCad()
    ];

    const formCadValido = validacoesCad.every(resultado => resultado)

    if(formCadValido){
        salvarCad();
        spanCad.style.display = 'inline-block'
        
    } 
});