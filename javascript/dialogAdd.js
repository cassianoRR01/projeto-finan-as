// Seleciona o botão "+"
const botaoAdd = document.getElementById('btnAdd');

// Seleciona o dialog
const modal = document.getElementById('modalConta');

// Seleciona botão fechar
const fechar = document.getElementById('fechar');

// Variavel de Controle do total mensal
let totalMensal = 0;
let pendente = 0;

// Evento de clique no "+"
botaoAdd.addEventListener('click', () => {
    modal.showModal();
});

// Evento para fechar
fechar.addEventListener('click', () => {
    modal.close();
});

// Evento de envio do formulário
document.getElementById('formConta').addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const abertura = document.getElementById('abertura').value;
    const vencimento = document.getElementById('vencimento').value;
    const valor = parseFloat(document.getElementById('valor').value);

    console.log(nome, abertura, vencimento, valor);
    
    // Seleciona a div onde vai ficar as contas
    const listaContas = document.querySelector('.contas');

    // Criando uma nova div (card da conta)
    const contaDiv = document.createElement('div');

    // Adicionando conteúdo dentro da div
    contaDiv.innerHTML = `
        <h3>${nome}</h3>
        <p>Abertura: ${abertura}</p>
        <p>Vencimento: ${vencimento}</p>
        <p>Valor: R$ ${valor}</p>
        <input type="checkbox">
    `;

    // Adiciona a conta na tela
    listaContas.appendChild(contaDiv);

    // Adiciona o valor da conta ao total mensal
    totalMensal = totalMensal + valor;
    pendente = pendente + valor;
    
    // Atualiza o total mensal na tela
    document.getElementById('totalMen').textContent = `Total mensal: R$ ${totalMensal.toFixed(2)}`;
    document.getElementById('pendente').textContent = `Pendente: R$ ${pendente.toFixed(2)}`;

    // Fecha o modal
    modal.close();

    // Limpa o formulário
    document.getElementById('formConta').reset();
});
