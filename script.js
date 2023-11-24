let camposVisiveis = false;

function mostrarCampos() {
    const operacaoSelecionada = document.getElementById('operacao').value;
    const inputContainer = document.getElementById('inputContainer');
    const calcularContainer = document.getElementById('calcularContainer');
    const numCamposContainer = document.getElementById('numCamposContainer');
    const gerarCamposButton = document.getElementById('gerarCampos');

    // Limpa os campos de entrada anteriores
    inputContainer.innerHTML = '';

    if (operacaoSelecionada !== 'mediaPonderada') {
        numCamposContainer.style.display = 'none';
        gerarCamposButton.style.display = 'none';
        calcularContainer.style.display = 'block';
        inputContainer.style.display = 'block';
        camposVisiveis = true;

        const inputNumeros = document.createElement('input');
        inputNumeros.type = 'text';
        inputNumeros.placeholder = `Inserir números aqui`;
        inputNumeros.className = 'numeros-input';

        inputContainer.appendChild(inputNumeros);
    }

    else {
        numCamposContainer.style.display = 'block';
        gerarCamposButton.style.display = 'block';
    }

    inputContainer.style.display = 'block';
    camposVisiveis = true;

}

// Adicione um event listener para o botão "Gerar Campos"
document.getElementById('gerarCampos').addEventListener('click', function () {
    const numCamposInput = document.getElementById('numCampos');
    const numCampos = parseInt(numCamposInput.value);

    // Limpe os campos de entrada anteriores
    inputContainer.innerHTML = '';

    for (let i = 0; i < numCampos; i++) {
        // Cria campos de entrada para "Inserir números aqui"
        const inputNumeros = document.createElement('input');
        inputNumeros.type = 'text';
        inputNumeros.placeholder = `Inserir números aqui`;
        inputNumeros.className = 'numeros-input'; // Adiciona uma classe para identificar campos de números

        // Cria campos de entrada para "Número de Pesos"
        const inputPesos = document.createElement('input');
        inputPesos.type = 'text';
        inputPesos.placeholder = `Número de Pesos`;
        inputPesos.className = 'pesos-input'; // Adiciona uma classe para identificar campos de pesos

        // Adiciona os campos de entrada ao inputContainer
        inputContainer.appendChild(inputNumeros);
        inputContainer.appendChild(inputPesos);

        // Adiciona uma quebra de linha para separar os campos individuais
        const br = document.createElement('br');
        inputContainer.appendChild(br);
    }

    // Exibe o botão "Calcular" e "Limpar"
    calcularContainer.style.display = 'block';

    // Oculta o input de 'Número de Campos' e o botão 'Gerar Campos'
    numCamposContainer.style.display = 'none';
    gerarCamposButton.style.display = 'none';

});

document.querySelector('button[onclick="mostrarCampos()"]').addEventListener('click', function () {
    const gerarCamposButton = document.getElementById('gerarCampos');
    gerarCamposButton.style.display = 'block';
});

document.querySelector('#operacao').addEventListener('change', function () {
    limparCampos();
});

// Calcular a Média Simples
function calcularMedia(numeros) {
    let soma = numeros.reduce((acc, num) => acc + num, 0);          // Calcula a soma dos números no array 'numeros' e em seguida temos a função callback que recebe dois parâmetros

    // 'acc': começa com o valor inicial de 0
    // 'num': número atual do array durante a iteração
    // A função de callback adicionou o número atual('num') ao acumulador('acc') a cada iteração, acumulando a soma

    // A média é calculada dividindo a soma pelo número de elementos no array('numeros.length')
    return soma / numeros.length;
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

    // Loop que percorre cada elemento do array 'numeros' juntamente da função de callback que é executada para cada elemento do array
    numeros.forEach(num => {
        // Verifica se o número 'num' já existe como uma chave(propriedade) no objeto 'numCount', se existe, significa que o número 'num' já foi encontrado antes no array
        if (numCount[num]) {
            // Incrementa a contagem de ocorrências desse número no objeto 'numCount' em 1
            numCount[num]++;

            // Se não existe, significa que é a primeira vez que o número 'num' está sendo encontrado
        } else {
            // Inicializa a contagem de ocorrências desse número no objeto 'numCount' como 1
            numCount[num] = 1;
        }

    });

    let moda = [];
    let maxCount = 0;

    // Loop através dos números únicos: itera sobre as chaves do objeto 'numCount' e cada chave representa um número único no array 'numeros'
    for (let num in numCount) {
        // Verificação de contagem: para cada número único, verificamos se a contagem desse número (quantas vezes aparece no array) é maior do que o valor atual de 'maxCount'(variável que rastreia a contagem máxima encontrada até o momento)
        if (numCount[num] > maxCount) {
            // Atualização da moda: se a contagem do número atual for maior do que a contagem máxima atual, atualizamos a variável 'moda' para conter um array com apenas o número atual e atualizamos 'maxCount' com a nova contagem máxima
            moda = [num];
            maxCount = numCount[num];
        } else if (numCount[num] === maxCount) {
            // Adição de números à moda: se a contagem do número atual for igual à contagem máxima atual, teremos um outro número com a mesma frequência que a moda atual e adicionamos o número atual à lista de moda 'moda' usando 'moda.push(num'
            moda.push(num);
        }
    }
    return moda;
}

