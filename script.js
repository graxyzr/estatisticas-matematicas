let camposVisiveis = false;

function mostrarCampos() {

    const operacaoSelecionada = document.getElementById('operacao').value;
    const inputContainer = document.getElementById('inputContainer');
    const calcularContainer = document.getElementById('calcularContainer');

    // Limpa os campos de entrada anteriores
    inputContainer.innerHTML = '';

    if (operacaoSelecionada === 'mediaPonderada') {

        // Se a operação for Média Ponderada, exibe dois campos
        const inputNumeros = document.createElement('input');
        inputNumeros.type = 'text';
        inputNumeros.placeholder = 'Inserir números aqui';
        inputContainer.appendChild(inputNumeros);

        const br = document.createElement('br');
        inputContainer.appendChild(br);

        const inputPesos = document.createElement('input');
        inputPesos.type = 'text';
        inputPesos.placeholder = 'Número de Pesos';
        inputContainer.appendChild(inputPesos);

        // Mostra o botão 'Calcular' após o botão 'Confirmar' ser clicado
        calcularContainer.style.display = 'block';

    }

    else {

        // Para outras operações, exibe apenas um campo
        const inputNumeros = document.createElement('input');
        inputNumeros.type = 'text';
        inputNumeros.placeholder = 'Ex: 4, 5, 8, 3, 5, 3';
        inputContainer.appendChild(inputNumeros);

        // Mostra o botão de 'Calcular' após o botão de 'Confirmar' ser clicado
        calcularContainer.style.display = 'block';

    }

    inputContainer.style.display = 'block';
    camposVisiveis = true;

}

// Calcular a Média Simples
function calcularMedia(numeros) {

    let soma = numeros.reduce((acc, num) => acc + num, 0);          // Calcula a soma dos números no array 'numeros' e em seguida temos a função callback que recebe dois parâmetros

    // 'acc': começa com o valor inicial de 0
    // 'num': número atual do array durante a iteração
    // A função de callback adicionou o número atual('num') ao acumulador('acc') a cada iteração, acumulando a soma

    return soma / numeros.length;                       // A média é calculada dividindo a soma pelo número de elementos no array('numeros.length')

}

// Calcular a Média Ponderada
function calcularMediaPonderada(numeros, pesos) {

    if (numeros.length !== pesos.length) {

        return 'Números e Pesos devem ter o mesmo número de elementos!';

    }

    let somaProdutos = 0;
    let somaPesos = 0;

    for (let i = 0; i < numeros.length; i++) {

        somaProdutos += numeros[i] * pesos[i];
        somaPesos += pesos[i];

    }

    if (somaPesos === 0) {

        return 'A soma dos pesos não pode ser zero!';

    }

    const mediaPonderada = somaProdutos / somaPesos;
    return mediaPonderada;

}

// Calcular a Média Harmônica
function calcularMediaHarmonica(numeros) {

    if (numeros.length === 0) {

        return 'O campo de números não pode estar vazio!';

    }

    const inversos = numeros.map(num => 1 / num);
    const somaInversos = inversos.reduce((acc, val) => acc + val, 0);

    const mediaHarmonica = numeros.length / somaInversos;
    return mediaHarmonica;

}

// Calcular a Média Geométrica
function calcularMediaGeometrica(numeros) {

    if (numeros.length === 0) {

        return 'O campo de números não pode estar vazio!';

    }

    const produto = numeros.reduce((acc, val) => acc * val, 1);

    const mediaGeometrica = Math.pow(produto, 1 / numeros.length);
    return mediaGeometrica;

}

// Calcular a Moda
function calcularModa(numeros) {

    let numCount = {};

    numeros.forEach(num => {        // Loop que percorre cada elemento do array 'numeros' juntamente da função de callback que é executada para cada elemento do array

        if (numCount[num]) {            // Verifica se o número 'num' já existe como uma chave(propriedade) no objeto 'numCount', se existe, significa que o número 'num' já foi encontrado antes no array

            numCount[num]++;        // Incrementa a contagem de ocorrências desse número no objeto 'numCount' em 1

        }

        else {              // Se não existe, significa que é a primeira vez que o número 'num' está sendo encontrado

            numCount[num] = 1;          // Inicializa a contagem de ocorrências desse número no objeto 'numCount' como 1

        }

    });

    let moda = [];
    let maxCount = 0;

    for (let num in numCount) {         // Loop através dos números únicos: itera sobre as chaves do objeto 'numCount' e cada chave representa um número único no array 'numeros'

        if (numCount[num] > maxCount) {         // Verificação de contagem: para cada número único, verificamos se a contagem desse número (quantas vezes aparece no array) é maior do que o valor atual de 'maxCount'(variável que rastreia a contagem máxima encontrada até o momento)

            moda = [num];                  // Atualização da moda: se a contagem do número atual for maior do que a contagem máxima atual, atualizamos a variável 'moda' para conter um array com apenas o número atual e atualizamos 'maxCount' com a nova contagem máxima
            maxCount = numCount[num];

        }

        else if (numCount[num] === maxCount) {

            moda.push(num);                     // Adição de números à moda: se a contagem do número atual for igual à contagem máxima atual, teremos um outro número com a mesma frequência que a moda atual e adicionamos o número atual à lista de moda 'moda' usando 'moda.push(num'

        }

    }

    return moda;

}

