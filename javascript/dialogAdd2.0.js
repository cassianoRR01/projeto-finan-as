const btnAdd = document.getElementById('btnAdd');
const modalConta = document.getElementById('modalConta');
const fechar = document.getElementById('fechar');
const formConta = document.getElementById('formConta');

btnAdd.addEventListener("click", () => modalConta.showModal());
fechar.addEventListener("click", () =>{modalConta.close(),formConta.reset()});

// Mensagem de Erro //

const spanConta = document.querySelectorAll('.spanForm')
const campo = document.querySelectorAll('.campo')

// Functions para Validar Campos //

function setError(index){
    campo[index].style.border = '2px solid red';
    spanConta[index].style.display = 'block';
}

function tiraErro(index){
    campo[index].style.border = '';
    spanConta[index].style.display = 'none';
}

function valNome(){
    if(campo[0].value.trim() === ''){
        setError(0);
        return false;
    } else {
        tiraErro(0);
        return true;
    }
}

function valValor(){
    if(campo[1].value.trim() === ''){
        setError(1)
        return false;
    } else {
        tiraErro(1)
        return true;
    }
}

function valDataAber(){
    if(campo[2].value == ""){
        setError(2)
        spanConta[2].textContent = "Data Inválida"
        return false;
    } else {
        tiraErro(2)
        return true;
    }
}

function valDataVenc(){
    if(campo[3].value == ""){
        setError(3)
        spanConta[3].textContent = "Data Inválida"
        return false;
    } else {
        tiraErro(3)
        return true;
    }
}

// Variáveis Totalizadoras (Temporário) //
let totalMensal = 0;
let pendente = 0;
let n_conta = 0;

formConta.addEventListener("submit", (e) => {
    e.preventDefault()

    

    // Campo do Formulário //

    const nomeConta = document.getElementById('nome').value;
    const valorConta = parseFloat(document.getElementById('valor').value);
    const dataAbertura = document.getElementById('abertura').value;
    const dataVencimento = document.getElementById('vencimento').value;

    function valDatas(){
        if(dataAbertura == dataVencimento){
            console.log('Datas iguais')
            setError(2)
            setError(3)
            spanConta[2].textContent = 'Datas Iguais'
            spanConta[3].textContent = 'Datas Iguais'
            return false;
        } 
        else if(dataAbertura > dataVencimento){
            console.log("Abertura > Vencimento")
            setError(3)
            spanConta[3].textContent = 'Data de Vencimento é anterior à Abertura'
            return false;
        } 
        else if(dataAbertura < dataVencimento){
            console.log("Abertura < Vencimento")
            tiraErro(2)
            tiraErro(3)
            return true;
        }
    }
    
    // Variável que diz se o Formulário pode ser ou não enviado //
    const validacoes = [
    valNome(),
    valValor(),
    valDataAber(),
    valDataVenc(),
    valDatas()
    ];

    const formValido = validacoes.every(resultado => resultado);

    console.log(formValido)
    if(formValido){

        modalConta.close();
        formConta.reset();

        //- Exibir na Tela -// 

        n_conta = n_conta + 1;
        let str = 'conta' + n_conta;

        // Formatar Data // 
        const [anoAbertura, mesAbertura, diaAbertura] = dataAbertura.split("-");
        const [anoVencimento, mesVencimento, diaVencimento] = dataVencimento.split("-");

        const dataAberFormatada = `${diaAbertura}/${mesAbertura}/${anoAbertura}`;
        const dataVencFormatada = `${diaVencimento}/${mesVencimento}/${anoVencimento}`;

        const listaContas = document.querySelector('.contas');

        const contaDiv = document.createElement('div');
        contaDiv.setAttribute('id', `${str}`);

        contaDiv.innerHTML = `
            <h3>${nomeConta}</h3>
            <p>Abertura: ${dataAberFormatada}</p>
            <p>Vencimento: ${dataVencFormatada}</p>
            <p>Valor: R$ ${valorConta}</p>
            <button onclick="${str}.remove()">Pago</button>
        `
        listaContas.appendChild(contaDiv)

        totalMensal = totalMensal + valorConta;
        pendente = pendente + valorConta;
        
        // Atualizar Total e Pendente na Tela //
        document.getElementById('totalMen').textContent = `Total Mensal: R$ ${totalMensal.toFixed(2)}`
        document.getElementById('pendente').textContent = `Pendente: R$ ${pendente.toFixed(2)}`
    }
    
})