// Calcular a Mediana
function calcularMediana(numeros) {
    // Cria uma cópia do array 'numeros' e ordena em ordem crescente usando o 'sort()'
    let sortedNums = numeros.sort((a, b) => a - b);
    // Calcula o índice do valor do meio, 'sortedNums.length' representa o número de elementos no array ordenado e 'Math.floor()' garante que o índice seja um número inteiro
    let meio = Math.floor(sortedNums.length / 2);

    // Verifica se o array ordenado tem um número par ou ímpar de elementos.
    if (sortedNums.length % 2 === 0) {
        // Obtém o valor imediatamente antes do meio
        let meio1 = sortedNums[meio - 1];
        // Obtém o valor imediatamente após o meio
        let meio2 = sortedNums[meio];
        // Obtém o valor imediatamente após o meio
        return (meio1 + meio2) / 2;
    } else {
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

    // Verifica se a operação selecionada é Média Ponderada
    const isMediaPonderada = operacaoSelecionada === 'mediaPonderada';

    // Função para verificar se um valor é um número
    const isNumero = value => !isNaN(parseFloat(value)) && isFinite(value);

    if (isMediaPonderada) {
        // Verifica se todos os campos de entrada contêm números
        const inputNumeros = document.querySelectorAll('.numeros-input');
        const inputPesos = document.querySelectorAll('.pesos-input');

        const numerosValidos = Array.from(inputNumeros).every(input => isNumero(input.value));
        const pesosValidos = Array.from(inputPesos).every(input => isNumero(input.value));

        if (!numerosValidos || !pesosValidos) {
            resultado = 'Insira números válidos em todos os campos.';
        } else {
            const numeros = Array.from(inputNumeros).map(input => parseFloat(input.value));
            const pesos = Array.from(inputPesos).map(input => parseFloat(input.value));
            resultado = calcularMediaPonderada(numeros, pesos);
        }
    } else {
        // Verifica se o campo de entrada contém números
        const inputNumeros = document.querySelector('#inputContainer input:first-child');
        const numerosValidos = isNumero(inputNumeros.value);

        if (!numerosValidos) {
            resultado = 'Informe valores válidos.';
        } else {
            const numeros = inputNumeros.value.trim().split(',').map(Number);

            switch (operacaoSelecionada) {
                case 'mediaSimples':
                    resultado = calcularMedia(numeros);
                    break;
                case 'mediaHarmonica':
                    resultado = calcularMediaHarmonica(numeros);
                    break;
                case 'mediaGeometrica':
                    resultado = calcularMediaGeometrica(numeros);
                    break;
                case 'variancia':
                    resultado = calcularVariancia(numeros);
                    break;
                case 'desvioPadrao':
                    resultado = calcularDesvioPadrao(numeros);
                    break;
                default:
                    resultado = 'Operação não reconhecida';
            }
        }
    }
    // Formata o resultado para exibir apenas duas casas decimais
    resultado = isNumero(resultado) ? resultado.toFixed(2) : resultado;

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>Resultado: ${resultado}</p>`;
}

// Limpa os campos e oculta-os
function limparCampos() {
    // Limpe os campos de entrada
    const inputNumeros = document.querySelector('#inputContainer');
    if (inputNumeros) {
        inputNumeros.value = '';
    }
    const inputPesos = document.querySelector('#pesos');
    if (inputPesos) {
        inputPesos.value = '';
    }
    // Oculte os campos de entrada
    const inputContainer = document.getElementById('inputContainer')
    inputContainer.style.display = 'none';

    // Limpe o resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    // Oculte o botão "Calcular"
    const calcularContainer = document.getElementById('calcularContainer');
    calcularContainer.style.display = 'none';

    // Ocultar os campos apenas se eles estiverem visíveis
    if (camposVisiveis) {
        inputContainer.style.display = 'none';
        camposVisiveis = false;
    }
}