// Calcular a Mediana
function calcularMediana(numeros) {

    let sortedNums = numeros.sort((a, b) => a - b);         // Cria uma cópia do array 'numeros' e ordena em ordem crescente usando o 'sort()'
    let meio = Math.floor(sortedNums.length / 2);           // Calcula o índice do valor do meio, 'sortedNums.length' representa o número de elementos no array ordenado e 'Math.floor()' garante que o índice seja um número inteiro

    if (sortedNums.length % 2 === 0) {              // Verifica se o array ordenado tem um número par ou ímpar de elementos.

        let meio1 = sortedNums[meio - 1];   // Obtém o valor imediatamente antes do meio
        let meio2 = sortedNums[meio];           // Obtém o valor imediatamente após o meio
        return (meio1 + meio2) / 2;         // Calcula a média desses dois valores e retorna a mediana

    }

    else {

        return sortedNums[meio];

    }

}

// Calcular a Variância
function calcularVariancia(numeros) {

    if (numeros.length === 0) {

        return 'O campo de números não pode estar vazio!';

    }

    const media = calcularMedia(numeros);
    const diferencaAoQuadrado = numeros.map(num => Math.pow(num - media, 2));
    const somaDiferencaAoQuadrado = diferencaAoQuadrado.reduce((acc, val) => acc + val, 0);

    const variancia = somaDiferencaAoQuadrado / numeros.length;
    return variancia;

}

// Calcular o Desvio Padrão
function calcularDesvioPadrao(numeros) {

    const variancia = calcularVariancia(numeros);
    const desvioPadrao = Math.sqrt(variancia);
    return desvioPadrao;

}


// Calcula os resultados e exibe-os
function calcularEExibirResultado() {

    const operacaoSelecionada = document.getElementById('operacao').value;
    let resultado = '';

    if (operacaoSelecionada === 'mediaSimples') {

        const inputNumeros = document.querySelector('#inputContainer input:first-child');
        const numeros = inputNumeros.value.trim().split(',').map(Number);
        resultado = calcularMedia(numeros);

    }

    else if (operacaoSelecionada === 'mediaPonderada') {            // Arrumar a Média Ponderada (Não está mostrando os resultados ao clicar em 'Calcular')

        const inputNumeros = document.querySelector('#inputContainer input:first-child');
        const numeros = inputNumeros.value.trim().split(',').map(Number);
        const inputPesos = document.querySelector('#inputContainer input:nth-child(2)');
        const pesos = inputPesos.value.trim().split(',').map(Number);
        resultado = calcularMediaPonderada(numeros, pesos);

    }

    else if (operacaoSelecionada === 'mediaHarmonica') {

        const inputNumeros = document.querySelector('#inputContainer input:first-child');
        const numeros = inputNumeros.value.trim().split(',').map(Number);
        resultado = calcularMediaHarmonica(numeros);

    }

    else if (operacaoSelecionada === 'mediaGeometrica') {

        const inputNumeros = document.querySelector('#inputContainer input:first-child');
        const numeros = inputNumeros.value.trim().split(',').map(Number);
        resultado = calcularMediaGeometrica(numeros);

    }

    else if (operacaoSelecionada === 'variancia') {

        const inputNumeros = document.querySelector('#inputContainer input:first-child');
        const numeros = inputNumeros.value.trim().split(',').map(Number);
        resultado = calcularVariancia(numeros);

    }

    else if (operacaoSelecionada === 'desvioPadrao') {

        const inputNumeros = document.querySelector('#inputContainer input:first-child');
        const numeros = inputNumeros.value.trim().split(',').map(Number);
        resultado = calcularDesvioPadrao(numeros);

    }

    else {

        resultado = 'Operação não reconhecida';

    }

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>Resultado: ${resultado}</p>`;

}

// Limpa os campos e oculta-os
function limparCampos() {

    // Limpe os campos de entrada
    const inputNumeros = document.querySelector('#inputContainer input:first-child');
    inputNumeros.value = '';

    const inputPesos = document.querySelector('#inputContainer input:nth-child(2)');

    if (inputPesos) {

        inputPesos.value = '';

    }

    // Oculte os campos de entrada
    inputContainer.style.display = 'none';

    // Limpe o resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    // Oculte o botão "Calcular"
    const calcularContainer = document.getElementById('calcularContainer');
    calcularContainer.style.display = 'none';

    // Ocultar os campos apenas se eles estiverem visíveis
    if (camposVisiveis) {

        const inputContainer = document.getElementById('inputContainer');
        inputContainer.style.display = 'none';
        camposVisiveis = false;

    }

}

document.querySelector('#operacao').addEventListener('change', function () {
    limparCampos();
});
